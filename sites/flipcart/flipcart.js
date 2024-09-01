import puppeteer from 'puppeteer';
import fs from 'fs';

const targetUrls = [
    " https://www.flipkart.com/nivea-men-fresh-power-deodorant-spray/p/itme1d658d5d41fa?pid=DEOGXX3PGZBKEBDY&lid=LSTDEOGXX3PGZBKEBDYMLGCZN&marketplace=FLIPKART&q=nivia+mens+body+spray+for+men&store=g9b%2F0yh%2Fvp1%2F0kb&srno=s_1_1&otracker=search&otracker1=search&fm=Search&iid=en_Yshqjrgd8b0TMm34xEwzVXqUm1j_x0AJCeEf4N-qcCD2jqcVhrpYAxnu20kNK5fJYkQnX6dm7LzvLzwGyRQsnvUFjCTyOHoHZs-Z5_PS_w0%3D&ppt=sp&ppn=sp&ssid=y7gtyugesg0000001725204583180&qH=4c736f1d02ec647d",
  "https://www.flipkart.com/apple-iphone-15-plus-blue-256-gb/p/itm4f3e6fe529a68?pid=MOBGTAGPZXR7SRP6&lid=LSTMOBGTAGPZXR7SRP6LPK3EE&marketplace=FLIPKART&q=iphone+15+plus+256+gb&store=tyy%2F4io&srno=s_1_1&otracker=AS_QueryStore_OrganicAutoSuggest_1_12_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_12_na_na_na&fm=organic&iid=c81f28bf-b7f7-4054-8fd6-da71dbe14848.MOBGTAGPZXR7SRP6.SEARCH&ppt=hp&ppn=homepage&ssid=z6ikfzwchs0000001725204285668&qH=c6c95f83ea72e8f6",
  "https://www.flipkart.com/tang-orange-instant-drink-mix/p/itmexzyeypfrjuef?pid=CNCFGC2GVSXNFKHG&lid=LSTCNCFGC2GVSXNFKHG3WWJ7G&marketplace=FLIPKART&q=orange+tang&store=search.flipkart.com&srno=s_1_2&otracker=search&otracker1=search&fm=Search&iid=be6fb212-c0d7-4639-8cf1-468219f294a8.CNCFGC2GVSXNFKHG.SEARCH&ppt=sp&ppn=sp&ssid=uk9viesjds0000001725204634737&qH=631637703b2a90cb",
  "https://www.flipkart.com/snickers-peanut-filled-chocolate-loaded-nougat-caramel-bars/p/itma6e8094c8f76c?pid=CHCFUPXTAFF7YTHE&lid=LSTCHCFUPXTAFF7YTHEDENHC8&marketplace=FLIPKART&q=snikers&store=eat%2F0pt&srno=s_1_2&otracker=search&otracker1=search&fm=Search&iid=948ad93b-09ee-4cd2-91e9-f8e432da334f.CHCFUPXTAFF7YTHE.SEARCH&ppt=sp&ppn=sp&ssid=fromvdh23k0000001725204706911&qH=08d0a97363ac1c14",
  "https://www.flipkart.com/coca-cola-original-taste-soft-drink-can/p/itm0c67cee021b1b?pid=ARDET6ZNEMZRRTFK&lid=LSTARDET6ZNEMZRRTFK3OF6MN&marketplace=FLIPKART&q=coca+cola+zero+can&store=eat%2Fiw1&srno=s_1_3&otracker=search&otracker1=search&fm=Search&iid=f0982284-0f38-4b21-8c9d-28892df5bff3.ARDET6ZNEMZRRTFK.SEARCH&ppt=sp&ppn=sp&ssid=ppcs9gp8w00000001725204765352&qH=0ada98ad707a3ef1",
  "https://www.flipkart.com/mother-dairy-buffalo-ghee-1-l-tetrapack/p/itmevg85mbj2cyhk?pid=GHEEUC29AGE5PPU3&lid=LSTGHEEUC29AGE5PPU3OIUQCM&marketplace=FLIPKART&q=mother+dairy+ghee+1&store=eat%2Fklf%2Ff3s&srno=s_1_1&otracker=AS_QueryStore_OrganicAutoSuggest_1_17_sc_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_17_sc_na_na&fm=search-autosuggest&iid=f1659667-0b7b-4284-b6bd-3cccb72a1824.GHEEUC29AGE5PPU3.SEARCH&ppt=sp&ppn=sp&ssid=ynd6lrclg00000001725204930413&qH=e3997a9d2ad857d1"

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
          "Nx9bqj CxhGGd"
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
  fs.writeFile('flipcart_prices.json', JSON.stringify(results, null, 2), (err) => {
    if (err) {
      console.error('Error writing to JSON file:', err);
    } else {
      console.log('Results have been written to prices.json');
    }
  });
})();