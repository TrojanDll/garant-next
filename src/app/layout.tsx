import type { Metadata } from "next";

import { SITE_NAME } from "@/constants/seo.constants";

import Header from "@/components/widgets/Header/Header";
import Footer from "@/components/widgets/Footer/Footer";

import "./globals.scss";

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
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
