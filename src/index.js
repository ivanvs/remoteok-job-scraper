import { Actor } from 'apify';
import { log } from 'crawlee';
import { scrape } from './crawler.js';
import { buildStartRequests, prepareSearchUrl } from './urls.js';

// Initialize the Apify SDK
await Actor.init();

const {
  tag = '',
  maxNumberOfListings = 100,
  debugLog = false,
  maxConcurrency = 1,
  searchUrls = [],
} = await Actor.getInput();

if (debugLog) {
  log.setLevel(log.LEVELS.DEBUG);
}

const proxy = await Actor.createProxyConfiguration({
  useApifyProxy: true,
  apifyProxyGroups: ['RESIDENTIAL'],
});
const urls = [];

if (tag) {
  urls.push(`https://remoteok.com/?tags=${encodeURIComponent(tag)}&action=get_jobs&offset=0`);
}

const allUrls = await buildStartRequests(searchUrls);

allUrls
  .map(x => x.url)
  .forEach(url => {
    const newUrl = prepareSearchUrl(url);
    if (newUrl) {
      urls.push(newUrl);
    }
  });

await scrape({ urls, maxNumberOfListings, maxConcurrency, proxy });

await Actor.exit();
