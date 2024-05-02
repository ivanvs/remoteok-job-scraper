import { Actor } from 'apify';
import { log } from 'crawlee';
import { scrape } from './crawler.js';

// Initialize the Apify SDK
await Actor.init();

const {
  tag = '',
  maxNumberOfListings = 100,
  proxyConfiguration,
  debugLog = false,
  maxConcurrency = 1,
} = await Actor.getInput();

if (debugLog) {
  log.setLevel(log.LEVELS.DEBUG);
}

let proxy = null;
if (proxyConfiguration) {
  proxy = await Actor.createProxyConfiguration(proxyConfiguration);
}

await scrape({ tag, maxNumberOfListings, maxConcurrency, proxy });

await Actor.exit();
