"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Shared defaults                                                    */
/* ------------------------------------------------------------------ */

const DURATION = 0.45; // max 500 ms – "quiet motion"
const EASE = [0.25, 0.1, 0.25, 1.0] as const; // smooth cubic-bezier

const viewportOnce = { once: true, margin: "-60px" } as const;

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
