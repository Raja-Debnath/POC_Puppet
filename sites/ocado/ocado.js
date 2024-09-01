

// import puppeteer from "puppeteer";


// // function ocado() {

// const targetUrl ="https://www.ocado.com/products/warburtons-crumpets-27524011";
// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//     defaultViewport: false,
//   });
//   const page = await browser.newPage();

  
//   await page.goto(targetUrl);
//   await page.reload()

//   const priceText = await page.evaluate(() => {
//     const priceElement = document.getElementsByClassName("bop-price__current bop-price__current--offer")[0].innerText
//     return priceElement //? priceElement.innerText : "not fetching";
//   });

//   console.log(priceText);

//   await browser.close();
// })();

// }
// ocado()


import puppeteer from 'puppeteer';
import fs from 'fs';


const targetUrls = [
  "https://www.ocado.com/products/nivea-men-cool-kick-anti-perspirant-deodorant-spray-48292011",
  "https://www.ocado.com/products/tabasco-original-red-pepper-hot-sauce-14005011",
  "https://www.ocado.com/products/snickers-fruit-nut-milk-chocolate-snack-bars-multipack-582069011",
  "https://www.ocado.com/products/coca-cola-zero-sugar-395244011"
];
(async () => {
  const browser = await puppeteer.launch({
    headless: false, // Set to true if you don't need a visible browser
    defaultViewport: null,
  });

  const page = await browser.newPage();

  const results = [];

  for (const url of targetUrls) {
    try {
      await page.goto(url);

      const priceText = await page.evaluate(() => {
        const priceElement = document.getElementsByClassName("bop-price__current ")[0].innerText;
        return priceElement //? priceElement.innerText : "not fetching";
      });

      console.log(`Price for ${url}: ${priceText}`);

      results.push({
        url,
        price: priceText
      });

    } catch (error) {
      console.error(`Error fetching data for ${url}:`, error.message);
      results.push({
        url,
        price: null
      });
    }
  }

  await browser.close();

  // Write results to JSON file
  fs.writeFile('ocado_prices.json', JSON.stringify(results, null, 2), (err) => {
    if (err) {
      console.error('Error writing to JSON file:', err);
    } else {
      console.log('Results have been written to prices.json');
    }
  });
})();
