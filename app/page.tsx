import Image from "next/image";
import HeroSection from "../components/  HeroSection";
import Navbar from "../components/Navbar";
import Products from "../components/products/products";

export default function Home() {
  return (
    // <div className="flex flex-col items-center justify-center min-h-screen py-2">
    //   sweets villa started
    // </div>
    <div>
      {/* <Navbar /> */}
      {/* Hero section */}
      <HeroSection />
      {/* Products section */}
      <Products />
      {/* <section className="min-h-screen bg-white py-20"></section> */}
      {/* Footer */}
    </div>
  );
}
