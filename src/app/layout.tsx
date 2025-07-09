import "./globals.css";
import Footer from "@/components/Footer";

import FooterContent from "@/content/footer.json";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Navbar />
        {children}
        <Footer {...FooterContent} />
      </body>
    </html>
  );
}
