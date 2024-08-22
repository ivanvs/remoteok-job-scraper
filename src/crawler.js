import { CheerioCrawler } from 'crawlee';
import { createRouter } from './routes.js';

export const scrape = async ({ urls, maxNumberOfListings, maxConcurrency = 1, proxy }) => {
  const router = createRouter({ maxOffset: maxNumberOfListings });
  const crawler = new CheerioCrawler({
    proxyConfiguration: proxy,
    requestHandler: router,
    maxConcurrency,
  });

  await crawler.run(urls);
};
