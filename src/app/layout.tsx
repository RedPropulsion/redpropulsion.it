import "./globals.css";
import Footer from "@/components/Footer";

import FooterContent from "@/content/footer.json";
import Navbar from "@/components/Navbar";

import StarsBackground from "@/components/StarsBackground";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://redpropulsion.it"),
  title: {
    template: "%s | Red Propulsion",
    default: "Red Propulsion | Race to Space",
  },
  description: "Associazione studentesca dell'Università degli Studi di Firenze dedita alla progettazione e realizzazione di razzi sonda.",
  applicationName: "Red Propulsion",
  authors: [{ name: "Red Propulsion Team" }],
  keywords: ["Red Propulsion", "Rocketry", "Firenze", "Student Team", "Ingegneria aerospaziale"],
  alternates: {
    canonical: "https://redpropulsion.it",
  },
  other: {
    google: "nositelinks",
    googlebot: "nositelinks",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="relative min-h-screen">
        <StarsBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          {children}
          <Footer {...FooterContent} />
        </div>
      </body>
    </html>
  );
}
