const fs = require("fs");
const path = require("path");

// Текущее время в формате ISO с UTC
const now = new Date().toISOString();

const publicSitemapPath = path.join(__dirname, "..", "..", "public", "sitemap.xml");
const templateSitemapPath = path.join(__dirname, "sitemap.xml"); // шаблон рядом со скриптом

let sitemap = "";

if (!fs.existsSync(templateSitemapPath)) {
  console.error("❌ Шаблон sitemap.xml не найден!");
  process.exit(1);
}

// Всегда берём актуальный шаблон
sitemap = fs.readFileSync(templateSitemapPath, "utf8");
fs.mkdirSync(path.dirname(publicSitemapPath), { recursive: true });

// Обновляем все <lastmod>
sitemap = sitemap.replace(
  /<lastmod>.*?<\/lastmod>/g,
  `<lastmod>${now}</lastmod>`
);

fs.writeFileSync(publicSitemapPath, sitemap, "utf8");
console.log(`✅ sitemap.xml обновлён, lastmod = ${now}`);
