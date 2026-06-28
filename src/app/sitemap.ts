import type { MetadataRoute } from "next";
import { execSync } from "node:child_process";

import { articles } from "@/data/articles";

const BASE_URL = "https://garant-abh.com";

type TStaticRoute = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const staticRoutes: TStaticRoute[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/osago", changeFrequency: "daily", priority: 0.9 },
  { path: "/ns", changeFrequency: "daily", priority: 0.9 },
  { path: "/osago/apply", changeFrequency: "weekly", priority: 0.9 },
  { path: "/ns/apply", changeFrequency: "weekly", priority: 0.9 },
  { path: "/contacts", changeFrequency: "monthly", priority: 0.7 },
  { path: "/support", changeFrequency: "monthly", priority: 0.7 },
  { path: "/documents", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about", changeFrequency: "monthly", priority: 0.5 },
  { path: "/legal", changeFrequency: "yearly", priority: 0.4 },
  { path: "/policy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
];

// Дата последнего изменения берётся из git-истории файла страницы.
// Если git недоступен (нет .git, нет CLI) — фолбэк на текущую дату сборки.
function getLastModified(routePath: string): Date {
  const file =
    routePath === "/" ? "src/app/page.tsx" : `src/app${routePath}/page.tsx`;

  try {
    const out = execSync(`git log -1 --format=%cI -- "${file}"`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();

    return out ? new Date(out) : new Date();
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: route.path === "/" ? BASE_URL : `${BASE_URL}${route.path}`,
    lastModified: getLastModified(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.datePublished),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
