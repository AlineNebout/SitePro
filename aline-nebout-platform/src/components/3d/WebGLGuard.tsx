"use client";

import { Suspense, useEffect, useState, type ReactNode } from "react";

function useWebGLSupport(): boolean {
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

interface WebGLGuardProps {
  children: ReactNode;
  fallback: ReactNode;
  placeholder?: ReactNode;
}

export default function WebGLGuard({ children, fallback, placeholder }: WebGLGuardProps) {
  const webglSupported = useWebGLSupport();
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR / initial render: show placeholder or fallback
  if (!mounted) {
    return <>{placeholder ?? fallback}</>;
  }

  // No WebGL or reduced motion: show static fallback
  if (!webglSupported || reducedMotion) {
    return <>{fallback}</>;
  }

  return (
    <Suspense fallback={placeholder ?? fallback}>
      {children}
    </Suspense>
  );
}
