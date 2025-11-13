"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { lato, libre, montserrat, ubuntu } from "@/lib/fonts";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import GsapHamburger from "./GsapHamburger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const navTitleRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useGSAP(() => {
    // ============================================
    // STEP 1: Initial entrance animations
    // ============================================

    // Animate title appearing on page load
    gsap.from(titleRef.current, {
      y: 50, // Start 50px below
      opacity: 0, // Start invisible
      duration: 1.5, // Take 1.5 seconds
      ease: "expo.out", // Smooth deceleration
    });

    // Split text into individual characters for stagger effect
    const heroSplit = new SplitText(".title", {
      type: "chars, words", // Break into characters and words
    });

    const paragraphSplit = new SplitText(".subtitle", {
      type: "lines", // Break into lines
    });

    // Add gradient class to each character
    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    // Animate each character one by one (stagger)
    gsap.from(heroSplit.chars, {
      yPercent: 100, // Start 100% below (relative to char height)
      duration: 1.8, // Each char takes 1.8s
      ease: "expo.out",
      stagger: 0.06, // 0.06s delay between each character
      opacity: 0,
      delay: 0.5,
    });

    // Animate subtitle lines
    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1.5, // Wait 1 second before starting
    });

    gsap.from(".nav-link", {
      y: -30, // start 30px above their final position
      opacity: 0, // start invisible
      duration: 0.8, // smooth duration
      ease: "power3.out", // easing curve
      stagger: 0.15, // each link appears 0.15s after the previous
    });

    // ============================================
    // STEP 2: Scroll-based shrink animation (THE FIX!)
    // ============================================

    // Get navbar height dynamically
    const navbarHeight = 60; // Adjust this to match your navbar height

    // Calculate how much to move up
    // We want the title center to align with navbar center
    const moveUpDistance = -(window.innerHeight / 2 - navbarHeight / 2);

    // Calculate scale factor to fit in navbar
    // Get the title's current width
    const titleWidth = titleRef.current?.offsetWidth || 1000;
    // We want it to fit in about 30% of viewport width for navbar
    const targetWidth = window.innerWidth * 0.25;
    const scaleFactor = targetWidth / titleWidth;

    const titleElement = titleRef.current;

    if (titleElement) {
      const titleWidth = titleElement.offsetWidth;
      const targetWidth = window.innerWidth * 0.3;
      const targetScale = targetWidth / titleWidth;
      const targetY = -(window.innerHeight / 2) + navbarHeight / 2;

      const t1 = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          pin: false,
        },
      });

      t1.to(titleElement, {
        scale: targetScale,
        y: targetY,
        duration: 1,
        ease: "power2.inOut",
      });

      t1.to(
        descriptionRef.current,
        {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power2.in",
        },
        0
      );
    }

    // ============================================
    // STEP 3: Show navbar title when hero is gone
    // ============================================

    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "bottom top", // When hero completely leaves viewport
      onEnter: () => {
        // Scrolling down past this point
        gsap.to(navTitleRef.current, {
          opacity: 1,
          duration: 0.3,
        });
      },
      onLeaveBack: () => {
        // Scrolling back up past this point
        gsap.to(navTitleRef.current, {
          opacity: 0,
          duration: 0.3,
        });
      },
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-slate-800/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="hidden lg:flex items-center space-x-8">
            <a
              href="#"
              className="nav-link relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              SHOP
            </a>
            <a
              href="#"
              className="nav-link relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              COLLECTIONS
            </a>
            <a
              href="#"
              className="nav-link relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              ABOUT US
            </a>
            <a
              href="#"
              className="nav-link relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full"
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

          <div className="hidden lg:flex items-center space-x-6">
            <button className="nav-link relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full">
              SEARCH
            </button>
            <button className="nav-link relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full">
              ACCOUNT
            </button>
            <button className="nav-link relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full">
              CART (0)
            </button>
          </div>

          {/* Mobile breadcrumb (hamburger) */}
          <div className="lg:hidden">
            <GsapHamburger isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-slate-900 z-50 shadow-lg p-6 flex flex-col"
            >
              <nav className="flex flex-col space-y-6">
                {["SHOP", "COLLECTIONS", "ABOUT US", "SIGNATURE TREATS"].map(
                  (link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-white text-lg hover:text-teal-300 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      {link}
                    </a>
                  )
                )}
              </nav>

              <div className="mt-auto pt-8 border-t border-gray-700">
                {["SEARCH", "ACCOUNT", "CART (0)"].map((btn) => (
                  <button
                    key={btn}
                    onClick={() => setIsOpen(false)}
                    className="text-white text-sm block w-full text-left py-2 hover:text-teal-300 transition"
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
              className={`no-select title text-white ${libre.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl  font-light tracking-wider whitespace-nowrap`}
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
              className={`text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl  ${libre.className} font-serif mb-4`}
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
      {/* <section className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl mb-8">Our Favorites</h2>
          <p className="text-gray-600">
            Simple, effective sweets our customers choose again and again.
          </p>
        </div>
      </section> */}
    </>
  );
}
