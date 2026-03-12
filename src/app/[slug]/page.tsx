import Block, { validateBlockContent } from "@/components/Block";
import UnderConstruction from "@/components/UnderConstruction";
import { notFound } from "next/navigation";

import contactsContent from "@/content/contacts_page.json";
import departmentsContent from "@/content/departments_page.json";
import projectsContent from "@/content/projects_page.json";
import sponsorsContent from "@/content/sponsors_page.json";

const pages: Record<string, typeof contactsContent> = {
    contacts: contactsContent,
    departments: departmentsContent,
    projects: projectsContent,
    sponsors: sponsorsContent,
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
                validateBlockContent(section);
                return <Block content={section} key={i} />;
            })}
        </>
    );
}
