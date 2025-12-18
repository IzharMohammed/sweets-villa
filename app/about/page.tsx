import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Sri Mahalakshmi Sweets",
  description:
    "Learn about our heritage, our commitment to quality, and the tradition behind Sri Mahalakshmi Sweets. Serving authentic Indian sweets since 1995.",
  openGraph: {
    title: "About Us | Sri Mahalakshmi Sweets",
    description:
      "Discover the story of Sri Mahalakshmi Sweets. Authentic flavors, premium ingredients, and a legacy of tradition since 1995.",
    images: ["/og-image.jpg"],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-amber-50/30">
      {/* Hero Section */}
      <section className="relative bg-amber-900 text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-grid-lg"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl text-amber-100 font-light max-w-2xl mx-auto">
            Preserving the art of traditional Indian sweet making for over three
            decades.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl prose prose-lg prose-headings:font-serif prose-headings:text-amber-900 prose-p:text-slate-700">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-amber-100 mb-12">
            <h2 className="text-3xl font-serif text-amber-800 mt-0 mb-6">
              A Legacy of Sweetness
            </h2>
            <p>
              Welcome to <strong>Sri Mahalakshmi Sweets</strong>. Since our
              inception in <strong>1995</strong> in the heart of Guntur, Andhra
              Pradesh, we have been dedicated to a single mission: to deliver
              the most authentic and delicious Indian sweets to our customers.
            </p>
            <p>
              What started as a humble family-run kitchen has grown into a
              beloved brand, cherished for its unwavering commitment to quality
              and taste. We believe that sweets are not just food; they are an
              integral part of our culture, our celebrations, and our memories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100">
              <h3 className="text-xl font-serif text-amber-800 mt-0">
                Our Philosophy
              </h3>
              <p className="text-sm">
                We believe in the purity of ingredients. We use only pure ghee,
                fresh milk, and premium nuts. No preservatives, no artificial
                flavors—just the honest taste of tradition.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100">
              <h3 className="text-xl font-serif text-amber-800 mt-0">
                Our Craft
              </h3>
              <p className="text-sm">
                Every sweet is handcrafted by master artisans who have honed
                their skills over decades. From the perfect texture of a Mysore
                Pak to the delicate layers of a Kaju Katli, perfection is our
                standard.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-serif text-amber-800">Visit Us</h2>
            <p>
              Experience the magic in person. Visit our store in Guntur or order
              online to have a box of happiness delivered to your doorstep.
            </p>
            <p className="font-bold text-amber-900">
              Sri Mahalakshmi Sweets
              <br />
              ArundelPet Main Road, Guntur
              <br />
              Andhra Pradesh, 522002
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
