import puppeteer from "puppeteer";
 function bigbasket(){

const targetUrl =
  "https://www.bigbasket.com/pd/40050537/amul-amul-cow-ghee-1-l-1-l-pouch/?nc=cl-prod-list&t_pos_sec=1&t_pos_item=13&t_s=Ghee%252FTuppa";

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
      "Label-sc-15v1nk5-0 PackSizeSelector___StyledLabel5-sc-l9rhbt-5 gJxZPQ bvikaK"
    )[0];
    return priceElement ? priceElement.innerText : "not fetching";
  });

  console.log(priceText);

  await browser.close();
})();
}
export default bigbasket