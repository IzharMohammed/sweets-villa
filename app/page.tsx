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

      {/* SEO Content - Server Rendered (About Us) */}
      <section className="bg-amber-50/50 py-16 px-6 border-t border-amber-100">
        <div className="container mx-auto max-w-4xl prose prose-slate prose-headings:font-serif prose-headings:text-amber-900 prose-p:text-slate-600">
          <h1 className="text-3xl md:text-4xl text-center mb-8 not-prose font-serif text-amber-900">
            Sri Mahalakshmi Sweets - Authentic Indian Sweets & Gifting
          </h1>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="lead text-lg text-amber-800/80 italic">
                "Curators of Authentic Tradition since 1995"
              </p>
              <p>
                Welcome to <strong>Sri Mahalakshmi Sweets</strong>, your premier
                destination for authentic, handcrafted Indian sweets. Located in
                the heart of <strong>Guntur, Andhra Pradesh</strong>, we
                specialize in traditional recipes passed down through
                generations. Our commitment to quality ensures that every bite
                is a celebration of flavor and tradition.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100/50">
              <h2 className="text-xl font-serif text-amber-800 mt-0">
                Premium Quality Ingredients
              </h2>
              <p className="text-sm mb-4">
                We use only the finest ingredients, including <em>pure ghee</em>
                , premium nuts, and fresh milk, to create our signature sweets.
                From classic Laddoos and Mysore Pak to innovative dry fruit
                creations, our collection is curated to delight your senses.
              </p>

              <h2 className="text-xl font-serif text-amber-800 mt-0">
                Perfect for Every Occasion
              </h2>
              <p className="text-sm mb-0">
                Whether you are looking for a festive treat, a wedding gift box,
                or a simple indulgence, Sri Mahalakshmi Sweets offers a wide
                range of options. Explore our collection and experience the
                taste of authentic tradition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
