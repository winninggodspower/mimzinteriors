export const MOTION_EASE = [0.22, 1, 0.36, 1];

export const MOTION_VIEWPORT = {
  once: true,
  amount: 0.2,
};

export const MOTION_DURATIONS = {
  section: 0.6,
  card: 0.5,
  cardFast: 0.45,
  heroLoop: 12,
};

export const MOTION_STAGGER = {
  micro: 0.03,
  tight: 0.05,
  medium: 0.1,
  wide: 0.12,
};

export function sectionReveal({ y = 28, amount = 0.2, duration = MOTION_DURATIONS.section } = {}) {
  return {
    initial: false,
    whileInView: { opacity: 1, y: 0 },
    viewport: { ...MOTION_VIEWPORT, amount },
    transition: { duration, ease: MOTION_EASE },
  };
}

export function staggerContainer(staggerChildren = MOTION_STAGGER.medium) {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren },
    },
  };
}

export function fadeUpItem({ y = 20, duration = MOTION_DURATIONS.card, delay = 0 } = {}) {
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: MOTION_EASE },
    },
  };
}

export function heroScaleLoop({ scale = 1.05, duration = MOTION_DURATIONS.heroLoop } = {}) {
  return {
    initial: { scale: 1 },
    animate: { scale },
    transition: {
      duration,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };
}
