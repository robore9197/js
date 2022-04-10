const puppeteer = require('puppeteer')
const {loginF} = require('./login')
const { scrollPageToBottom } = require('puppeteer-autoscroll-down')

loginF();
async function loadVision(selectorForLoadMoreButton) {
    const isElementVisible = async (page, cssSelector) => {
    let visible = true;
    await page
      .waitForSelector(cssSelector, { visible: true, timeout: 5000 })
      .catch(() => {
        visible = false;
      });
    return visible;
    };
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
}

module.exports = { loadVision }
