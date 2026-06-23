const { chromium } = require("./node_modules/playwright-core");
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    sessionStorage.setItem("loading-shown", "1");
    sessionStorage.setItem("mobile-gate-dismissed", "1");
  });
  await page.goto("http://localhost:3000/work/vacay-track", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.scrollBy(0, 4000));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "C:/Users/HFCS/AppData/Local/Temp/vacay-dd-section.png" });
  await browser.close();
  console.log("Done");
})().catch(e => { console.error(e); process.exit(1); });
