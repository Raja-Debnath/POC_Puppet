import puppeteer from 'puppeteer';
import fs from 'fs';

const targetUrls = [
  "https://www.zeptonow.com/pn/nivea-men-deodorant-fresh-active-48h-long-lasting-freshness/pvid/697daa0d-7817-4968-89af-dc122d95f422",
  "https://www.zeptonow.com/pn/tang-orange-instant-drink-mix/pvid/b9b8c8d4-a76c-4ad7-8fd6-e3e4a091f1db",
  "https://www.zeptonow.com/pn/snickers-peanut-filled-chocolate-bar-loaded-with-delicious-roasted-peanuts/pvid/2ddd77e0-a7af-4c11-b01f-a96d18f15e0f",
  "https://www.zeptonow.com/pn/coca-cola-soft-drink-can/pvid/e630c9c4-a67f-4349-a884-0a17553450ab",
  "https://www.zeptonow.com/pn/peppy-tomato-disc/pvid/2006741c-ad7c-458c-95c1-6e7a6d231f18",
  // Add more URLs here
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
        const priceElement = document.getElementsByClassName(
          "font-norms block typography_h4__XDrlA mr-1.5 sm:mr-2.5 sm:!text-[1.5rem]"
        )[0];
        return priceElement ? priceElement.innerText : "not fetching";
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
  fs.writeFile('zepto_prices.json', JSON.stringify(results, null, 2), (err) => {
    if (err) {
      console.error('Error writing to JSON file:', err);
    } else {
      console.log('Results have been written to prices.json');
    }
  });
})();
