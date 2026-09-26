import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import { site } from "@/lib/site";
import { organizationJsonLd } from "@/lib/seo";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { JsonLd } from "@/components/accessibility/JsonLd";
import { MotionProvider } from "@/components/accessibility/MotionProvider";
import "./globals.css";

const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `GridSync — ${site.line}`, template: "%s · GridSync" },
  description: site.description,
  applicationName: "GridSync",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "GridSync",
    title: `GridSync — ${site.line}`,
    description: site.description,
    url: site.url,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title: `GridSync — ${site.line}`, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#F3F0E8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main" tabIndex={-1} className="focus:outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
