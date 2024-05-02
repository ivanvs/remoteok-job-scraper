import { CheerioCrawler } from 'crawlee';
import { createRouter } from './routes.js';

export const scrape = async ({ tag = '', maxNumberOfListings, maxConcurrency = 1, proxy }) => {
  const startUrls = tag
    ? [`https://remoteok.com/?tags=${tag}&action=get_jobs&offset=0`]
    : [`https://remoteok.com/?&action=get_jobs&offset=0`];

  const router = createRouter({ maxOffset: maxNumberOfListings });
  const crawler = new CheerioCrawler({
    proxyConfiguration: proxy,
    requestHandler: router,
    maxConcurrency,
  });

  await crawler.run(startUrls);
};
