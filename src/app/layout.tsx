import "./globals.css";
import FontPreloads from "@/components/FontPreloads";
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
  twitter: { card: "summary_large_image" },
  authors: [{ name: "Red Propulsion Team" }],
  keywords: ["Red Propulsion", "Rocketry", "Firenze", "Student Team", "Ingegneria aerospaziale"],
  other: {
    google: "nositelinks",
    googlebot: "nositelinks",
  },
  verification: {
    google: "CLAJEOYvkVy0XrWfJTuhPJnHiHVxT9VJdhv93Ggw4p4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" data-scroll-behavior="smooth">
      <body className="relative min-h-screen">
        <FontPreloads />
        <StarsBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <div id="site-content" className="flex flex-col flex-1">
            {children}
            <Footer {...FooterContent} />
          </div>
        </div>
      </body>
    </html>
  );
}
