import { CheerioCrawler } from 'crawlee';
import { createRouter } from './routes.js';

const startUrls = ['https://remoteok.com/?=&action=get_jobs&offset=0'];

const crawler = new CheerioCrawler({
  requestHandler: createRouter({ maxNumberOfListings: 50 }),
});

await crawler.run(startUrls);
