import { CheerioCrawler } from 'crawlee';
import { createRouter } from './routes.js';
import { prepareSearchUrl } from './urls.js';

const startUrls = [
  'https://remoteok.com/?=&action=get_jobs&offset=0',
  prepareSearchUrl('https://remoteok.com/remote-engineer+exec-jobs?order_by=salary'),
];

const crawler = new CheerioCrawler({
  requestHandler: createRouter({ maxNumberOfListings: 1000 }),
});

await crawler.run(startUrls);
