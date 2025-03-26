const puppeteer = require('puppeteer');

const getDollarPrice = async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto("https://dolarhoy.com/", { waitUntil: "domcontentloaded", timeout: 60000 });

    const rates = await page.evaluate(() => {
      // Dólar Blue
      const dolarBlue = document.querySelectorAll(".tile.is-child .val");
      const dolarBlueCompra = dolarBlue[2]?.innerText.replace("$", "").trim();
      const dolarBlueVenta = dolarBlue[3]?.innerText.replace("$", "").trim();

      // Dólar Oficial
      const dolarOficialCompra = document.querySelector("#home_0 > div:nth-child(2) > section > div > div > div.tile.is-ancestor > div.tile.is-parent.is-9.cotizacion.is-vertical > div > div.tile.is-parent.is-7.is-vertical > div:nth-child(2) .compra .val")?.innerText.replace("$", "").trim();
      const dolarOficialVenta = document.querySelector("#home_0 > div:nth-child(2) > section > div > div > div.tile.is-ancestor > div.tile.is-parent.is-9.cotizacion.is-vertical > div > div.tile.is-parent.is-7.is-vertical > div:nth-child(2) .venta .val")?.innerText.replace("$", "").trim();
      
         // Dólar MEP/Bolsa
    // Dólar MEP/Bolsa
    const dolarMepCompra = document.querySelector("a[href='/cotizaciondolarbolsa'] + .values .compra .val")?.innerText.replace("$", "").trim();
    const dolarMepVenta = document.querySelector("a[href='/cotizaciondolarbolsa'] + .values .venta .val")?.innerText.replace("$", "").trim();


      // Liqui (Actualizar con el selector adecuado si lo tienes)
      const liqui = document.querySelectorAll("a[href='/cotizaciondolarcontadoconliqui'] + .values .val");
      const liquiCompra = liqui[0]?.innerText.replace("$", "").trim();
      const liquiVenta = liqui[1]?.innerText.replace("$", "").trim();

      // Tarjeta (Actualizar con el selector adecuado si lo tienes)
      const tarjeta = document.querySelectorAll("a[href='/cotizacion-dolar-tarjeta'] + .values .val");
      const tarjetaCompra = tarjeta[0]?.innerText.replace("$", "").trim();

      // Cripto (Actualizar con el selector adecuado si lo tienes)
      const cripto = document.querySelectorAll("a[href='/seccion/bitcoins'] + .values .val");
      const criptoCompra = cripto[0]?.innerText.replace("$", "").trim();
      const criptoVenta = cripto[1]?.innerText.replace("$", "").trim();

      //console.log('Dólar Blue:', dolarBlueCompra, dolarBlueVenta);
      //console.log('Dólar Oficial:', dolarOficialCompra, dolarOficialVenta);
      //console.log('Dólar Mep:', dolarMepCompra, dolarMepVenta);
      //console.log('Dólar Liqui:', liquiCompra, liquiVenta);
      //console.log('Dólar Tarjeta:', tarjetaCompra);
      //console.log('Dólar Cripto:', criptoCompra,  criptoVenta);

      return {
        dolarBlue: { compra: dolarBlueCompra, venta: dolarBlueVenta },
        dolarOficial: { compra: dolarOficialCompra, venta: dolarOficialVenta },
        dolarMep: { compra: dolarMepCompra, venta: dolarMepVenta },
        liqui: { compra: liquiCompra, venta: liquiVenta },
        tarjeta: { compra: tarjetaCompra },
        cripto: { compra: criptoCompra, venta: criptoVenta }
      };
    });

    console.log('Rates:', rates); // Log para verificar la estructura del objeto rates
    await browser.close();
    res.json(rates);
  } catch (error) {
    console.error("Error en el scraping:", error);
    res.status(500).json({ error: "No se pudo obtener el valor del dólar" });
  }
};
module.exports = { getDollarPrice }; // Asegúrate de exportar la función correctamente
