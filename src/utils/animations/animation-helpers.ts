/**
 * Configuración centralizada de animaciones
 * Permite ajustar timings y easings globalmente
 */
export const ANIMATION_CONFIG = {
  durations: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.0,
    verySlow: 1.5
  },
  easings: {
    smooth: 'power2.out',
    bounce: 'back.out(1.7)',
    elastic: 'elastic.out(1, 0.5)',
    default: 'power3.out'
  },
  stagger: {
    fast: 0.1,
    normal: 0.2,
    slow: 0.3
  }
} as const;
