"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function GsapHamburger({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  const topRef = useRef<HTMLSpanElement>(null);
  const midRef = useRef<HTMLSpanElement>(null);
  const botRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.3, ease: "power2.inOut" },
    });

    if (isOpen) {
      tl.to(topRef.current, { y: 8, rotate: 45 }, 0)
        .to(midRef.current, { opacity: 0 }, 0)
        .to(botRef.current, { y: -8, rotate: -45 }, 0);
    } else {
      tl.to(topRef.current, { y: 0, rotate: 0 }, 0)
        .to(midRef.current, { opacity: 1 }, 0)
        .to(botRef.current, { y: 0, rotate: 0 }, 0);
    }
  }, [isOpen]);

  return (
    <button
      onClick={toggle}
      // className="relative w-8 h-8 flex flex-col justify-center items-center gap-[6px] z-50"
      className="relative w-8 h-8 flex flex-col justify-center items-center gap-[6px] z-50 transition-transform duration-200 hover:scale-110"
    >
      <span ref={topRef} className="w-6 h-[2px] bg-white block" />
      <span ref={midRef} className="w-6 h-[2px] bg-white block" />
      <span ref={botRef} className="w-6 h-[2px] bg-white block" />
    </button>
  );
}
