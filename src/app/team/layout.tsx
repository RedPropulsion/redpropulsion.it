import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Progetti",
    description: "Scopri i progetti aperti di Red Propulsion.",
    alternates: { canonical: "/projects" },
    robots: { index: false, follow: true },
};

export default function TeamLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
