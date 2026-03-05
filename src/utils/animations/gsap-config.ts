import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Configuración global de GSAP aplicada una sola vez al importar el módulo.
 * - force3D: fuerza aceleración GPU en transforms (mejora Safari/Firefox)
 * - lagSmoothing(0): evita saltos de scroll al volver de otra tab
 */
gsap.config({ force3D: true });
gsap.ticker.lagSmoothing(0);

gsap.defaults({
  ease: 'power3.out',
  duration: 0.6
});

ScrollTrigger.config({
  // Evita refresh en resize de barra de direcciones en móvil (dispara constantemente).
  ignoreMobileResize: true,
  // Refrescar en los eventos clave del ciclo de vida de Astro (SPA).
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,astro:page-load',
});

ScrollTrigger.defaults({
  toggleActions: 'play none none none',
  start: 'top 80%',
  markers: false
});

// Refresh con debounce en resize para recalcular posiciones correctamente
let resizeTimer: ReturnType<typeof setTimeout>;
if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
  });
}

/**
 * Limpia todos los ScrollTriggers y animaciones GSAP
 * Útil para cleanup global o navegación SPA
 */
export function cleanupGSAP(): void {
  gsap.killTweensOf('*');
  ScrollTrigger.getAll().forEach(st => st.kill());
}
