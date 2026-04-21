import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articles } from "@/data/articles";
import Article from "@/components/widgets/Article/Article";

const SITE_URL = "https://garant-abh.com";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return {};

  const url = `${SITE_URL}/blog/${article.slug}`;
  const imageUrl = `${SITE_URL}${article.image}`;

  return {
    title: `${article.title} – Гарант Страхование`,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: article.title }],
      publishedTime: article.datePublished,
      siteName: "Гарант Страхование",
      locale: "ru_RU",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [imageUrl],
    },
  };
}

export default function ArticlePage({ params }: Props) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const url = `${SITE_URL}/blog/${article.slug}`;
  const imageUrl = `${SITE_URL}${article.image}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: imageUrl,
    datePublished: article.datePublished,
    url,
    publisher: {
      "@type": "Organization",
      name: "Гарант Страхование",
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Article article={article} />
    </>
  );
}
