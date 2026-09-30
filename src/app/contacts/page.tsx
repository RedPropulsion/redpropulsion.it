import Contacts from "@/components/Contacts";
import Content from "@/content/contacts_page.json";

export function generateMetadata() {
    return {
        title: Content.title,
        description: Content.description,
        alternates: { canonical: "/contacts" },
    };
}

export default function Page() {
    return (
        <Contacts />
    );
}
