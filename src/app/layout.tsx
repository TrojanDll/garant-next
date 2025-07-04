import type { Metadata } from "next";

import { Toaster } from "react-hot-toast";

import { SITE_NAME } from "@/constants/seo.constants";

import Header from "@/components/widgets/Header/Header";
import Footer from "@/components/widgets/Footer/Footer";

import "./globals.scss";

import Head from "next/head";
import { Providers } from "./providers";
import Shadow from "@/components/ui/Shadow/Shadow";
import YandexMetrika from "@/utils/YandexMetrika";
import TrackPageView from "@/utils/TrackPageView";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Полис ОСАГО в Абхазии",
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
      </Head>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
          <Toaster />
          <Shadow />
        </Providers>

        <YandexMetrika
          ymid={Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID)}
        />
        <TrackPageView
          ymId={Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID)}
        />
      </body>
    </html>
  );
}
