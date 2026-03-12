import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const today = new Date().toISOString();
    return [
        {
            url: "https://redpropulsion.it",
            lastModified: today,
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: "https://redpropulsion.it/team",
            lastModified: today,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: "https://redpropulsion.it/faq",
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: "https://redpropulsion.it/contacts",
            lastModified: today,
            changeFrequency: "yearly",
            priority: 0.6,
        },
    ];
}
