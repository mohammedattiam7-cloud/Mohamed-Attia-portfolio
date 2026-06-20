import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto("http://localhost:3000/work", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
await page.screenshot({ path: "C:/Users/HFCS/AppData/Local/Temp/pos-work-loaded.png", fullPage: true });
await browser.close();
