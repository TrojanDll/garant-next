const fs = require("fs");
const path = require("path");

// Текущее время в формате ISO с UTC
const now = new Date().toISOString();

const publicSitemapPath = path.join(__dirname, "..", "..", "public", "sitemap.xml");
const templateSitemapPath = path.join(__dirname, "sitemap.xml"); // шаблон рядом со скриптом

let sitemap = "";

// Проверяем, существует ли файл в public
if (!fs.existsSync(publicSitemapPath)) {
  console.log("⚠ sitemap.xml в public не найден, используем шаблон...");

  if (!fs.existsSync(templateSitemapPath)) {
    console.error("❌ Шаблон sitemap.xml рядом со скриптом не найден!");
    process.exit(1);
  }

  // Копируем шаблон
  sitemap = fs.readFileSync(templateSitemapPath, "utf8");
  fs.mkdirSync(path.dirname(publicSitemapPath), { recursive: true });
  fs.writeFileSync(publicSitemapPath, sitemap, "utf8");
  console.log(`✅ sitemap.xml создан в public из шаблона`);
} else {
  sitemap = fs.readFileSync(publicSitemapPath, "utf8");
}

// Обновляем все <lastmod>
sitemap = sitemap.replace(
  /<lastmod>.*?<\/lastmod>/g,
  `<lastmod>${now}</lastmod>`
);

fs.writeFileSync(publicSitemapPath, sitemap, "utf8");
console.log(`✅ sitemap.xml обновлён, lastmod = ${now}`);
