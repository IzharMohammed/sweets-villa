"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { libre } from "@/lib/fonts";

interface ProductAccordionProps {
  description: string;
  category: string;
  stock: number; 
}

export default function ProductAccordion({
  description,
  category,
  weight,
  stock,
}: {
  description: string;
  category: string;
  weight: string;
  stock: number;
}) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const plusIconRef = useRef<SVGSVGElement>(null);

  const toggleDetails = () => {
    const newState = !isDetailsOpen;
    setIsDetailsOpen(newState);

    if (newState) {
      gsap.to(plusIconRef.current, {
        rotation: 45,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(descriptionRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(plusIconRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(descriptionRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  return (
    <div className="border-t border-gray-200 pt-6 mb-20 lg:mb-0">
      <button
        onClick={toggleDetails}
        className="w-full cursor-pointer flex items-center justify-between text-left group"
      >
        <h3 className={`text-2xl text-gray-900 ${libre.className}`}>
          Product Details
        </h3>
        <svg
          ref={plusIconRef}
          className="w-5 h-5 text-gray-900"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      <div ref={descriptionRef} className="overflow-hidden h-0 opacity-0">
        <div className="pt-4 pb-2">
          <p className="text-gray-700 leading-relaxed text-sm mb-4">
            {description}
          </p>
          <div className="space-y-2 text-sm">
            <p className="text-gray-700">
              <span className="font-semibold">Category:</span> {category}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Weight:</span> {weight}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Stock:</span> {stock} units available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
