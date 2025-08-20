const fs = require("fs");
const path = require("path");

// Текущее время в формате ISO с UTC
const now = new Date().toISOString();

const sitemapPath = path.join(__dirname, "..", "..", "public", "sitemap.xml"); // если sitemap лежит в /public
let sitemap = fs.readFileSync(sitemapPath, "utf8");

// Регулярка: заменяем все <lastmod>...</lastmod>
sitemap = sitemap.replace(
  /<lastmod>.*?<\/lastmod>/g,
  `<lastmod>${now}</lastmod>`
);

fs.writeFileSync(sitemapPath, sitemap, "utf8");

console.log(`✅ sitemap.xml обновлён, lastmod = ${now}`);
