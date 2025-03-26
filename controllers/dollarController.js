const puppeteer = require("puppeteer");

const getDollarPrice = async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto("https://dolarhoy.com/", { waitUntil: "domcontentloaded" });

    const dolarBlue = await page.evaluate(() => {
      const valores = document.querySelectorAll(".tile.is-child .val");
      return {
        compra: valores[2]?.innerText.replace("$", "").trim(),
        venta: valores[3]?.innerText.replace("$", "").trim(),
      };
    });

    await browser.close();
    res.json({ dolarBlue });
  } catch (error) {
    console.error("Error en el scraping:", error);
    res.status(500).json({ error: "No se pudo obtener el valor del dólar" });
  }
};

module.exports = { getDollarPrice };