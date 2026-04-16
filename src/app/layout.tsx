import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://sparq.org.uk"
  ),
  title: {
    default: "SPARQ — Severn Paediatric Audit, Research & Quality Improvement",
    template: "%s | SPARQ",
  },
  description:
    "A network of academic medical and allied health professionals promoting collaboration to improve the care of children and young people in the Severn region.",
  icons: {
    icon: "/sparq-logo.png",
    apple: "/sparq-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "SPARQ",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
