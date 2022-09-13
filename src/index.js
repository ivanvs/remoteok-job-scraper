const Apify = require('apify');
const { scrape } = require('./crawler');

const {
  utils: { log },
} = Apify;

Apify.main(async () => {
  const input = await Apify.getInput();
  const { tag = '', maxNumberOfListings = 50, proxyConfiguration, debugLog = false, maxConcurrency = 1 } = input;

  if (debugLog) {
    log.setLevel(log.LEVELS.DEBUG);
  }

  let proxy = null;
  if (proxyConfiguration) {
    proxy = await Apify.createProxyConfiguration(proxyConfiguration);
  }

  await scrape({ tag, maxNumberOfListings, maxConcurrency, proxy });
});
