import puppeteer from "puppeteer";
import fs from "fs";

async function generateScreenshot() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.justkaarlo.com/fs25", {
    waitUntil: "networkidle2"
  });

  const filePath = "./public/og-image.png";
  await page.screenshot({
    path: filePath,
    type: "png",
    fullPage: false,
    clip: { x: 0, y: 0, width: 1200, height: 630 }
  });

  await browser.close();
  console.log("Generated:", filePath);
}

generateScreenshot();