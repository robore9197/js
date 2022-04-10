"use strict"

const puppeteer = require('puppeteer')
const { scrollPageToBottom } = require('puppeteer-autoscroll-down')
const { loadVision } = require('./bodycrawl')

const CRED = require('./creds.rem');

const sleep = async (ms) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, ms)
  });
}

const ID = {
  login: '#m_login_email',
  pass: '#m_login_password'
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-notifications']
  });
  const page = await browser.newPage();
  let login = async () => {
    // login
    await page.goto('https://m.facebook.com', {
      waitUntil: 'networkidle2'
    });
    await page.waitForSelector(ID.login);
    console.log(CRED.user);
    console.log(ID.login);
    await page.type(ID.login, CRED.user);

    await page.type(ID.pass, CRED.pass);
    await sleep(500);

    // await page.click("#loginbutton")
    await page.click("[name='login']")
    
    console.log("login done");
    await page.waitForNavigation();
    await page.goto('https://m.facebook.com/194149144034882', {
      waitUntil: 'networkidle2'
    });
    //get human like
    await page.click("[class = '._1g06']")

    await page.waitForSelector(".darkTouch", {
      waitUntil: 'networkidle2'
    });

    //visible for click
    const isElementVisible = async (page, cssSelector) => {
      let visible = true;
      await page
        .waitForSelector(cssSelector, { visible: true, timeout: 5000 })
        .catch(() => {
          visible = false;
        });
      return visible;
    };

    const selectorForLoadMoreButton = '.primarywrap div div strong'
    // loadVision('.primarywrap div div strong')
    //click for more information
    let loadMoreVisible = await isElementVisible(page, selectorForLoadMoreButton);
    while (loadMoreVisible) {
      await scrollPageToBottom(page, {
        size: 500,
        delay: 250
      })
      await page
        .click(selectorForLoadMoreButton)
        .catch(() => {});
      loadMoreVisible = await isElementVisible(page, selectorForLoadMoreButton);
    }

    //get human like
    const results = await page.evaluate(() => {
      items = document.querySelectorAll('.darkTouch')  
      let links = []
      items.forEach(item => 
        links.push({
          // title: item.innerText,
          url: item.getAttribute('href')
        })
      )
      return links;     
    });
    console.log(results)
  }
  await login();
})();

