import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SalesAssistant } from "@/components/SalesAssistant";
import { CartProvider } from "@/lib/CartContext";
import { CartDrawer } from "@/components/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OHDIOSA | Alta Costura y Lujo",
  description: "Exclusividad, diseño asimétrico y alta costura. E-Commerce premium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased font-sans bg-background text-foreground min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <SalesAssistant />
        </CartProvider>
      </body>
    </html>
  );
}
