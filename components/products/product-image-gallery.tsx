"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const mainImageRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);

  const slideCount = images && images.length;

  // Initial mount animation
  useGSAP(() => {
    gsap.from(mainImageRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  // Handle image change animation (Thumbnails)
  const handleImageSelect = (index: number) => {
    if (index === selectedImage) return;

    setSelectedImage(index);
    // Sync slide index as well
    goToSlide(index);
  };

  // Move to specific slide
  const goToSlide = (index: number) => {
    setSlideIndex(index);
    setSelectedImage(index);

    gsap.to(slidesRef.current, {
      x: `-${index * 100}%`,
      duration: 0.5,
      ease: "power2.out",
    });

    animateIndicator(index);
  };

  const animateIndicator = (index: number) => {
    gsap.to(".indicator-dot", {
      scale: 0.6,
      opacity: 0.4,
      duration: 0.3,
    });

    gsap.to(`.indicator-dot-${index}`, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  // Detect swipe start
  const handleTouchStart = (e: any) => {
    isDragging.current = true;
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  // Track user finger
  const handleTouchMove = (e: any) => {
    if (!isDragging.current) return;
    currentX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  // On release → determine direction
  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const diff = startX.current - currentX.current;

    if (diff > 50) {
      // Swipe LEFT → Next
      if (slideIndex < slideCount - 1) goToSlide(slideIndex + 1);
    } else if (diff < -50) {
      // Swipe RIGHT → Prev
      if (slideIndex > 0) goToSlide(slideIndex - 1);
    }
  };

  useEffect(() => {
    const slider = mainImageRef.current;
    if (!slider) return;

    slider.addEventListener("touchstart", handleTouchStart);
    slider.addEventListener("touchmove", handleTouchMove);
    slider.addEventListener("touchend", handleTouchEnd);

    slider.addEventListener("mousedown", handleTouchStart);
    slider.addEventListener("mousemove", handleTouchMove);
    slider.addEventListener("mouseup", handleTouchEnd);
    slider.addEventListener("mouseleave", handleTouchEnd);

    return () => {
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchmove", handleTouchMove);
      slider.removeEventListener("touchend", handleTouchEnd);

      slider.removeEventListener("mousedown", handleTouchStart);
      slider.removeEventListener("mousemove", handleTouchMove);
      slider.removeEventListener("mouseup", handleTouchEnd);
      slider.removeEventListener("mouseleave", handleTouchEnd);
    };
  }, [slideIndex]);

  return (
    <div className="relative h-[50vh] lg:h-screen lg:sticky lg:top-0">
      {/* Image Gallery - Positioned at top - HIDE ON MOBILE */}
      <div
        ref={thumbnailsRef}
        className="hidden lg:flex absolute top-4 left-4 z-10 flex-col gap-2"
      >
        {images && images.map((img, index) => (
          <button
            key={index}
            onClick={() => handleImageSelect(index)}
            className={`thumbnail-item flex-shrink-0 w-20 h-20 bg-white p-0.5 overflow-hidden transition-all ${
              selectedImage === index ? "border border-black" : ""
            }`}
          >
            <Image
              src={img}
              alt={`${productName} - ${index + 1}`}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image - Full Container with Swipe */}
      <div
        ref={mainImageRef}
        className="relative w-full h-full overflow-hidden touch-pan-y"
      >
        <div
          ref={slidesRef}
          className="slides flex w-full h-full"
          style={{ touchAction: "none" }}
        >
          {images && images.map((img, index) => (
            <div key={index} className="slide min-w-full h-full relative">
              <Image
                src={img}
                alt={productName}
                fill
                priority={index === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Mobile Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 md:hidden z-20">
          {images && images.map((_, idx) => (
            <div
              key={idx}
              className={`indicator-dot indicator-dot-${idx} w-2 h-2 rounded-full bg-white/80`}
              style={{
                transform: slideIndex === idx ? "scale(1)" : "scale(0.6)",
                opacity: slideIndex === idx ? 1 : 0.4,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
