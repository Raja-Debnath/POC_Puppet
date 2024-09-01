import puppeteer from "puppeteer";


// function blinkit() {

const targetUrl ="https://blinkit.com/prn/amul-taaza-toned-fresh-milk/prid/19512";
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();

  
  await page.goto(targetUrl);
  await page.reload()

  const priceText = await page.evaluate(() => {
    const priceElement = document.getElementsByClassName("tw-text-300 tw-font-extrabold")[0].innerText
    return priceElement //? priceElement.innerText : "not fetching";
  });

  console.log(priceText);

  // await browser.close();
})();

// }
// blinkit()

// dev note blinkit after opening in new browser 
// continoue to web pops and code breaks 