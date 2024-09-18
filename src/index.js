import { Actor } from 'apify';
import { log } from 'crawlee';
import { scrape } from './crawler.js';
import { buildStartRequests, isRemoteOkUrl } from './urls.js';

// Initialize the Apify SDK
await Actor.init();

const { maxNumberOfListings = 100, debugLog = false, maxConcurrency = 1, searchUrls = [] } = await Actor.getInput();

if (debugLog) {
  log.setLevel(log.LEVELS.DEBUG);
}

const proxy = await Actor.createProxyConfiguration({
  useApifyProxy: true,
  apifyProxyGroups: ['RESIDENTIAL'],
});
const urls = [];

const allUrls = await buildStartRequests(searchUrls);

allUrls
  .filter(url => isRemoteOkUrl(url.url))
  .forEach(url => {
    if (url && url.url) {
      urls.push(url.url);
    }
  });

await scrape({ urls, maxNumberOfListings, maxConcurrency, proxy });

await Actor.exit();
