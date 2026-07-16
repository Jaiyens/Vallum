import type { Metadata, Viewport } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { MotionProvider } from "@/components/providers/motion-provider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollRefresh } from "@/components/scroll-refresh";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// The page is a light page with a dark opening (LOOK.md): browser chrome
// says bone and light, not ink and dark, even though beat 1 opens on film.
export const viewport: Viewport = {
  themeColor: "#F2EEE5",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Vallum Labs: physical AI data for the outdoor economy",
  description:
    "Vallum Labs records the people who still do dangerous outdoor work and turns that footage into physical AI training data for robotics labs.",
  openGraph: {
    title: "Vallum Labs: physical AI data for the outdoor economy",
    description:
      "Vallum Labs records the people who still do dangerous outdoor work and turns that footage into physical AI training data for robotics labs.",
    images: [{ url: "/hero/hero-poster.jpg", width: 1280, height: 720 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* Motion SSR-renders entrance targets with inline opacity:0; without JS
            they would never reveal, so unhide them when scripts are off. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"],[style*="translateY"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {/* Minimal cross-page affordance (F-0504): the wordmark links home,
            a quiet second link reaches /dataset. Sits in normal flow on the
            bone body background, ahead of the hero, so it never needs to
            fight film or forest for contrast and stays keyboard-reachable
            as the page's first tab stop. No nav bar chrome: no border, no
            shadow, no background box beyond the page's own bone. */}
        <header className="bg-bone">
          <nav
            aria-label="Primary"
            className="mx-auto flex max-w-site items-center justify-between px-6 py-2 md:px-16"
          >
            <Link
              href="/"
              className="text-[14px] font-medium text-forest-line underline decoration-1 underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-line"
            >
              Vallum Labs
            </Link>
            <Link
              href="/dataset"
              className="text-[14px] font-medium text-forest-line underline decoration-1 underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-line"
            >
              Dataset
            </Link>
          </nav>
        </header>
        <MotionProvider>{children}</MotionProvider>
        <SmoothScroll />
        <ScrollRefresh />
      </body>
    </html>
  );
}
