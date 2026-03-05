
import { gsap } from "gsap";

// Estado de módulo para limpiar en navegaciones SPA
let _isActive = false;
const _activeTweens: gsap.core.Tween[] = [];

function _track(t: gsap.core.Tween): gsap.core.Tween {
    _activeTweens.push(t);
    return t;
}

function _cleanupAll() {
    _isActive = false;
    _activeTweens.forEach(t => t.kill());
    _activeTweens.length = 0;
}

export function initSeparatorAnimation(): () => void {
    // Reset en cada init para evitar acumulación entre navegaciones SPA
    _cleanupAll();
    _isActive = true;

    const separators = document.querySelectorAll(".separator-svg");

    separators.forEach((sep) => {
        const turb = sep.querySelector('[id^="turbulence-"]');

        const fadeDuration = parseFloat(
            sep.getAttribute("data-fade-duration") || "3.5",
        );
        const wormDuration = parseFloat(
            sep.getAttribute("data-worm-duration") || "1.5",
        );
        const loopInterval = parseFloat(
            sep.getAttribute("data-loop-interval") || "120",
        );

        if (!turb) {
            console.warn(`Turbulence element not found in separator`);
            // Fallback: solo fade sin efecto worm
            _track(gsap.to(sep, {
                opacity: 1,
                duration: fadeDuration,
                ease: "power2.out",
            }));
            return;
        }

        const wiggleFilter = sep.querySelector('[id^="wiggle-"]');
        const wiggleId = wiggleFilter ? wiggleFilter.id : null;

        // Fade in (todos los dispositivos)
        _track(gsap.to(sep, {
            opacity: 1,
            duration: fadeDuration,
            ease: "power2.out",
        }));

        // feTurbulence + feDisplacementMap son filtros SVG muy costosos en mobile GPU.
        // En mobile solo se hace el fade-in, sin worm effect.
        if (window.matchMedia('(max-width: 768px)').matches) return;

        function playWormEffect() {
            if (!_isActive) return;

            if (wiggleId) {
                gsap.set(sep, { filter: `url(#${wiggleId})` });
            }

            _track(gsap.to(turb, {
                attr: { baseFrequency: 0.09 },
                duration: wormDuration,
                yoyo: true,
                repeat: 12,
                ease: "sine.inOut",
                onComplete: () => {
                    if (!_isActive) return;
                    gsap.set(sep, { filter: "none" });
                    gsap.set(turb, { attr: { baseFrequency: 0 } });
                },
            }));
        }

        function scheduleLoop() {
            if (!_isActive) return;
            playWormEffect();
            // El delayedCall es trackeado; scheduleLoop no crea nuevas
            // llamadas si _isActive es false al momento de ejecutarse
            _track(gsap.delayedCall(loopInterval, scheduleLoop));
        }

        // Primer efecto inmediatamente después del fade
        _track(gsap.delayedCall(fadeDuration, playWormEffect));

        // Loop continuo: primer disparo y luego cada loopInterval
        _track(gsap.delayedCall(fadeDuration + loopInterval, scheduleLoop));
    });

    return _cleanupAll;
}
