import type { Metadata } from "next";
import "./globals.scss";
import { SITE_NAME } from "@/constants/seo.constants";
import Header from "@/components/widgets/Header";

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
        <Header/>
        {children}</body>
    </html>
  );
}
