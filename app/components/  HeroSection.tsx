"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const navTitleRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Main animation timeline

    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5, // Smooth scrubbing effect
        pin: false,
      },
    });

    // Animate title scaling and position

    t1.to(titleRef.current, {
      scale: 0.35,
      y: -window.innerHeight / 2 + 40, // Move to navbar position
      duration: 1,
      ease: "power2.inOut",
    });

    // Fade out description
    t1.to(descriptionRef.current,{
      opacity:0,
      y:50,
      duration:0.8,
      ease:"power2.in"
    },0) // Start at the same time as title animation
  }, []);


  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-slate-800/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a href="#" className="text-white/70 hover:text-white text-sm">
              SHOP
            </a>
            <a href="#" className="text-white/70 hover:text-white text-sm">
              COLLECTIONS
            </a>
            <a href="#" className="text-white/70 hover:text-white text-sm">
              ABOUT US
            </a>
            <a href="#" className="text-white/70 hover:text-white text-sm">
              SIGNATURE TREATS
            </a>
          </div>

          {/* Navbar Title (hidden initially) */}
          <div
            ref={navTitleRef}
            className="absolute left-1/2 -translate-x-1/2 opacity-0"
          >
            <h2 className="text-white text-xl font-light tracking-wider">
              SRI MAHALAKSHMI <span className="mx-2">—</span> SWEETS
            </h2>
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-white/70 hover:text-white text-sm">
              SEARCH
            </button>
            <button className="text-white/70 hover:text-white text-sm">
              ACCOUNT
            </button>
            <button className="text-white/70 hover:text-white text-sm">
              CART (0)
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[200vh] bg-gradient-to-br from-slate-700 via-slate-600 to-teal-700"
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/sweets.png"
              alt="Sweets"
              className="w-full h-full object-cover opacity-40"
            />
          </div>

          {/* Main Title */}
          <div ref={titleRef} className="relative z-10 text-center">
            <h1 className="text-white text-8xl font-light tracking-wider whitespace-nowrap">
              SRI MAHALAKSHMI <span className="mx-4">—</span> SWEETS
            </h1>
          </div>

          {/* Description */}
          <div
            ref={descriptionRef}
            className="absolute bottom-32 left-12 max-w-md z-10"
          >
            <h2 className="text-white text-4xl font-serif mb-4">
              Traditional Indian Sweets
            </h2>
            <p className="text-white/80 text-lg mb-6">
              Experience the authentic taste of handcrafted sweets made with
              premium ingredients and time-honored recipes.
            </p>
            <button className="text-white text-sm tracking-wider border-b border-white pb-1 hover:opacity-70 transition-opacity">
              SHOP NOW
            </button>
          </div>
        </div>
      </section>

      {/* Content Section (to demonstrate scroll) */}
      <section className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl mb-8">Our Favorites</h2>
          <p className="text-gray-600">
            Simple, effective sweets our customers choose again and again.
          </p>
          {/* Add your product cards here */}
        </div>
      </section>
    </>
  );
}
