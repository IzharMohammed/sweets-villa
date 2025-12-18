export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Sri Mahalakshmi Sweets",
    image: "https://sweets-villa.vercel.app/og-image.jpg",
    description:
      "Handcrafted with premium ingredients and time-honored recipes since 1995.",
    url: "https://sweets-villa.vercel.app",
    telephone: "+91-1234567890", // Placeholder
    address: {
      "@type": "PostalAddress",
      streetAddress: "ArundelPet Main Road",
      addressLocality: "Guntur", // Assumed based on screenshot/common locations for this brand
      addressRegion: "AP",
      postalCode: "522002",
      addressCountry: "IN",
    },
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
