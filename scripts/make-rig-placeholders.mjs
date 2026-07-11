// Generates placeholder PNGs for the exploded rig view by screenshotting
// styled HTML panels. Rerun any time: node scripts/make-rig-placeholders.mjs
import { chromium } from "playwright";
import fs from "node:fs";

const PARTS = [
  "iphone",
  "head-strap",
  "chest-harness",
  "phone-clamp",
  "cable",
  "hard-hat-mount",
];

fs.mkdirSync("public/rig", { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 640, height: 480 },
  deviceScaleFactor: 1,
});

for (const part of PARTS) {
  const label = part.replaceAll("-", "_");
  await page.setContent(`
    <style>
      * { margin: 0; box-sizing: border-box; }
      body {
        width: 640px; height: 480px;
        background: #14181A;
        display: grid; place-items: center;
        font-family: ui-monospace, Menlo, monospace;
      }
      .frame {
        width: 616px; height: 456px;
        border: 2px solid rgba(138, 146, 143, 0.5);
        display: grid; place-items: center;
        position: relative;
      }
      .tick { position: absolute; width: 14px; height: 14px; border-color: #3BF07A; border-style: solid; border-width: 0; }
      .tl { top: -2px; left: -2px; border-top-width: 2px; border-left-width: 2px; }
      .tr { top: -2px; right: -2px; border-top-width: 2px; border-right-width: 2px; }
      .bl { bottom: -2px; left: -2px; border-bottom-width: 2px; border-left-width: 2px; }
      .br { bottom: -2px; right: -2px; border-bottom-width: 2px; border-right-width: 2px; }
      .stack { text-align: center; }
      .name { color: #F4F2EC; font-size: 42px; letter-spacing: 0.02em; }
      .tag { color: #FFB400; font-size: 17px; margin-top: 18px; }
    </style>
    <body>
      <div class="frame">
        <div class="tick tl"></div><div class="tick tr"></div>
        <div class="tick bl"></div><div class="tick br"></div>
        <div class="stack">
          <div class="name">${label}</div>
          <div class="tag">placeholder_asset</div>
        </div>
      </div>
    </body>
  `);
  await page.screenshot({ path: `public/rig/${part}.png` });
  console.log(`public/rig/${part}.png`);
}

await browser.close();
