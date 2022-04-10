const puppeteer = require('puppeteer')
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

(async (loginF) => {
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
    }
    await login();
    return page
});

module.exports = { loginF }
