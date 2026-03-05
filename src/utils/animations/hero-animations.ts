import { gsap } from 'gsap';
import { maskTextReveal } from "./text-animations";

function isSlowNetwork(): boolean {
    if (!('connection' in navigator)) return false;
    const conn = (navigator as any).connection;
    if (conn.saveData) return true;
    if (['slow-2g', '2g', '3g'].includes(conn.effectiveType)) return true;
    if (typeof conn.downlink === 'number' && conn.downlink < 4) return true;
    return false;
}

function showHeroInstantly(
    header: Element | null,
    headerBorder: Element | null,
    images: Element[],
    titleParts: NodeListOf<Element>,
    subtitle: Element | null,
    cta: Element | null
) {
    if (header) gsap.set(header, { opacity: 1, y: 0 });
    if (headerBorder) gsap.set(headerBorder, { "--glass-border-opacity": 1 });
    if (images.length > 0) gsap.set(images, { opacity: 1, scale: 1 });
    titleParts.forEach(part => gsap.set(part, { opacity: 1 }));
    if (subtitle) gsap.set(subtitle, { opacity: 1, x: 0 });
    if (cta) gsap.set(cta, { opacity: 1, y: 0 });
    const glowLayer = document.querySelector('.logo-glow-layer') as HTMLElement | null;
    if (glowLayer) glowLayer.style.animationPlayState = 'running';
}

export function initHeroAnimations() {
    // En móvil el contenido se muestra mediante CSS (Hero.astro @media max-width:768px).
    // No ejecutar animaciones: evita jank de entrada y conflictos con scroll nativo.
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const heroSection = document.querySelector('#hero');
    const header = document.querySelector('.header-container');

    if (!heroSection) {
        if (header) {
            gsap.set(header, { opacity: 1, y: 0 });
        }
        return;
    }

    const headerBorder = document.querySelector('.glass-gradient-border');
    const neonWrapper = document.querySelector('.neon-circles-wrapper');
    const logoWrapper = document.querySelector('.animation-circles-container'); // Logo
    const titleParts = document.querySelectorAll('.hero-title-first, .hero-title-second');
    const subtitle = document.querySelector('.hero-subtitle');
    const cta = document.querySelector('.hero-cta');
    const images = [neonWrapper, logoWrapper].filter(Boolean) as Element[];

    // Skip animation if slow network OR si JS tardó más de 2s (cold-cache móvil).
    // Umbral aumentado de 500ms → 2000ms: 500ms era demasiado agresivo y causaba
    // showHeroInstantly() en cargas normales, provocando pop visual ("tirón").
    if (isSlowNetwork() || performance.now() > 2000) {
        showHeroInstantly(header, headerBorder, images, titleParts, subtitle, cta);
        return;
    }

    const tl = gsap.timeline({
        defaults: {
            ease: "expo.out",
            duration: 0.4  // Reducido de 1.5s — animaciones modernas van de 0.4–0.8s
        }
    });

    // 1. Header (Content wrapper)
    if (header) {
        gsap.set(header, { opacity: 0, y: -20 });
        tl.to(header, { opacity: 1, y: 0 });
    }

    // 2. Separator (Header Border) — al mismo tiempo que el header
    if (headerBorder) {
        tl.to(headerBorder, { "--glass-border-opacity": 1 }, "<");
    }

    // 3. Image (Neon Circles & Logo)
    // Sin gsap.set: el CSS ya establece opacity:0 y scale(0.95) como estado inicial.
    // gsap.set aplicaba estilos inline síncronamente antes del primer frame,
    // forzando al compositor a reconciliar CSS vs inline → parpadeo en Safari/Firefox.
    // GSAP lee los valores CSS al arrancar el tween (t=0.1s en rAF) sin mutación previa.
    if (images.length > 0) {
        tl.to(images, { opacity: 1, scale: 1 }, "<");

        // Arrancar glow-pulse DESPUÉS de que el contenedor sea visible.
        // Si corre mientras opacity:0 y GSAP lo revela mid-cycle → parpadeo.
        const glowLayer = document.querySelector('.logo-glow-layer') as HTMLElement | null;
        if (glowLayer) {
            tl.call(() => {
                glowLayer.style.animationPlayState = 'running';
            }, [], ">"); // ">" = justo al terminar la animación de images
        }
    }

    // 4. Title
    if (titleParts.length > 0) {
        titleParts.forEach((part, index) => {
            gsap.set(part, { opacity: 1 });

            const partTl = maskTextReveal(part, {
                duration: 0.2,
                stagger: 0.02,
                ease: "expo.out"
            });

            tl.add(partTl, index === 0 ? "<" : "<");
        });
    }

    // 5. Subtitle y CTA — después del título, sin filter:blur (GPU extra en iOS/Firefox)
    if (subtitle || cta) {
        if (subtitle) gsap.set(subtitle, { opacity: 0, x: -10 });
        if (cta) gsap.set(cta, { opacity: 0, y: 10 });

        tl.to([subtitle, cta].filter(Boolean), {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            stagger: 0.03
        }, "<");
    }

    return tl;
}

export { maskTextReveal };