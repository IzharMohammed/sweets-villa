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

      {/* SEO Content - Server Rendered */}
      {/* <section className="container mx-auto px-6 py-12 prose prose-slate max-w-none">
        <h1 className="text-3xl font-serif text-slate-900 mb-4">
          Sri Mahalakshmi Sweets - Authentic Indian Sweets & Gifting
        </h1>
        <p className="text-slate-600 mb-6">
          Welcome to Sri Mahalakshmi Sweets, your premier destination for
          authentic, handcrafted Indian sweets since 1995. Located in Guntur,
          Andhra Pradesh, we specialize in traditional recipes passed down
          through generations. Our commitment to quality ensures that every bite
          is a celebration of flavor and tradition.
        </p>
        <h2 className="text-2xl font-serif text-slate-800 mb-3">
          Premium Quality Ingredients
        </h2>
        <p className="text-slate-600 mb-6">
          We use only the finest ingredients, including pure ghee, premium nuts,
          and fresh milk, to create our signature sweets. From classic Laddoos
          and Mysore Pak to innovative dry fruit creations, our collection is
          curated to delight your senses.
        </p>
        <h2 className="text-2xl font-serif text-slate-800 mb-3">
          Perfect for Every Occasion
        </h2>
        <p className="text-slate-600">
          Whether you are looking for a festive treat, a wedding gift box, or a
          simple indulgence, Sri Mahalakshmi Sweets offers a wide range of
          options. Explore our collection and experience the taste of authentic
          tradition.
        </p>
      </section> */}

      {/* Products section */}
      <Products />
      {/* <section className="min-h-screen bg-white py-20"></section> */}
      {/* Footer */}
      <Footer />
    </div>
  );
}
