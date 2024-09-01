import puppeteer from 'puppeteer';
import fs from 'fs';

const targetUrls = [
"https://www.amazon.in/Nivea-Deodorant-Fresh-Active-Pack/dp/B09DS6CFYG/ref=sr_1_2?crid=3LKC9TFCYB4OC&dib=eyJ2IjoiMSJ9.93Qx6WLegIQgCz2fSXGEorMebQkpc3uSBy1gsa5OGWF-GI3Pbk7kjgsopwt1FfylThhgABhLzG-TWyeqYi8x9Uq6Lk7nUL0WX9mkh54ZLkUxDY18l8z4x_eCN_0gSNUdSFgzgsIHXsuDNQYDkSMcb2zphBMfR6hYTShV7tx6gW1fuWWPGUKuRnQNq1AEzhcekZVrfuvYZi_hpg1r7LIgGcoKjRYtKdKUrnM-obLQ6maEmtGNUAB0HDpyzSYmmXmBJ5N__5EasPvxtaO2gW0sBciYPJKSbcaBcl7pk1EI53c.Bgfa2hkElMEr8Dgl2KhpeFhGomloo1QzN-Jim4hK0Ic&dib_tag=se&keywords=Nivea+Body+Spray+for+Men&qid=1725207084&sprefix=nivea+body+spray+for+men%2Caps%2C295&sr=8-2",
"https://www.amazon.in/Apple-iPhone-15-128-GB/dp/B0CHX1W1XY/ref=sr_1_2?crid=22LDP8VI86W2O&dib=eyJ2IjoiMSJ9.8-aKrERwPzdGyJWfWOa56CF4kZg0B_sQd-0kpo-gLZ_0GwH7qQjH_XK4r63vMPJtNbvOaCIPTGBSMXIaMLDpMi4KsBw4XJCKUTM0sp4EAfUfLudEMQiDydW1jepygaJ_0WrC1E5j8OQZRJfldxEGNDAycX45QNNHNwqV_no6zqniboHkKeU8iIbcV69XP5EKuAeEW1661sf4LrzLTzo3UwtjN8E-Uu5pjguoe3T3mJQ.i8ZpvD9mD6UrhxqY5i29Hieauu2vKQ6c-hUBaMqTc_A&dib_tag=se&keywords=Iphone+15+256+GB+Black+Colour&qid=1725207839&sprefix=iphone+15+256+gb+black+colour%2Caps%2C179&sr=8-2",
"https://www.amazon.in/Tabasco-Pepper-Original-Sauce-60ml/dp/B00LXSDTTC/ref=sr_1_1?crid=1NI144GV9VG95&dib=eyJ2IjoiMSJ9.IUwfc2_YiGfFKdikAtxAU1w0SzAAjC8oPHV13KPfDu2QEgvubSKO_Il_atctcv8nofdsJkpNTRBBiiS_kh6GPZlRbhX-6kdKZxHji_ChwwSAulsb8EhshKUnqX_dAnNpY5cqWnqMeVZ-QESw9GR2ecUdMskIhFpt9WJe3y5wBCLf-AuTCvKssFBlog_QZXMrIJKg2csz3ihBOMfcJeSimSckST47kuz2Ib0aOjNeFlyueWCSfCvAqWX97lCLU23d13GRmbvQwfzdG0u3CrpLjQ49d-_INXwkJMHCH-njKGA.j6xb6-9fO2u8ow-N0GH9BGek3Hk6jZNmhgjpADQh9wk&dib_tag=se&keywords=tabasco+red&qid=1725207791&sprefix=tobasco+red%2Caps%2C205&sr=8-1",
"https://www.amazon.in/Tang-Vitamin-C-Enriched-Instant-Orange/dp/B06XJJWSTH/ref=sr_1_1?crid=3JHM76G9M47KA&dib=eyJ2IjoiMSJ9.VD0mIjVBn88vqSL_o2fklJVcoEcVHJPXjIX5OTgkm7atbE0fdDS4wFv9pVH5acEzj7bWv8eKYbQwEgBeVFgCYqTcyYr6xZysyFXZ-Ex7RP2JKJfoYSFQ1MXJafruybBuGS1yTT86Mcdif1zKIJ6sjSSnePVQ-_mCPr41---dak657vjOYQYAGl27f3gdtDx9HVX10XYb30KFZ7MGC7eZV4SyHOPdwK7h7aR2qSudldZtqNt57m-fsANhfFHY-nIpFDfwiZ-1Q2rGb7JTFcaR9dFNJbs8JnMc7WwocKZrpTg.OxhxDRaArBlv6p8ZptSedL83pOtcxg259obA2TisESE&dib_tag=se&keywords=Orange+Tang&qid=1725207922&sprefix=orange+tang%2Caps%2C174&sr=8-1",
"https://www.amazon.in/Snickers-Chocolate-Miniatures-150g-Pack/dp/B07FXF4R5R/ref=sr_1_6?crid=ODYV7KD182G8&dib=eyJ2IjoiMSJ9.tqwScZ_TGdhp6Gl6QaMOR3jRjBkIrCVNcfNc738NlTPbFc4Xhe6cxrJkb8RoSHGLz33P2SZ6LgurooFo-9SOpCCLOPLguBoJIsunbCQYWTPjHBL4D3WbJKDC3B9sROxLSlscuv82fzEsJJUPxqa9mc2eksVmrAzdbwKW53izu36hpDUcJl_t82lOOCGfuVueURlzED_ByIKnIaf0Q96KTtx7wt0sAT22HOOSuVo06wXnaI15mgKCrphzd28CkfMDTiJewxyuaRV1dzeHsaiarujjG0IYVePU-r6PmaJoTJA.AirRZEp1aILEeCH5ThPNlgqPIGwxfhZxkF3b3fELrxE&dib_tag=se&keywords=Snickers&qid=1725208012&sprefix=snickers%2Caps%2C177&sr=8-6",
"https://www.amazon.in/Coca-Cola-Zero-Soft-Drink-300ml/dp/B07G1CKCDH/ref=sr_1_1_f3_0o_fs?crid=1S6ESFYIBFWJQ&dib=eyJ2IjoiMSJ9._gLdfq2VjW9XO7sDI1kBfHdl7S1cuvCZoj4pbfrnOExSzOYB2530xh0ZnAlU8zmaYlbVXuUUhMlWOIVQhODYxA1aOHetl52NT7AoIWFdPUVwtmW87QacbmBjKGUp3vxx0t0v2JRVCvptjV1JnMDbay4fqTlnNbZ7w-9QwUYVJTwRn0Zr53ArmK5bZVC2io8ED95PmofTuPqwXa_U3GQHIkBqAzSurVfiuHd9siEpDaeZQql8VKbjI2Zrw-tTHAedQeLkd0xHikZ9G8M4IUUQ8pvai7xCk2ZJZTHg5jIUBEU.kQQGBeDqAOazFYXiwyar97MD-EYwRJjsTMneQ67R-rY&dib_tag=se&keywords=Coca+Cola+Zero+Can&qid=1725208111&sprefix=coca+cola+zero+can%2Caps%2C181&sr=8-1",
"https://www.amazon.in/Peppy-Tomato-Disc-75-g/dp/B088L1JH88/ref=sr_1_1_f3_0o_fs?crid=3HIHBVDPNYWFT&dib=eyJ2IjoiMSJ9.PgQ7nsGwSnbuKJGMuwDJ0On0t5Y82HMcx3PcgKmdDQhRuwErPBlzZex1apcD0EDHG-KDETcbZQ9U7FRJG3XjJaTj7eUjsY8qgvilMvIvrY6zmR00eKzM_AtTcQPHeKwFxyiQ05WV1XRNbk-0LXmQ9ly2_npmdtkU793rXNZyGQxg-LXR9O6kiNhvjEHg07sCH6J0V3Jfypi0HwP76bW3XIdOWSgAHiqtCcAW36vZwEfkf37oiKh3SnzG8yOfdF-xNWmKu-24xn0sxfJvjKrFWw7HhgNttlSirHBm4ahx8E4.ftbbe_Vxv85FYohh9-5t5rwIE9WZ6C-zC9ZtbmLRN_8&dib_tag=se&keywords=Peppy+Tomato+Discs&qid=1725208198&sprefix=peppy+tomato+discs%2Caps%2C235&sr=8-1",
"https://www.amazon.in/Mother-Dairy-Pure-Healthy-Ghee/dp/B07DD792X7/ref=sr_1_5?crid=2UL7CJR8GXKHS&dib=eyJ2IjoiMSJ9.9v7iYlkB9xvLKqj5YmaFX4yIpT5_FAldNKAJZz3JXWiQh2UvfiblyI9z7am-nHopLlJyiTkbugDGQp9GW5d1oGqo_Hf-nB1LCkdavy6rt1S2Yooe-KsEkw_EeJM-fhRAgk8cfPWT9K8arA3k8dN6h98qefaFho6T-ezEVQegaeX7POzsYjmOxp9g_bW2rphyi4YQaQgCaZi4rjt8FLfErCGlNZjyzwZ4d5t8jsTAr1Z3KrhVKwUaE6QAD6-FSyFkhG3l4CQUeqG_N6pigNlILsaMePTvVA3bQu5wYEkgSmw.nKg5NWdaT1MxZk_0i12-PFvxTJnNxg9XaN_nmmD1Aro&dib_tag=se&keywords=Mother+Dairy+Ghee&qid=1725208237&sprefix=mother+dairy+ghee%2Caps%2C242&sr=8-5",
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
        const priceElement = document.getElementsByClassName("a-price aok-align-center reinventPricePriceToPayMargin priceToPay")[0].innerText;
        return priceElement //? priceElement.innerText : "not fetching";
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
  fs.writeFile('amazon_prices.json', JSON.stringify(results, null, 2), (err) => {
    if (err) {
      console.error('Error writing to JSON file:', err);
    } else {
      console.log('Results have been written to prices.json');
    }
  });
})();
