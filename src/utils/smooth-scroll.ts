import Lenis from "lenis";
import { gsap } from "gsap";

// ─── Estado de módulo ────────────────────────────────────────────────────────

let lenis: Lenis | null = null;
let _tickerFn: ((time: number) => void) | null = null;

// Handlers registrados antes de que Lenis exista (ej. ScrollTrigger.update).
// Se conectan automáticamente cuando se crea la instancia.
const _pendingHandlers: Array<(...args: any[]) => void> = [];

// ─── API pública ─────────────────────────────────────────────────────────────

/**
 * Registra un callback que se ejecuta en cada evento de scroll de Lenis.
 * Si Lenis aún no está inicializado, se conectará en cuanto se cree.
 * Uso: `addLenisScrollHandler(() => ScrollTrigger.update())` en Layout.astro.
 */
export function addLenisScrollHandler(handler: (...args: any[]) => void): void {
    if (!_pendingHandlers.includes(handler)) {
        _pendingHandlers.push(handler);
    }
    // Si ya existe la instancia, conectar inmediatamente
    if (lenis) {
        lenis.on("scroll", handler);
    }
}

/** Devuelve la instancia actual de Lenis o null si no está inicializada. */
export function getLenis(): Lenis | null {
    return lenis;
}

/**
 * Devuelve la instancia de Lenis, creándola si no existe.
 * Útil para scroll programático desde event handlers (ej. clic en nav).
 */
export function ensureLenis(): Lenis {
    if (!lenis) _create();
    return lenis!;
}

/**
 * Inicializa Lenis. Debe llamarse en `astro:page-load`.
 * Es idempotente: si ya existe una instancia, no hace nada.
 */
export function initSmoothScroll(): void {
    _create();
}

/**
 * Destruye Lenis y libera el ticker de GSAP.
 * Debe llamarse en `astro:before-swap` para limpiar entre navegaciones SPA.
 */
export function destroyLenis(): void {
    // 1. Remover del ticker de GSAP
    if (_tickerFn) {
        gsap.ticker.remove(_tickerFn);
        _tickerFn = null;
    }

    // 2. Destruir instancia de Lenis
    if (lenis) {
        lenis.destroy();
        lenis = null;
    }

    // 3. Limpiar handlers para el siguiente ciclo de vida (serán re-registrados en page-load)
    _pendingHandlers.length = 0;

    // 4. Restaurar scroll-behavior del documento
    document.documentElement.style.scrollBehavior = "";
}

// ─── Internos ────────────────────────────────────────────────────────────────

function _create(): void {
    if (lenis) return; // Ya existe, no re-crear

    lenis = new Lenis({
        // Cuánto "retraso" tiene el scroll. 0.1 = suave sin sentirse flotante.
        // Rango recomendado: 0.05 (muy suave) – 0.2 (snappy)
        lerp: 0.1,

        // Suaviza eventos de rueda de ratón y trackpad
        smoothWheel: true,

        // syncTouch: false → el scroll táctil usa el comportamiento nativo del navegador.
        // iOS Safari tiene momentum scroll nativo que es más fluido que Lenis en touch.
        // Activar syncTouch causaría conflicto con el momentum de iOS → scroll trabado.
        syncTouch: false,
    });

    // Conectar handlers que fueron registrados antes de crear la instancia
    _pendingHandlers.forEach(h => lenis!.on("scroll", h));

    // ── Integración con GSAP ticker ──────────────────────────────────────────
    // En lugar de un requestAnimationFrame manual, Lenis corre DENTRO del ticker
    // de GSAP. Esto garantiza que Lenis y GSAP actualizan el mismo frame y
    // elimina el drift entre la posición de scroll y las animaciones GSAP.
    // Es la integración oficial recomendada por GSAP + Lenis.
    // Nota: gsap.ticker.lagSmoothing(0) ya está configurado en gsap-config.ts.
    _tickerFn = (time: number) => lenis!.raf(time * 1000); // GSAP usa segundos, Lenis ms
    gsap.ticker.add(_tickerFn);

    // Desactivar CSS smooth-scroll para que no entre en conflicto con Lenis
    document.documentElement.style.scrollBehavior = "auto";
}
