import { scrape } from './crawler.js';

const startUrls = ['https://remoteok.com/remote-javascript-jobs'];

await scrape({
  maxConcurrency: 1,
  proxy: undefined,
  urls: startUrls,
  maxNumberOfResults: 100,
});
