import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Team",
    description: "Scopri il team multidisciplinare di Red Propulsion: appassionati, ingegneri e studenti uniti dalla passione per l'aerospazio.",
};

export default function TeamLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
