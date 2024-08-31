import puppeteer from "puppeteer";
//  function zepto(){

const targetUrl =
  "https://www.zeptonow.com/pn/cadbury-celebrations-assorted-chocolate-rakhi-gift-pack/pvid/90c33466-de17-436d-b6a0-7d67e025cc63";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();

  // Navigate the page to a URL.
  await page.goto(targetUrl);

  const priceText = await page.evaluate(() => {
    const priceElement = document.getElementsByClassName(
      "font-norms block typography_h4__XDrlA   mr-1.5 sm:mr-2.5 sm:!text-[1.5rem]"
    )[0];
    return priceElement ? priceElement.innerText : "not fetching";
  });

  console.log(priceText);

  await browser.close();
})();
// }
// export default zepto