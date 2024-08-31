

import puppeteer from "puppeteer";


// function ocado() {

const targetUrl ="https://www.ocado.com/products/warburtons-crumpets-27524011";
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();

  
  await page.goto(targetUrl);
  await page.reload()

  const priceText = await page.evaluate(() => {
    const priceElement = document.getElementsByClassName("bop-price__current bop-price__current--offer")[0].innerText
    return priceElement //? priceElement.innerText : "not fetching";
  });

  console.log(priceText);

  await browser.close();
})();

// }
// ocado()

// dev note blinkit after opening in new browser 
// continoue to web pops and code breaks 
