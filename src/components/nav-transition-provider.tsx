"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type TransitionPhase = "covering" | "revealing";

type TransitionState = {
  href: string;
  x: number;
  y: number;
  radius: number;
  phase: TransitionPhase;
};

type NavTransitionContextValue = {
  isTransitioning: boolean;
  navigateFromPoint: (href: string, x: number, y: number) => void;
};

const NavTransitionContext = createContext<NavTransitionContextValue | null>(
  null
);

export function NavTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [transition, setTransition] = useState<TransitionState | null>(null);

  useEffect(() => {
    if (!transition || pathname !== transition.href) {
      return;
    }

    setTransition((current) =>
      current ? { ...current, phase: "revealing" } : current
    );

    const timeout = window.setTimeout(() => {
      setTransition(null);
    }, 260);

    return () => window.clearTimeout(timeout);
  }, [pathname, transition]);

  const value = useMemo<NavTransitionContextValue>(
    () => ({
      isTransitioning: transition !== null,
      navigateFromPoint: (href, x, y) => {
        if (transition || pathname === href) {
          return;
        }

        const radius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );

        setTransition({
          href,
          x,
          y,
          radius,
          phase: "covering",
        });

        window.setTimeout(() => {
          router.push(href);
        }, 260);
      },
    }),
    [pathname, router, transition]
  );

  return (
    <NavTransitionContext.Provider value={value}>
      <div className="relative min-h-screen overflow-x-clip">
        <motion.div
          animate={
            transition?.phase === "covering"
              ? { opacity: 0.18, y: -10, scale: 0.985, filter: "blur(1px)" }
              : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          }
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className={cn(transition && "pointer-events-none select-none")}
        >
          {children}
        </motion.div>
        {transition && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
            aria-hidden="true"
          >
            <motion.span
              className="absolute rounded-full bg-black"
              style={{
                width: transition.radius * 2,
                height: transition.radius * 2,
                left: transition.x - transition.radius,
                top: transition.y - transition.radius,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={
                transition.phase === "covering"
                  ? { scale: 1, opacity: 1 }
                  : { scale: 1, opacity: 0 }
              }
              transition={{
                duration: transition.phase === "covering" ? 0.5 : 0.24,
                ease:
                  transition.phase === "covering"
                    ? [0.22, 1, 0.36, 1]
                    : "easeOut",
              }}
            />
          </motion.div>
        )}
      </div>
    </NavTransitionContext.Provider>
  );
}

export function useNavTransition() {
  const context = useContext(NavTransitionContext);

  if (!context) {
    throw new Error("useNavTransition must be used within NavTransitionProvider");
  }

  return context;
}
