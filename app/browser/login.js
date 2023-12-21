const ITERABLE_URL = "https://app.iterable.com/";

async function login(browser) {
  const page = await browser.newPage();

  await page.goto(ITERABLE_URL);

  if (page.url().includes("login")) {
    const username_field = await page.waitForSelector("#username");

    await username_field.type(process.env.ITERABLE_USERNAME);

    const login_button = await page.waitForSelector("._button-login-id");

    await login_button.click();

    const password_field = await page.waitForSelector("#password");

    await password_field.type(process.env.ITERABLE_PASSWORD);

    const password_button = await page.waitForSelector(
      "._button-login-password"
    );

    await password_button.click();

    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  await page.close();

  return;
}

module.exports = { login };
