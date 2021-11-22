const puppeteer = require("puppeteer");

const MY_USERNAME_ACCOUNT = "";
const MY_PASSWORD_ACCOUNT = "";
const TARGET_INSTAGRAM_USERNAME = "";
const INSTAGRAM_ACCOUNT = `https://www.instagram.com/${TARGET_INSTAGRAM_USERNAME}/`;

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

async function run() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Access the page
  await page.goto("https://www.instagram.com");

  // Wait for the username input
  await page.waitForSelector("input[name='username']");
  await delay(2500);

  // Get the inputs on the page
  let usernameInput = await page.$("input[name='username']");
  let passwordInput = await page.$("input[name='password']");

  // Type the username in the username input
  await usernameInput.click();
  await page.keyboard.type(MY_USERNAME_ACCOUNT, { delay: 100 });

  // Type the password in the password input
  await passwordInput.click();
  await page.keyboard.type(MY_PASSWORD_ACCOUNT, { delay: 100 });

  // Click the login button
  let button = await page.$x("//div[contains(text(),'Log In')]//..");
  await button[0].click();

  // Make sure we are signed in
  await page.waitForNavigation();

  // They may try to show us something but just go straight to instagram.com
  await page.goto(INSTAGRAM_ACCOUNT);

  // Find and click on followers button
  const followersBtn = await page.$(
    `a[href='/${TARGET_INSTAGRAM_USERNAME}/following/'`
  );
  followersBtn.click();

  // Scroll till the bottom to view all followers
  await page.waitForNavigation();

  await page.evaluate(() => {
    setInterval(() => {
      document.querySelector("div.isgrP").scrollBy(0, 800);
    }, 10);
  });

  // await browser.close();
}

// We are good to go
run();
