// "use client";

// import { useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import { SplitText } from "gsap/all";
// import { lato, libre, montserrat, ubuntu } from "@/lib/fonts";
// import { motion, AnimatePresence } from "framer-motion";
// import GsapHamburger from "./GsapHamburger";

// gsap.registerPlugin(ScrollTrigger);

// export default function HeroSection() {
//   const navTitleRef = useRef<HTMLDivElement>(null);
//   const heroRef = useRef<HTMLDivElement>(null);
//   const titleRef = useRef<HTMLDivElement>(null);
//   const descriptionRef = useRef<HTMLDivElement>(null);

//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   useGSAP(() => {
//     // ============================================
//     // STEP 1: Initial entrance animations
//     // ============================================

//     // Animate title appearing on page load
//     gsap.from(titleRef.current, {
//       y: 50, // Start 50px below
//       opacity: 0, // Start invisible
//       duration: 1.5, // Take 1.5 seconds
//       ease: "expo.out", // Smooth deceleration
//     });

//     // Split text into individual characters for stagger effect
//     const heroSplit = new SplitText(".title", {
//       type: "chars, words", // Break into characters and words
//     });

//     const paragraphSplit = new SplitText(".subtitle", {
//       type: "lines", // Break into lines
//     });

//     // Add gradient class to each character
//     heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

//     // Animate each character one by one (stagger)
//     gsap.from(heroSplit.chars, {
//       yPercent: 100, // Start 100% below (relative to char height)
//       duration: 1.8, // Each char takes 1.8s
//       ease: "expo.out",
//       stagger: 0.06, // 0.06s delay between each character
//       opacity: 0,
//       delay: 0.5,
//     });

//     // Animate subtitle lines
//     gsap.from(paragraphSplit.lines, {
//       opacity: 0,
//       yPercent: 100,
//       duration: 1.8,
//       ease: "expo.out",
//       stagger: 0.06,
//       delay: 1.5, // Wait 1 second before starting
//     });

//     gsap.from(".nav-link", {
//       y: -30, // start 30px above their final position
//       opacity: 0, // start invisible
//       duration: 0.8, // smooth duration
//       ease: "power3.out", // easing curve
//       stagger: 0.15, // each link appears 0.15s after the previous
//     });

//     // ============================================
//     // STEP 2: Scroll-based shrink animation (THE FIX!)
//     // ============================================

//     // Get navbar height dynamically
//     const navbarHeight = 60; // Adjust this to match your navbar height

//     // Calculate how much to move up
//     // We want the title center to align with navbar center
//     const moveUpDistance = -(window.innerHeight / 2 - navbarHeight / 2);

//     // Calculate scale factor to fit in navbar
//     // Get the title's current width
//     const titleWidth = titleRef.current?.offsetWidth || 1000;
//     // We want it to fit in about 30% of viewport width for navbar
//     const targetWidth = window.innerWidth * 0.25;
//     const scaleFactor = targetWidth / titleWidth;

//     const titleElement = titleRef.current;

//     if (titleElement) {
//       const titleWidth = titleElement.offsetWidth;
//       const targetWidth = window.innerWidth * 0.3;
//       const targetScale = targetWidth / titleWidth;
//       const targetY = -(window.innerHeight / 2) + navbarHeight / 2;

//       const t1 = gsap.timeline({
//         scrollTrigger: {
//           trigger: heroRef.current,
//           start: "top top",
//           end: "bottom top",
//           scrub: 1.5,
//           pin: false,
//         },
//       });

//       t1.to(titleElement, {
//         scale: targetScale,
//         y: targetY,
//         duration: 1,
//         ease: "power2.inOut",
//       });

//       t1.to(
//         ".description",
//         {
//           opacity: 0,
//           y: 50,
//           duration: 0.8,
//           ease: "power2.in",
//         },
//         0
//       );
//     }

//     // ============================================
//     // STEP 3: Show navbar title when hero is gone
//     // ============================================

//     ScrollTrigger.create({
//       trigger: heroRef.current,
//       start: "bottom top", // When hero completely leaves viewport
//       onEnter: () => {
//         // Scrolling down past this point
//         gsap.to(navTitleRef.current, {
//           opacity: 1,
//           duration: 0.3,
//         });
//       },
//       onLeaveBack: () => {
//         // Scrolling back up past this point
//         gsap.to(navTitleRef.current, {
//           opacity: 0,
//           duration: 0.3,
//         });
//       },
//     });

//     // Cleanup function
//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="fixed top-0 left-0 w-full z-50 bg-slate-800/80 backdrop-blur-md">
//         <div className="container mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="hidden lg:flex items-center space-x-8">
//             <a
//               href="#"
//               className="nav-link relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full"
//             >
//               SHOP
//             </a>
//             <a
//               href="#"
//               className="nav-link relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full"
//             >
//               COLLECTIONS
//             </a>
//             <a
//               href="#"
//               className="nav-link relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full"
//             >
//               ABOUT US
//             </a>
//             <a
//               href="#"
//               className="nav-link relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full"
//             >
//               SIGNATURE TREATS
//             </a>
//           </div>

//           {/* Navbar Title (hidden initially) */}
//           <div
//             ref={navTitleRef}
//             className="absolute left-1/2 -translate-x-1/2 opacity-0"
//           >
//             <h2 className=" text-white text-xl font-light tracking-wider">
//               SRI MAHALAKSHMI <span className="mx-2">—</span> SWEETS
//             </h2>
//           </div>

//           <div className="hidden lg:flex items-center space-x-6">
//             <button className="nav-link relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full">
//               SEARCH
//             </button>
//             <button className="nav-link relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full">
//               ACCOUNT
//             </button>
//             <button className="nav-link relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full">
//               CART (0)
//             </button>
//           </div>

//           {/* Mobile breadcrumb (hamburger) */}
//           <div className="lg:hidden">
//             <GsapHamburger isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
//           </div>
//         </div>

//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", stiffness: 200, damping: 25 }}
//               className="fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-slate-900 z-50 shadow-lg p-6 flex flex-col"
//             >
//               <nav className="flex flex-col space-y-6">
//                 {["SHOP", "COLLECTIONS", "ABOUT US", "SIGNATURE TREATS"].map(
//                   (link) => (
//                     <a
//                       key={link}
//                       href="#"
//                       className="text-white text-lg hover:text-teal-300 transition"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       {link}
//                     </a>
//                   )
//                 )}
//               </nav>

//               <div className="mt-auto pt-8 border-t border-gray-700">
//                 {["SEARCH", "ACCOUNT", "CART (0)"].map((btn) => (
//                   <button
//                     key={btn}
//                     onClick={() => setIsOpen(false)}
//                     className="text-white text-sm block w-full text-left py-2 hover:text-teal-300 transition"
//                   >
//                     {btn}
//                   </button>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>

//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 0.5 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-black z-40"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Hero Section */}
//       <section
//         ref={heroRef}
//         className="relative h-[200vh] bg-gradient-to-br from-slate-700 via-slate-600 to-teal-700"
//       >
//         <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
//           {/* Background Image */}
//           <div className="absolute inset-0">
//             <img
//               src="/sweets.png"
//               alt="Sweets"
//               className={`w-full h-full object-cover opacity-40`}
//             />
//           </div>

//           {/* Main Title */}
//           <div
//             ref={titleRef}
//             className="relative z-10 text-center -translate-y-48 lg:-translate-y-28"
//           >
//             <h1
//               className={`no-select title text-white ${libre.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl  font-light tracking-wider whitespace-nowrap`}
//             >
//               SRI MAHALAKSHMI <span>—</span> SWEETS
//             </h1>
//           </div>

//           {/* Description */}
//           <div
//             // ref={descriptionRef}
//             className="no-select absolute bottom-10  left-12 max-w-sm lg:max-w-md z-10 subtitle description"
//           >
//             <h2
//               className={`text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl  ${libre.className} font-serif mb-4`}
//             >
//               Traditional Indian Sweets
//             </h2>
//             <p
//               className={`text-white  ${montserrat.className}  text-sm sm:text-base md:text-lg  mb-6`}
//             >
//               Experience the authentic taste of handcrafted sweets made with
//               premium ingredients and time-honored recipes.
//             </p>
//             <button
//               className={`text-white ${montserrat.className} text-sm tracking-wider border-b border-white pb-1 hover:opacity-70 transition-opacity`}
//             >
//               SHOP NOW
//             </button>
//           </div>

//           <div
//             // ref={descriptionRef}
//             className="no-select  absolute bottom-10 right-12 max-w-md z-10 subtitle description"
//           >
//             <h2
//               className={`text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl  ${libre.className} font-serif mb-4`}
//             >
//               ArundelPet Main Road
//             </h2>
//             <p
//               className={`text-sm sm:text-base md:text-lg ${montserrat.className} text-lg  mb-6`}
//             >
//               since 1995
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Content Section (to demonstrate scroll) */}
//       {/* <section className="min-h-screen bg-white py-20">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl mb-8">Our Favorites</h2>
//           <p className="text-gray-600">
//             Simple, effective sweets our customers choose again and again.
//           </p>
//         </div>
//       </section> */}
//     </>
//   );
// }

// v2
// "use client";

// import { useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import { SplitText } from "gsap/all";
// import { Home, ShoppingBag, ShoppingCart, User } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { Poppins } from "next/font/google";
// import { libre } from "@/lib/fonts";

// gsap.registerPlugin(ScrollTrigger);

// const poppins = Poppins({ weight: "400", style: "normal", subsets: ["latin"] });
// export default function HeroSection() {
//   const navTitleRef = useRef<HTMLDivElement>(null);
//   const heroRef = useRef<HTMLDivElement>(null);
//   const titleRef = useRef<HTMLDivElement>(null);
//   const descriptionRef = useRef<HTMLDivElement>(null);

//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [activeTab, setActiveTab] = useState<string>("home");

//   useGSAP(() => {
//     // Initial entrance animations
//     gsap.from(titleRef.current, {
//       y: 50,
//       opacity: 0,
//       duration: 1.5,
//       ease: "expo.out",
//     });

//     const heroSplit = new SplitText(".title", {
//       type: "chars, words",
//     });

//     const paragraphSplit = new SplitText(".subtitle", {
//       type: "lines",
//     });

//     heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

//     gsap.from(heroSplit.chars, {
//       yPercent: 100,
//       duration: 1.8,
//       ease: "expo.out",
//       stagger: 0.06,
//       opacity: 0,
//       delay: 0.5,
//     });

//     gsap.from(paragraphSplit.lines, {
//       opacity: 0,
//       yPercent: 100,
//       duration: 1.8,
//       ease: "expo.out",
//       stagger: 0.06,
//       delay: 1.5,
//     });

//     gsap.from(".nav-link", {
//       y: -30,
//       opacity: 0,
//       duration: 0.8,
//       ease: "power3.out",
//       stagger: 0.15,
//     });

//     // Scroll-based shrink animation
//     const navbarHeight = 60;
//     const titleElement = titleRef.current;

//     if (titleElement) {
//       const titleWidth = titleElement.offsetWidth;
//       const targetWidth = window.innerWidth * 0.3;
//       const targetScale = targetWidth / titleWidth;
//       const targetY = -(window.innerHeight / 2) + navbarHeight / 2;

//       const t1 = gsap.timeline({
//         scrollTrigger: {
//           trigger: heroRef.current,
//           start: "top top",
//           end: "bottom top",
//           scrub: 1.5,
//           pin: false,
//         },
//       });

//       t1.to(titleElement, {
//         scale: targetScale,
//         y: targetY,
//         duration: 1,
//         ease: "power2.inOut",
//       });

//       t1.to(
//         ".description",
//         {
//           opacity: 0,
//           y: 50,
//           duration: 0.8,
//           ease: "power2.in",
//         },
//         0
//       );
//     }

//     // Show navbar title when hero is gone
//     ScrollTrigger.create({
//       trigger: heroRef.current,
//       start: "bottom top",
//       onEnter: () => {
//         gsap.to(navTitleRef.current, {
//           opacity: 1,
//           duration: 0.3,
//         });
//       },
//       onLeaveBack: () => {
//         gsap.to(navTitleRef.current, {
//           opacity: 0,
//           duration: 0.3,
//         });
//       },
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   const handleNavigation = (path: string) => {
//     // In a real Next.js app, you would use:
//     const router = useRouter();
//     router.push(path);

//     // For demo purposes, we'll just log
//     console.log(`Navigating to: ${path}`);
//     setActiveTab(path.replace("/", "") || "home");
//   };

//   return (
//     <>
//       {/* Desktop Navbar - Hidden on mobile */}
//       <nav className="hidden lg:block fixed top-0 left-0 w-full z-50 bg-slate-800/80 backdrop-blur-md">
//         <div className="container mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-8">
//             <a
//               href="#"
//               className="nav-link relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full"
//             >
//               SHOP
//             </a>
//             <a
//               href="#"
//               className="nav-link relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full"
//             >
//               COLLECTIONS
//             </a>
//             <a
//               href="#"
//               className="nav-link relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full"
//             >
//               ABOUT US
//             </a>
//             <a
//               href="#"
//               className="nav-link relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full"
//             >
//               SIGNATURE TREATS
//             </a>
//           </div>

//           {/* Navbar Title (hidden initially) */}
//           <div
//             ref={navTitleRef}
//             className="absolute left-1/2 -translate-x-1/2 opacity-0"
//           >
//             <h2 className="text-white text-xl font-light tracking-wider">
//               SRI MAHALAKSHMI <span className="mx-2">—</span> SWEETS
//             </h2>
//           </div>

//           <div className="flex items-center space-x-6">
//             <button className="nav-link relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full">
//               SEARCH
//             </button>
//             <button className="nav-link relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full">
//               ACCOUNT
//             </button>
//             <button className="nav-link relative text-white text-sm after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 hover:after:w-full">
//               CART (0)
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Bottom Navigation */}
//       <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 bg-slate-800/95 backdrop-blur-md border-t border-slate-700 pb-safe">
//         <div className="flex items-center justify-around py-3 px-4">
//           {/* Home */}
//           <button
//             onClick={() => handleNavigation("/")}
//             className={`flex flex-col items-center space-y-1 transition-colors ${
//               activeTab === "home" ? "text-teal-400" : "text-white/70"
//             }`}
//           >
//             <Home className="w-6 h-6" />
//             <span className="text-xs">Home</span>
//           </button>

//           {/* Products */}
//           <button
//             onClick={() => handleNavigation("/products")}
//             className={`flex flex-col items-center space-y-1 transition-colors ${
//               activeTab === "products" ? "text-teal-400" : "text-white/70"
//             }`}
//           >
//             <ShoppingBag className="w-6 h-6" />
//             <span className="text-xs">Products</span>
//           </button>

//           {/* Cart */}
//           <button
//             onClick={() => handleNavigation("/cart")}
//             className={`flex flex-col items-center space-y-1 transition-colors relative ${
//               activeTab === "cart" ? "text-teal-400" : "text-white/70"
//             }`}
//           >
//             <ShoppingCart className="w-6 h-6" />
//             <span className="text-xs">Cart</span>
//             {/* Cart badge */}
//             <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//               0
//             </span>
//           </button>

//           {/* Profile */}
//           <button
//             onClick={() => handleNavigation("/profile")}
//             className={`flex flex-col items-center space-y-1 transition-colors ${
//               activeTab === "profile" ? "text-teal-400" : "text-white/70"
//             }`}
//           >
//             <User className="w-6 h-6" />
//             <span className="text-xs">Profile</span>
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section
//         ref={heroRef}
//         className="relative h-[200vh] bg-gradient-to-br from-slate-700 via-slate-600 to-teal-700"
//       >
//         <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
//           {/* Background Image */}
//           <div className="absolute inset-0">
//             <div className="w-full h-full bg-slate-700 opacity-40" />
//           </div>

//           {/* Main Title */}
//           <div
//             ref={titleRef}
//             className="relative z-10 text-center -translate-y-48 lg:-translate-y-28"
//           >
//             <h1
//               className={`no-select title text-white ${poppins.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wider whitespace-nowrap`}
//             >
//               SRI MAHALAKSHMI <span>—</span> SWEETS
//             </h1>
//           </div>

//           {/* Left Description */}
//           <div className="no-select absolute bottom-10 left-12 max-w-sm lg:max-w-md z-10 subtitle description hidden sm:block">
//             <h2
//               className={`text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl ${poppins.className} font-serif mb-4`}
//             >
//               Traditional Indian Sweets
//             </h2>
//             <p
//               className={`text-white ${poppins.className} text-sm sm:text-base md:text-lg mb-6`}
//             >
//               Experience the authentic taste of handcrafted sweets made with
//               premium ingredients and time-honored recipes.
//             </p>
//             <button
//               className={`text-white ${poppins.className} text-sm tracking-wider border-b border-white pb-1 hover:opacity-70 transition-opacity`}
//             >
//               SHOP NOW
//             </button>
//           </div>

//           {/* Right Description */}
//           <div className="no-select absolute bottom-10 right-12 max-w-md z-10 subtitle description hidden sm:block">
//             <h2
//               className={`text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl ${libre.className} font-serif mb-4`}
//             >
//               ArundelPet Main Road
//             </h2>
//             <p
//               className={`text-sm sm:text-base md:text-lg ${poppins.className} text-lg mb-6 text-white`}
//             >
//               since 1995
//             </p>
//           </div>

//           {/* Mobile Description - Centered at bottom */}
//           <div className="no-select absolute bottom-24 left-0 right-0 px-6 z-10 subtitle description sm:hidden">
//             <div className="text-center">
//               <h2
//                 className={`text-white text-2xl ${libre.className} font-serif mb-2`}
//               >
//                 Traditional Indian Sweets
//               </h2>
//               <p className={`text-white ${poppins.className} text-sm mb-4`}>
//                 Handcrafted with premium ingredients since 1995
//               </p>
//               <button
//                 className={`text-white ${poppins.className} text-sm tracking-wider border-b border-white pb-1 hover:opacity-70 transition-opacity`}
//               >
//                 SHOP NOW
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

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

gsap.registerPlugin(ScrollTrigger);

const poppins = Poppins({ weight: "400", style: "normal", subsets: ["latin"] });

export default function HeroSection() {
  const navTitleRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("home");

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

  const handleNavigation = (path: string) => {
    // In a real Next.js app, you would use:
    // import { useRouter } from 'next/navigation';
    // const router = useRouter();
    // router.push(path);

    // For demo purposes, we'll just log
    console.log(`Navigating to: ${path}`);
    setActiveTab(path.replace("/", "") || "home");
  };

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
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 bg-slate-800/95 backdrop-blur-md border-t border-slate-700 pb-safe">
        <div className="flex items-center justify-around py-3 px-4">
          {/* Home */}
          <button
            onClick={() => handleNavigation("/")}
            className={`flex flex-col items-center space-y-1 transition-colors ${
              activeTab === "home" ? "text-teal-400" : "text-white/70"
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>

          {/* Products */}
          <button
            onClick={() => handleNavigation("/products")}
            className={`flex flex-col items-center space-y-1 transition-colors ${
              activeTab === "products" ? "text-teal-400" : "text-white/70"
            }`}
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="text-xs">Products</span>
          </button>

          {/* Cart */}
          <button
            onClick={() => handleNavigation("/cart")}
            className={`flex flex-col items-center space-y-1 transition-colors relative ${
              activeTab === "cart" ? "text-teal-400" : "text-white/70"
            }`}
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="text-xs">Cart</span>
            {/* Cart badge */}
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </button>

          {/* Profile */}
          <button
            onClick={() => handleNavigation("/profile")}
            className={`flex flex-col items-center space-y-1 transition-colors ${
              activeTab === "profile" ? "text-teal-400" : "text-white/70"
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>

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
