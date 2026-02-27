"use client";

import {
  motion,
  useReducedMotion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  type Variants,
} from "framer-motion";
import { type ReactNode, useRef, useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  Shared defaults                                                    */
/* ------------------------------------------------------------------ */

const DURATION = 0.5;
const EASE = [0.25, 0.1, 0.25, 1.0] as const;

const viewportOnce = { once: true, margin: "-80px" } as const;

/* ------------------------------------------------------------------ */
/*  FadeInUp                                                           */
/* ------------------------------------------------------------------ */

interface FadeInUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom: { delay: number; y: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION,
      ease: EASE,
      delay: custom.delay,
    },
  }),
};

export function FadeInUp({
  children,
  className,
  delay = 0,
  y = 24,
}: FadeInUpProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      custom={{ delay, y }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  FadeIn (no vertical movement)                                      */
/* ------------------------------------------------------------------ */

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: {
      duration: DURATION,
      ease: EASE,
      delay,
    },
  }),
};

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  SlideInLeft                                                        */
/* ------------------------------------------------------------------ */

interface SlideInLeftProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION,
      ease: EASE,
      delay,
    },
  }),
};

export function SlideInLeft({ children, className, delay = 0 }: SlideInLeftProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={slideInLeftVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  StaggerContainer + StaggerItem                                     */
/* ------------------------------------------------------------------ */

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

export function StaggerContainer({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: StaggerContainerProps) {
  const prefersReduced = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE },
  },
};

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  ScaleIn                                                            */
/* ------------------------------------------------------------------ */

interface ScaleInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION,
      ease: EASE,
      delay,
    },
  }),
};

export function ScaleIn({ children, className, delay = 0 }: ScaleInProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={scaleInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  CountUp — animates a number from 0 to end when in view            */
/* ------------------------------------------------------------------ */

interface CountUpProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 1.5,
  className,
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      motionVal.set(end);
      return;
    }
    const controls = animate(motionVal, end, {
      duration,
      ease: [0.25, 0.1, 0.25, 1.0],
    });
    return controls.stop;
  }, [inView, end, duration, motionVal, prefersReduced]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${v}${suffix}`;
      }
    });
    return unsubscribe;
  }, [rounded, prefix, suffix]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}0{suffix}
    </span>
  );
}
