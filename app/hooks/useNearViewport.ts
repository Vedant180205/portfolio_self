"use client";

import { useEffect, useRef, useState } from "react";

export function useNearViewport<T extends HTMLElement>(
  rootMargin = "300px 0px"
) {
  const ref = useRef<T | null>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, isNearViewport };
}
