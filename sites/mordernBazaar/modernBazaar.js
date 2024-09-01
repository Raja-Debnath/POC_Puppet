// import puppeteer from "puppeteer";

// function modernBazaar(){

// const targetUrl ="https://www.modernbazaar.online/product/nestle-kitkat-rich-chocolate-coated-wafer-50g-28802";
// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//     defaultViewport: false,
//   });
//   const page = await browser.newPage();

//   // Navigate the page to a URL.
//   await page.goto(targetUrl);
//   await page.reload()

//   const priceText = await page.evaluate(() => {
//     const priceElement = document.getElementsByClassName("rupee")[0].innerText
//     return priceElement //? priceElement.innerText : "not fetching";
//   });

//   console.log(priceText);

//   await browser.close();
// })();
// }
// export default modernBazaar

import puppeteer from 'puppeteer';
import fs from 'fs';

const targetUrls = [
  "https://www.modernbazaar.online/product/tabasco-red-pepper-sauce-60ml-9222/?cat=&subcat=",
  "https://www.modernbazaar.online/product/snickers-miniatures-10units-8925/?cat=&subcat=",
  "https://www.modernbazaar.online/product/peppy-tomato-discs-421/?cat=&subcat=",
   "https://www.modernbazaar.online/product/coca-cola-zero-sugar-no-calories-can-330ml-10368/?cat=&subcat=",
   "https://www.modernbazaar.online/product/tang-orange-flavour-pouch-375g-13233/?cat=&subcat="
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
      await page.goto(url, { waitUntil: 'networkidle2' });

      const priceText = await page.evaluate(() => {
        const priceElement = document.getElementsByClassName("rupee")[0].innerText;
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
  fs.writeFile('mordernBazaar_prices.json', JSON.stringify(results, null, 2), (err) => {
    if (err) {
      console.error('Error writing to JSON file:', err);
    } else {
      console.log('Results have been written to prices.json');
    }
  });
})();
