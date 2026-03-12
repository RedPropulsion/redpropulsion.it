import Contacts from "@/components/Contacts";

export function generateMetadata() {
    return {
        title: "Contacts",
        description: "Contatti e informazioni sul team Red Propulsion",
    };
}

export default function Page() {
    return (
        <Contacts />
    );
}
