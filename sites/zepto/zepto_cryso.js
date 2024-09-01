import axios from 'axios';
import * as cheerio from 'cheerio';

(async () => {
  const targetUrls = [
    "https://www.zeptonow.com/pn/nivea-men-deodorant-fresh-active-48h-long-lasting-freshness/pvid/697daa0d-7817-4968-89af-dc122d95f422",
    "https://www.zeptonow.com/pn/tang-orange-instant-drink-mix/pvid/b9b8c8d4-a76c-4ad7-8fd6-e3e4a091f1db",
    "https://www.zeptonow.com/pn/snickers-peanut-filled-chocolate-bar-loaded-with-delicious-roasted-peanuts/pvid/2ddd77e0-a7af-4c11-b01f-a96d18f15e0f",
    "https://www.zeptonow.com/pn/coca-cola-soft-drink-can/pvid/e630c9c4-a67f-4349-a884-0a17553450ab",
    "https://www.zeptonow.com/pn/peppy-tomato-disc/pvid/2006741c-ad7c-458c-95c1-6e7a6d231f18",
  ];

  const results = [];

  for (const url of targetUrls) {
    try {
      console.log(`Fetching data for URL: ${url}`); // Debugging log

      const response = await axios.get(url);
      console.log(`Response received for URL: ${url}`); // Debugging log

      const $ = cheerio.load(response.data);

			const priceText = $(".font-norms.block.typography_h4__XDrlA.mr-1.5.sm mr-2.5.sm !text-[1.5rem]").first().text() || "not fetching";

      console.log(`Price extracted for ${url}: ${priceText}`); // Debugging log

      results.push({ url, price: priceText });
    } catch (error) {
      console.error(`Error fetching data for ${url}:`, error.message);
      results.push({ url, price: null });
    }
  }

  console.log('Results:', results); // Debugging log

  // Return the result if needed, or just log it.
})();
