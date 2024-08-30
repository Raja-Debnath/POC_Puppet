import puppeteer from "puppeteer";

function zivame(){

    const targetUrl ="https://www.zivame.com/zivame-high-compression-short-length-shaper-bodysuit-sky-captain.html?trksrc=similarcolors&trkid=product";
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
        const priceElement = document.getElementsByClassName("prd-mprice prd-mprice-new z-bold left pd-r10 c-hover z-pink pd-b5")[0].innerHTML
        return priceElement ? priceElement.innerText : "not fetching";
      });
    
      console.log(priceText);
    
      await browser.close();
    })();
    }
    // export default zivame
    zivame()

// /* dev note 

// for every product page price className is same 

// document.getElementsByClassName("prd-mprice prd-mprice-new z-bold left pd-r10 c-hover z-pink pd-b5")[0].innerText

// scrape fail because of bot [ auto check if iom humain ] maybe cloudflair
// */