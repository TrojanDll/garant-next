import type { Metadata } from "next";

import { Toaster } from "react-hot-toast";

import Header from "@/components/widgets/Header/Header";
import Footer from "@/components/widgets/Footer/Footer";

import "./globals.scss";

import Head from "next/head";
import { Providers } from "./providers";
import Shadow from "@/components/ui/Shadow/Shadow";
import YandexMetrika from "@/utils/YandexMetrika";
import TrackPageView from "@/utils/TrackPageView";
import GoogleAnalytics from "@/utils/GoogleAnalytics";
import TrackGAView from "@/utils/TrackGAView";

export const metadata: Metadata = {
  title: {
    // default: SITE_NAME,
    // template: `%s | ${SITE_NAME}`,
    absolute: "Страховка в Абхазии – ОСАГО и автострахование онлайн",
  },
  description:
    "Оформить ОСАГО в Абхазии онлайн за пару минут. Страхование авто в Абхазии для граждан РФ в 2025.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <Head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicon/android-chrome-512x512.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />

        <meta property="og:site_name" content="Гарант-Страхование"></meta>
        <meta
          property="og:description"
          content="Страхование в Абхазии онлайн. Быстро, надёжно, официально."
        ></meta>
      </Head>
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
