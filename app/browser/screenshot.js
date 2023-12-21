const scrollDownFrame = async (page) => {
  const iframeElement = await page.waitForSelector("iframe");

  const iframe = await iframeElement.contentFrame();

  iframe.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
};

const hidePassword = async (page) => {
  const iframeElement = await page.waitForSelector("iframe");

  const iframe = await iframeElement.contentFrame();

  const passwordElement = await iframe.waitForXPath(
    "//strong[contains(text(), 'Password')]/../..",
    { timeout: 5000 }
  );

  await passwordElement.evaluate((node) => {
    node.style.display = "none";
  });
};

async function screenshotEmail(browser, url, type) {
  const page = await browser.newPage();

  await page.goto(url, { timeout: 0 });

  if (type) {
    try {
      switch (type) {
        case "reminder":
          await scrollDownFrame(page);
          break;
        case "welcome":
          await hidePassword(page);
          break;
        default:
          console.log("Invalid type in screenshotEmail function", type);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const screenshot = await page.screenshot({
    fullPage: true,
    encoding: "base64",
  });

  await page.close();

  return screenshot;
}

module.exports = { screenshotEmail };
