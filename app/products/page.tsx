import { Metadata } from "next";
import ProductsListingClient from "./products-listing-client";

export const metadata: Metadata = {
  title: "Our Sweets | Sri Mahalakshmi Sweets",
  description:
    "Explore our wide range of authentic Indian sweets. From Kaju Katli to Mysore Pak, order your favorites online today.",
  openGraph: {
    title: "Our Sweets | Sri Mahalakshmi Sweets",
    description:
      "Explore our wide range of authentic Indian sweets. Handcrafted with love and tradition.",
    images: ["/og-image.jpg"],
  },
};

export default function ProductsPage() {
  return <ProductsListingClient />;
}
