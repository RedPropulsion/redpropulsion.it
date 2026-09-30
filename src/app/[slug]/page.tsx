import Block from "@/components/Block";
import UnderConstruction from "@/components/UnderConstruction";
import { notFound } from "next/navigation";

import departmentsContent from "@/content/departments_page.json";

const pages: Record<string, typeof departmentsContent> = {
    departments: departmentsContent,
};

export function generateStaticParams() {
    return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
    params: Promise<{ slug: string }>;
}) {
    const params = await props.params;
    const slug = params.slug;
    const content = pages[slug];
    if (!content) return {};
    return {
        title: content.title,
        description: content.description,
        alternates: { canonical: `/${slug}` },
        robots: content.sections.length === 0 ? { index: false, follow: true } : undefined,
    };
}

export default async function Page(props: {
    params: Promise<{ slug: string }>;
}) {
    const params = await props.params;
    const slug = params.slug;
    const content = pages[slug];
    if (!content) return notFound();

    if (content.sections.length === 0) {
        return UnderConstruction();
    }

    return (
        <>
            <div style={{ height: "100px" }}></div>
            {content.sections.map((section, i) => {

                return <Block content={section} key={i} />;
            })}
        </>
    );
}
