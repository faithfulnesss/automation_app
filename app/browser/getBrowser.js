const puppeteer = require("puppeteer");
const { login } = require("./login");
const { runBashCommand } = require("../utils/bash");

async function getBrowser() {
  let browser;

  try {
    browser = await puppeteer.connect({
      browserURL: "http://127.0.0.1:9222",
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });

    await login(browser);
  } catch (error) {
    const startBrowserScript = "sh start_browser.sh";

    try {
      const result = await runBashCommand(startBrowserScript);
      await new Promise((resolve) => setTimeout(resolve, 500));

      browser = await puppeteer.connect({
        browserURL: "http://127.0.0.1:9222",
        defaultViewport: {
          width: 1920,
          height: 1080,
        },
      });
      await login(browser);
    } catch (startError) {
      console.error("Failed to start the browser:", startError.message);
      throw startError;
    }
  }

  return browser;
}

module.exports = { getBrowser };
