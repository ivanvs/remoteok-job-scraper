import { prepareSearchUrl } from './urls.js';

import { scrape } from './crawler.js';

const startUrls = [
  'https://remoteok.com/?=&action=get_jobs&offset=0',
  prepareSearchUrl('https://remoteok.com/remote-engineer+exec-jobs?order_by=salary'),
];

await scrape({
  maxConcurrency: 1,
  proxy: undefined,
  urls: startUrls,
  maxNumberOfResults: 100,
});
