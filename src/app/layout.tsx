import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Diamond Street Collective",
  description: "A curated archive of the imagined and the forgotten, preserving the artifacts of a history that never was. Est. 1809 (allegedly).",
  keywords: ["archive", "fiction", "art", "history", "collecting", "aristocracy"],
  authors: [{ name: "Diamond Street Collective" }],
  openGraph: {
    title: "Diamond Street Collective",
    description: "A curated archive of the imagined and the forgotten",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-parchment-50 text-charcoal-900">
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
        {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
