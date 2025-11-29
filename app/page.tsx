import Image from "next/image";
import HeroSection from "../components/  HeroSection";
import Navbar from "../components/Navbar";
import Products from "../components/products/products";
import Footer from "../components/Footer";
import { cookieManager } from "@/utils/authTools";

export default async function Home() {
  const auth = await cookieManager.isAuthenticated();
  console.log("auth", auth);
  

  return (
    <div>
      {/* <Navbar /> */}
      {/* Hero section */}
      <HeroSection />
      {/* Products section */}
      <Products />
      {/* <section className="min-h-screen bg-white py-20"></section> */}
      {/* Footer */}
      <Footer />
    </div>
  );
}
