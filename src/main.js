import { scrape } from './crawler.js';

const startUrls = ['https://remoteok.com/'];

await scrape({
  maxConcurrency: 1,
  proxy: undefined,
  urls: startUrls,
  maxNumberOfListings: 100,
});
