// v5 - Premium Redesign
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { Poppins, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import BottomNav from "./bottom-nav";

gsap.registerPlugin(ScrollTrigger);

const poppins = Poppins({ weight: ["300", "400", "500"], style: "normal", subsets: ["latin"] });
const playfair = Playfair_Display({ weight: ["400", "600", "700"], style: ["normal", "italic"], subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ weight: ["300", "400", "500", "600"], style: ["normal", "italic"], subsets: ["latin"] });

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const navTitleTargetRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial entrance animations
    const heroSplit = new SplitText(".title", {
      type: "chars, words",
    });

    const paragraphSplit = new SplitText(".subtitle", {
      type: "lines",
    });

    // Elegant fade in for title
    const tl = gsap.timeline();
    
    tl.from(titleRef.current, {
      y: 30,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    })
    .from(heroSplit.chars, {
      y: 40,
      opacity: 0,
      rotationX: -90,
      duration: 1.2,
      ease: "back.out(1.7)",
      stagger: 0.03,
    }, "-=1.0")
    .from(paragraphSplit.lines, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.out",
      stagger: 0.1,
    }, "-=0.8")
    .from(".nav-link", {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1,
    }, "-=1.0")
    .from(".hero-btn", {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.5");

    // Scroll Animation Logic
    const titleElement = titleRef.current;

    if (titleElement && heroRef.current) {
      const scrollAnim = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "40% top",
          scrub: 1,
          pin: false,
        }
      });

      // Calculate target position (center of navbar)
      // Navbar height ~80px, center ~40px
      // Initial title center ~50vh
      const vh = window.innerHeight;
      const targetY = -(vh * 0.5) + 40; 
      
      // Target Scale (approximate for text-xl vs text-7xl)
      // 1.25rem (20px) / 4.5rem (72px) ~ 0.28
      const targetScale = 0.28;

      scrollAnim.to(titleElement, {
        y: targetY,
        scale: targetScale,
        color: "#ffffff",
        duration: 1,
        ease: "power1.inOut"
      });

      // Fade out other elements elegantly
      scrollAnim.to([".description", ".background-image", ".scroll-indicator"], {
        opacity: 0,
        y: -30,
        filter: "blur(5px)",
        duration: 0.5
      }, 0);
      
      // Ensure z-index is high so it sits on top of navbar
      gsap.set(titleElement, { zIndex: 60 });
    }

  }, []);

  return (
    <>
      {/* Desktop Navbar - Premium Glassmorphism */}
      <nav className="hidden lg:block fixed top-0 left-0 w-full z-50 bg-slate-900/40 backdrop-blur-md border-b border-white/10 h-[80px] transition-all duration-300">
        <div className="container mx-auto px-8 h-full flex items-center justify-between">
          <div className="flex items-center space-x-10">
            {["SHOP", "COLLECTIONS", "OUR STORY", "GIFTING"].map((item) => (
              <a
                key={item}
                href="#"
                className={`nav-link relative text-white/90 text-xs tracking-[0.2em] font-medium hover:text-white transition-colors uppercase ${poppins.className}
                  after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-amber-200 after:transition-all after:duration-300 hover:after:w-full`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Placeholder for title */}
          <div className="w-[300px]" />

          <div className="flex items-center space-x-8">
            {["SEARCH", "ACCOUNT", "CART (0)"].map((item) => (
              <button key={item} className={`nav-link relative text-white/90 text-xs tracking-[0.2em] font-medium hover:text-white transition-colors uppercase ${poppins.className}
                after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-amber-200 after:transition-all after:duration-300 hover:after:w-full`}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Mobile Top Navbar */}
      <nav className="lg:hidden fixed top-0 left-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
        <div className="px-6 py-4 text-center">
          <h2 className={`text-white text-lg tracking-widest ${playfair.className}`}>
            SRI MAHALAKSHMI
          </h2>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[120vh] bg-[#0F172A] hidden lg:block"
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Premium Background */}
          <div className="absolute inset-0 hidden lg:block background-image">
            {/* Dark overlay gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/90 z-[1]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-900/40 to-slate-900/80 z-[1]" />
            
            <img
              src="/sweets.png"
              alt="Artisanal Sweets"
              className="w-full h-full object-cover opacity-60 scale-105"
            />
          </div>

          {/* Main Title - Centered & Elegant */}
          <div
            ref={titleRef}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-center origin-center w-full pointer-events-none mix-blend-screen"
          >
            <h1
              className={`title text-white ${playfair.className} text-4xl md:text-6xl lg:text-7xl font-normal tracking-wide whitespace-nowrap drop-shadow-2xl`}
            >
              <span className="italic font-light text-amber-100/90">Sri</span> Mahalakshmi <span className="text-amber-200/80 text-4xl align-middle mx-2">✦</span> Sweets
            </h1>
          </div>

          {/* Left Description - Minimalist */}
          <div className="no-select absolute bottom-20 left-20 max-w-md z-10 subtitle description hidden sm:block">
            <div className="h-[1px] w-12 bg-amber-200/60 mb-6" />
            <h2
              className={`text-amber-50 text-3xl lg:text-4xl ${cormorant.className} font-light italic mb-4 leading-tight`}
            >
              Curators of <br/>Authentic Tradition
            </h2>
            <p
              className={`text-slate-300 ${poppins.className} text-sm font-light tracking-wide leading-relaxed mb-8 max-w-xs`}
            >
              Handcrafted with premium ingredients and time-honored recipes since 1995.
            </p>
            <button
              className={`hero-btn group relative px-8 py-3 overflow-hidden bg-transparent border border-amber-200/30 text-amber-50 ${poppins.className} text-xs tracking-[0.2em] transition-all duration-500 hover:border-amber-200 pointer-events-auto`}
            >
              <span className="relative z-10 group-hover:text-slate-900 transition-colors duration-500">EXPLORE COLLECTION</span>
              <div className="absolute inset-0 bg-amber-100 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            </button>
          </div>

          {/* Right Description - Location/Context */}
          <div className="no-select absolute bottom-20 right-20 max-w-xs z-10 subtitle description hidden sm:block text-right">
             <div className="h-[1px] w-12 bg-amber-200/60 mb-6 ml-auto" />
            <h2
              className={`text-amber-50 text-2xl ${cormorant.className} font-light mb-2`}
            >
              ArundelPet Main Road
            </h2>
            <p
              className={`text-slate-400 ${poppins.className} text-xs tracking-widest uppercase`}
            >
              Est. 1995
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 scroll-indicator animate-bounce hidden lg:block">
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
          </div>

          {/* Mobile Description */}
          <div className="no-select absolute bottom-24 left-0 right-0 px-6 z-10 subtitle description lg:hidden">
            <div className="text-center">
              <h2
                className={`text-white text-3xl ${playfair.className} mb-3`}
              >
                Traditional Luxury
              </h2>
              <p className={`text-slate-300 ${poppins.className} text-sm mb-6 font-light`}>
                Handcrafted with premium ingredients
              </p>
              <button
                className={`px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white ${poppins.className} text-xs tracking-widest uppercase`}
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
