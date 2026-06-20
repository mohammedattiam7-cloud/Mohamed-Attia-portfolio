import { chromium } from "d:/New folder/magic-portfolio-main/node_modules/playwright/index.mjs";
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto("http://localhost:3000/work", { waitUntil: "networkidle", timeout: 15000 });
await page.waitForTimeout(4000);
await page.screenshot({ path: "C:/Users/HFCS/AppData/Local/Temp/pos-card-close.png", clip: { x: 0, y: 80, width: 1280, height: 500 } });
await browser.close();
