import { Actor } from 'apify';
import { scrape } from './crawler.js';
import { log } from 'crawlee';

// Initialize the Apify SDK
await Actor.init();

const {
  tag = '',
  maxNumberOfListings = 50,
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
