"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Anton, Libre_Caslon_Display, Montserrat } from "next/font/google";
import { SplitText } from "gsap/all";
import Lenis from "@studio-freight/lenis/types";

gsap.registerPlugin(ScrollTrigger);
const libre = Libre_Caslon_Display({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const anton = Anton({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

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
    t1.to(
      descriptionRef.current,
      {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.in",
      },
      0
    ); // Start at the same time as title animation

    gsap.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: "expo.out",
    });

    // Show navbar title
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "bottom top",
      onEnter: () => {
        gsap.to(navTitleRef.current, {
          opacity: 1,
          duration: 0.3,
        });
      },
      onLeaveBack: () => {
        gsap.to(navTitleRef.current, {
          opacity: 0,
          duration: 0.3,
        });
      },
    });

    const heroSplit = new SplitText(".title", {
      type: "chars, words",
    });

    const paragraphSplit = new SplitText(".subtitle", {
      type: "lines",
    });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-slate-800/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a
              href="#"
              className="relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              SHOP
            </a>
            <a
              href="#"
              className="relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              COLLECTIONS
            </a>
            <a
              href="#"
              className="relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              ABOUT US
            </a>
            <a
              href="#"
              className="relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              SIGNATURE TREATS
            </a>
          </div>

          {/* Navbar Title (hidden initially) */}
          <div
            ref={navTitleRef}
            className="absolute left-1/2 -translate-x-1/2 opacity-0"
          >
            <h2 className=" text-white text-xl font-light tracking-wider">
              SRI MAHALAKSHMI <span className="mx-2">—</span> SWEETS
            </h2>
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full">
              SEARCH
            </button>
            <button className="relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full">
              ACCOUNT
            </button>
            <button className="relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full">
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
          <div
            ref={titleRef}
            className="relative z-10 text-center -translate-y-18"
          >
            <h1
              className={`no-select title text-white ${anton.className} text-8xl font-light tracking-wider whitespace-nowrap`}
            >
              SRI MAHALAKSHMI <span className="mx-4">—</span> SWEETS
            </h1>
          </div>

          {/* Description */}
          <div
            ref={descriptionRef}
            className="no-select absolute bottom-20 left-12 max-w-md z-10 subtitle"
          >
            <h2
              className={`text-white text-5xl ${libre.className} font-serif mb-4`}
            >
              Traditional Indian Sweets
            </h2>
            <p className={`text-white ${montserrat.className} text-lg mb-6 `}>
              Experience the authentic taste of handcrafted sweets made with
              premium ingredients and time-honored recipes.
            </p>
            <button
              className={`text-white ${montserrat.className} text-sm tracking-wider border-b border-white pb-1 hover:opacity-70 transition-opacity`}
            >
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
