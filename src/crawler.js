import { CheerioCrawler } from 'crawlee';
import { createRouter } from './routes.js';

export const scrape = ({tag = "", maxNumberOfListings = 50, maxConcurrency = 1, proxy }) => {
    const startUrls = tag ? [`https://remoteok.com/?tags=${tag}&action=get_jobs&offset=0`] : [`https://remoteok.com/?&action=get_jobs&offset=0`];

    const router = createRouter({maxNumberOfListings});
    const crawler = new CheerioCrawler({
      proxyConfiguration: proxy,
      requestHandler: router,
      maxConcurrency: maxConcurrency
    });
    
    await crawler.run(startUrls);
};
