import type { Metadata, Viewport } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import { MotionProvider } from "@/components/providers/motion-provider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/scroll-progress";
import { ScrollRefresh } from "@/components/scroll-refresh";
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

export const viewport: Viewport = {
  themeColor: "#0A0C0B",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "Vallum Labs: the physical internet for dangerous outdoor work",
  description:
    "Vallum collects consent-cleared, action-labeled, first-person video of real dangerous outdoor work and licenses it to robotics foundation-model labs.",
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
        <MotionProvider>{children}</MotionProvider>
        <SmoothScroll />
        <ScrollProgress />
        <ScrollRefresh />
      </body>
    </html>
  );
}
