import type { MetadataRoute } from "next";

import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
    return {
        id: SITE_URL,
        name: SITE_TITLE,
        short_name: SITE_NAME,
        description: SITE_DESCRIPTION,
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "any",
        dir: "rtl",
        lang: "fa",
        categories: ["education", "productivity"],
        background_color: "#ffffff",
        theme_color: "#0e7490",
        icons: [
            {
                src: "/icon",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/icon",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "/apple-icon",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    }
}
