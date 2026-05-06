import type { Metadata } from "next";

import { Toaster } from "react-hot-toast";

import Header from "@/components/widgets/Header/Header";
import Footer from "@/components/widgets/Footer/Footer";

import "./globals.scss";

import { Providers } from "./providers";
import Shadow from "@/components/ui/Shadow/Shadow";
import YandexMetrika from "@/utils/YandexMetrika";
import TrackPageView from "@/utils/TrackPageView";
import GoogleAnalytics from "@/utils/GoogleAnalytics";
import TrackGAView from "@/utils/TrackGAView";

export const metadata: Metadata = {
  title: {
    absolute: "Страховка в Абхазии – ОСАГО и автострахование онлайн",
  },
  description:
    "Оформить ОСАГО в Абхазии онлайн за пару минут. Страхование авто в Абхазии для граждан РФ в 2025.",
  openGraph: {
    siteName: "Гарант-Страхование",
    description: "Страхование в Абхазии онлайн. Быстро, надёжно, официально."
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="preload"
          href="/fonts/Geometria-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Geometria-Bold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
          <Toaster />
          <Shadow />
        </Providers>

        <YandexMetrika ymid={103203587} />
        <TrackPageView ymId={103203587} />
        <GoogleAnalytics gaId="G-J81PQX1RCJ" />
        <TrackGAView gaId="G-J81PQX1RCJ" />

        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="5ec4de52-61e0-446a-beba-15042b428ad4"
        ></script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Гарант-Страхование",
              url: "https://garant-abh.com",
            }),
          }}
        />
      </body>
    </html>
  );
}
