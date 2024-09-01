

// import puppeteer from "puppeteer";


// // function kroger() {

// const targetUrl ="https://www.kroger.com/p/doritos-nacho-cheese-flavored-tortilla-chips/0002840051646?fulfillment=PICKUP";
// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//     defaultViewport: false,
//   });
//   const page = await browser.newPage();

  
//   await page.goto(targetUrl);
//   await page.reload()

//   const priceText = await page.evaluate(() => {
//     const priceElement = document.getElementsByClassName("kds-Price kds-Price--alternate mb-8")[0].innerText
//     return priceElement //? priceElement.innerText : "not fetching";
//   });

//   console.log(priceText);

//   await browser.close();
// })();

// // }
// // kroger()




import puppeteer from 'puppeteer';
import fs from 'fs';

const targetUrls = [
  "https://www.kroger.com/p/tabasco-original-red-pepper-sauce/0001121000001?searchType=default_search",
  "https://www.kroger.com/p/snickers-fun-size-chocolate-bars-jumbo-candy-bag/0004000056612?searchType=default_search",
  "https://www.kroger.com/p/coca-cola-zero-sugar-soda-fridge-cans/0004900004255?searchType=default_search"
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
        const priceElement = document.getElementsByClassName("flex flex-col w-full")[0].innerText;
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
  fs.writeFile('kroger_prices.json', JSON.stringify(results, null, 2), (err) => {
    if (err) {
      console.error('Error writing to JSON file:', err);
    } else {
      console.log('Results have been written to prices.json');
    }
  });
})();
