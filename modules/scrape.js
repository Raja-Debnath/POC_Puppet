

import puppeteer from "puppeteer";

async function scrape(url, priceTag, nameTag) {
  const targetUrl = url;
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();

  // Navigate the page to a URL.
  await page.goto(targetUrl);
  await page.reload();

  const priceText = await page.evaluate((priceTag) => {
    const priceElement = document.getElementsByClassName(priceTag)[0];
    return priceElement ? priceElement.innerText : "not fetching";
  }, priceTag);

  const nameText = await page.evaluate((nameTag) => {
    const nameElement = document.getElementsByClassName(nameTag)[0];
    return nameElement ? nameElement.innerText : "not fetching";
  }, nameTag);

  await browser.close();

  console.log(`product name : ${nameText}\n product price : ${priceText}`);
}

// testing 
scrape(
  "https://www.modernbazaar.online/product/nestle-kitkat-rich-chocolate-coated-wafer-50g-28802",
  "rupee",
  "product_name" 
);

// export default scrape