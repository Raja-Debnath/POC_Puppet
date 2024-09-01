import puppeteer from "puppeteer";
import fs from "fs/promises"; // Import fs module for writing to a file

async function fetchPrices(urls) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const results = []; // Array to store results

  const page = await browser.newPage();

  for (const url of urls) {
    try {
      // Navigate to the URL
      await page.goto(url, { waitUntil: 'domcontentloaded' });

      const priceText = await page.evaluate(() => {
        const priceElement = document.querySelector(
          ".Label-sc-15v1nk5-0.PackSizeSelector___StyledLabel5-sc-l9rhbt-5.gJxZPQ.bvikaK"
        );
        return priceElement ? priceElement.innerText : "not fetching";
      });

      console.log(`Price for ${url}: ${priceText}`);
      results.push({ url, price: priceText }); // Store the result in the array

    } catch (error) {
      console.error(`Error fetching price for ${url}: ${error.message}`);
      results.push({ url, price: "error fetching" });
    }
  }

  await browser.close();

  // Write results to a file
  await fs.writeFile("Bigbasket_prices.json", JSON.stringify(results, null, 2));
  console.log("Prices saved to prices.json");
}

// Define your array of URLs
const urls = [
  "https://www.bigbasket.com/pd/30003538/tabasco-red-pepper-sauce-150-ml-bottle/?nc=cl-prod-list&t_pos_sec=1&t_pos_item=1&t_s=Red+Pepper+Sauce",
  "https://www.bigbasket.com/pd/1213944/tang-instant-drink-mix-orange-2x750-g-pouch/?nc=cl-prod-list&t_pos_sec=1&t_pos_item=1&t_s=Instant+Drink+Mix+-+Orange",
  "https://www.bigbasket.com/pd/40258165/snickers-peanut-miniature-chocolate-nutritious-with-cocoa-butter-180-g-pouch/?nc=cl-prod-list&t_pos_sec=1&t_pos_item=1&t_s=Miniatures%252C+With+Peanuts%252C+Nougat+%2526+Caramel%252C+15+Mini+Chocolates",
  "https://www.bigbasket.com/pd/1200127/coca-cola-coke-zero-soft-drink-no-sugar-6x300-ml-can/?nc=cl-prod-list&t_pos_sec=1&t_pos_item=1&t_s=Zero+Sugar+Coke+-+No+Calories%252C+Refreshing%252C+Soft+Drink",
  "https://www.bigbasket.com/pd/1211883/peppy-tomato-discs-3x70-g/?nc=cl-prod-list&t_pos_sec=1&t_pos_item=1&t_s=Tomato+Discs",
  "https://www.bigbasket.com/pd/1214152/mother-dairy-pure-cow-ghee-2-x-1-l-pouch/?nc=cl-prod-list&t_pos_sec=1&t_pos_item=1&t_s=Pure+Cow+Ghee"


];

fetchPrices(urls);
