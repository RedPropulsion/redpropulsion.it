import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://redpropulsion.it",
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: "https://redpropulsion.it/projects",
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: "https://redpropulsion.it/faq",
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: "https://redpropulsion.it/contacts",
            changeFrequency: "yearly",
            priority: 0.6,
        },
        { url: "https://redpropulsion.it/partners", changeFrequency: "monthly", priority: 0.7 },
    ];
}
