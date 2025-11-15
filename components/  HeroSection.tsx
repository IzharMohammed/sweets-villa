// v3
"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import BottomNav from "./bottom-nav";

gsap.registerPlugin(ScrollTrigger);

const poppins = Poppins({ weight: "400", style: "normal", subsets: ["latin"] });

export default function HeroSection() {
  const navTitleRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("home");
  const onPress = (el: any) => {
    gsap.to(el, { scale: 0.85, duration: 0.15, ease: "power2.out" });
  };

  const onRelease = (el: any) => {
    gsap.to(el, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.4)" });
  };
  useGSAP(() => {
    // Initial entrance animations
    gsap.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: "expo.out",
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
      opacity: 0,
      delay: 0.5,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1.5,
    });

    gsap.from(".nav-link", {
      y: -30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
    });

    // Scroll-based shrink animation
    const navbarHeight = 60;
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
        ".description",
        {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power2.in",
        },
        0
      );
    }

    // Show navbar title when hero is gone
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Desktop Navbar - Hidden on mobile */}
      <nav className="hidden lg:block fixed top-0 left-0 w-full z-50 bg-slate-800/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
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
            <h2 className="text-white text-xl font-light tracking-wider">
              SRI MAHALAKSHMI <span className="mx-2">—</span> SWEETS
            </h2>
          </div>

          <div className="flex items-center space-x-6">
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
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}

      {/* V1 */}
      <BottomNav />

      {/* v2 */}
      {/* <nav
        className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 
      w-[90%] max-w-md z-50 
      bg-white/20 backdrop-blur-xl 
      rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]
      border border-white/30 px-2 py-1"
      >
        <div className="flex items-center justify-around">
          <button
            onClick={() => setActiveTab("home")}
            onMouseDown={(e) => onPress(e.currentTarget)}
            onMouseUp={(e) => onRelease(e.currentTarget)}
            onTouchStart={(e) => onPress(e.currentTarget)}
            onTouchEnd={(e) => onRelease(e.currentTarget)}
            className="flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all duration-200"
          >
            <div
              className={`${
                activeTab === "home" ? "scale-110" : "scale-100"
              } transition-all`}
            >
              <Home
                className={`w-6 h-6 ${
                  activeTab === "home" ? "text-blue-600" : "text-gray-700"
                }`}
              />
            </div>
            <span
              className={`text-[10px] font-medium ${
                activeTab === "home" ? "text-blue-600" : "text-gray-700"
              }`}
            >
              Home
            </span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            onMouseDown={(e) => onPress(e.currentTarget)}
            onMouseUp={(e) => onRelease(e.currentTarget)}
            onTouchStart={(e) => onPress(e.currentTarget)}
            onTouchEnd={(e) => onRelease(e.currentTarget)}
            className="flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all duration-200"
          >
            <div
              className={`${
                activeTab === "products" ? "scale-110" : "scale-100"
              } transition-all`}
            >
              <ShoppingBag
                className={`w-6 h-6 ${
                  activeTab === "products" ? "text-blue-600" : "text-gray-700"
                }`}
              />
            </div>
            <span
              className={`text-[10px] font-medium ${
                activeTab === "products" ? "text-blue-600" : "text-gray-700"
              }`}
            >
              Products
            </span>
          </button>

          <button
            onClick={() => setActiveTab("cart")}
            onMouseDown={(e) => onPress(e.currentTarget)}
            onMouseUp={(e) => onRelease(e.currentTarget)}
            onTouchStart={(e) => onPress(e.currentTarget)}
            onTouchEnd={(e) => onRelease(e.currentTarget)}
            className="flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all duration-200 relative"
          >
            <div
              className={`${
                activeTab === "cart" ? "scale-110" : "scale-100"
              } transition-all`}
            >
              <ShoppingCart
                className={`w-6 h-6 ${
                  activeTab === "cart" ? "text-blue-600" : "text-gray-700"
                }`}
              />
              <span className="absolute top-0 right-2 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </div>
            <span
              className={`text-[10px] font-medium ${
                activeTab === "cart" ? "text-blue-600" : "text-gray-700"
              }`}
            >
              Cart
            </span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            onMouseDown={(e) => onPress(e.currentTarget)}
            onMouseUp={(e) => onRelease(e.currentTarget)}
            onTouchStart={(e) => onPress(e.currentTarget)}
            onTouchEnd={(e) => onRelease(e.currentTarget)}
            className="flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all duration-200"
          >
            <div
              className={`${
                activeTab === "profile" ? "scale-110" : "scale-100"
              } transition-all`}
            >
              <User
                className={`w-6 h-6 ${
                  activeTab === "profile" ? "text-blue-600" : "text-gray-700"
                }`}
              />
            </div>
            <span
              className={`text-[10px] font-medium ${
                activeTab === "profile" ? "text-blue-600" : "text-gray-700"
              }`}
            >
              Profile
            </span>
          </button>
        </div>
      </nav> */}

      {/* Mobile Top Navbar - Only visible on mobile */}
      <nav className="lg:hidden fixed top-0 left-0 w-full z-50 bg-slate-800/95 backdrop-blur-md border-b border-slate-700">
        <div className="px-6 py-4 text-center">
          <h2 className="text-white text-lg font-light tracking-wider">
            SRI MAHALAKSHMI <span className="mx-2">—</span> SWEETS
          </h2>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[200vh] bg-gradient-to-br from-slate-700 via-slate-600 to-teal-700 hidden lg:block"
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image - Hidden on mobile, visible on large screens */}
          <div className="absolute inset-0 hidden lg:block">
            <img
              src="/sweets.png"
              alt="Sweets"
              className="w-full h-full object-cover opacity-40"
            />
          </div>

          {/* Main Title - Hidden on mobile, visible on large screens */}
          <div
            ref={titleRef}
            className="relative z-10 text-center -translate-y-48 lg:-translate-y-28 hidden lg:block"
          >
            <h1
              className={`no-select title text-white ${poppins.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wider whitespace-nowrap`}
            >
              SRI MAHALAKSHMI <span>—</span> SWEETS
            </h1>
          </div>

          {/* Left Description */}
          <div className="no-select absolute bottom-10 left-12 max-w-sm lg:max-w-md z-10 subtitle description hidden sm:block">
            <h2
              className={`text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl ${poppins.className} font-serif mb-4`}
            >
              Traditional Indian Sweets
            </h2>
            <p
              className={`text-white ${poppins.className} text-sm sm:text-base md:text-lg mb-6`}
            >
              Experience the authentic taste of handcrafted sweets made with
              premium ingredients and time-honored recipes.
            </p>
            <button
              className={`text-white ${poppins.className} text-sm tracking-wider border-b border-white pb-1 hover:opacity-70 transition-opacity`}
            >
              SHOP NOW
            </button>
          </div>

          {/* Right Description */}
          <div className="no-select absolute bottom-10 right-12 max-w-md z-10 subtitle description hidden sm:block">
            <h2
              className={`text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl ${poppins.className} font-serif mb-4`}
            >
              ArundelPet Main Road
            </h2>
            <p
              className={`text-sm sm:text-base md:text-lg ${poppins.className} text-lg mb-6 text-white`}
            >
              since 1995
            </p>
          </div>

          {/* Mobile Description - Centered at bottom */}
          <div className="no-select absolute bottom-24 left-0 right-0 px-6 z-10 subtitle description lg:hidden">
            <div className="text-center">
              <h2
                className={`text-white text-3xl ${poppins.className} font-serif mb-3`}
              >
                Traditional Indian Sweets
              </h2>
              <p className={`text-white ${poppins.className} text-base mb-4`}>
                Handcrafted with premium ingredients since 1995
              </p>
              <button
                className={`text-white ${poppins.className} text-sm tracking-wider border-b border-white pb-1 hover:opacity-70 transition-opacity`}
              >
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
