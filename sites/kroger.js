

import puppeteer from "puppeteer";


// function kroger() {

const targetUrl ="https://www.kroger.com/p/doritos-nacho-cheese-flavored-tortilla-chips/0002840051646?fulfillment=PICKUP";
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();

  
  await page.goto(targetUrl);
  await page.reload()

  const priceText = await page.evaluate(() => {
    const priceElement = document.getElementsByClassName("kds-Price kds-Price--alternate mb-8")[0].innerText
    return priceElement //? priceElement.innerText : "not fetching";
  });

  console.log(priceText);

  await browser.close();
})();

// }
// kroger()

// dev note blinkit after opening in new browser 
// continoue to web pops and code breaks 