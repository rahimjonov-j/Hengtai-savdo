import { useEffect, useRef, useState } from "react";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const fallbackId = window.setTimeout(() => {
      setIsVisible(true);
    }, 350);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(host);

    return () => {
      window.clearTimeout(fallbackId);
      observer.disconnect();
    };
  }, []);

  return { ref, isVisible };
}

export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}
