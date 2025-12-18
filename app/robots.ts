import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/admin/"], // Disallow internal API and admin routes
        },
        sitemap: "https://sweets-villa.vercel.app/sitemap.xml",
    };
}
