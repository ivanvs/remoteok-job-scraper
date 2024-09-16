import { gotScraping } from 'crawlee';
import csvtojson from 'csvtojson';

export const isRemoteOkUrl = url => url.startsWith('https://remoteok.com/');

export const getStartRequestsFromUrl = async startUrl => {
  let sourceUrl = startUrl.requestsFromUrl;
  if (
    startUrl.requestsFromUrl.includes('/spreadsheets/d/') &&
    !startUrl.requestsFromUrl.includes('/gviz/tq?tqx=out:csv')
  ) {
    const [googlesheetLink] = startUrl.requestsFromUrl.match(/.*\/spreadsheets\/d\/.*\//);
    sourceUrl = `${googlesheetLink}gviz/tq?tqx=out:csv`;
  }
  const response = await gotScraping({ url: sourceUrl, encoding: 'utf8' });
  const rows = await csvtojson({ noheader: true }).fromString(response.body);

  return rows.map(row => ({
    url: row.field1,
  }));
};

export const buildStartRequests = async startUrls => {
  const startRequests = [];
  const awaitUrls = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const startUrl of startUrls) {
    if (startUrl.requestsFromUrl) {
      const startRequestsFromUrl = getStartRequestsFromUrl(startUrl);
      awaitUrls.push(startRequestsFromUrl);
    } else {
      startRequests.push(startUrl);
    }
  }

  const awaitedUrls = (await Promise.all(awaitUrls)).flatMap(x => x);
  startRequests.push(...awaitedUrls);
  return startRequests;
};
