import { PlaywrightCrawler } from 'crawlee';
import { createRouter } from './routes.js';
import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';

chromium.use(stealthPlugin());

export const scrape = async ({ urls, maxNumberOfListings, maxConcurrency = 1, proxy }) => {
  const router = createRouter({ maxOffset: maxNumberOfListings });
  const crawler = new PlaywrightCrawler({
    launchContext: {
      launcher: chromium,
      // Here you can set options that are passed to the playwright .launch() function.
      launchOptions: {
        headless: true,
      },
    },
    proxyConfiguration: proxy,
    requestHandler: router,
    maxConcurrency,
    useSessionPool: true,
    persistCookiesPerSession: true,
    sessionPoolOptions: {
      maxPoolSize: 50,
      sessionOptions: {
        maxUsageCount: 1,
      },
    },
  });

  await crawler.run(urls);
};
