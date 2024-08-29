import puppeteer from "puppeteer";

function modernBazaar(){

const targetUrl ="https://www.modernbazaar.online/product/nestle-kitkat-rich-chocolate-coated-wafer-50g-28802";
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();

  // Navigate the page to a URL.
  await page.goto(targetUrl);
  await page.reload()

  const priceText = await page.evaluate(() => {
    const priceElement = document.getElementsByClassName("rupee")[0].innerText
    return priceElement //? priceElement.innerText : "not fetching";
  });

  console.log(priceText);

  await browser.close();
})();
}
export default modernBazaar