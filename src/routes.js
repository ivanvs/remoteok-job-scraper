import { Dataset, createCheerioRouter } from 'crawlee';

const getAtt = (el, attName) => el.attributes.find(x => x.name === attName)?.value;
const getAttInt = (el, attName) => parseInt(getAtt(el, attName), 10);

export const createRouter = ({ maxNumberOfListings = 50 }) => {
  const router = createCheerioRouter();
  const maxOffset = maxNumberOfListings;

  const getJobData = (el, $) => {
    const id = getAtt(el, 'data-id');
    const company = getAtt(el, 'data-company');
    const url = getAtt(el, 'data-url');
    const offset = getAtt(el, 'data-offset');
    let title = '';
    const tags = [];
    let time = '';
    $('h2', el).each((_, h2) => {
      title = h2.firstChild?.data?.trim();
    });

    $('.tag h3', el).each((_, ele) => {
      const tag = ele?.firstChild?.data?.trim();
      if (tag) {
        tags.push(tag);
      }
    });

    $('.time time', el).each((_, timeEl) => {
      time = getAtt(timeEl, 'datetime');
    });

    const locationsEl = $('.location', el).get();
    const locations = [];

    for (let i = 0; i < locationsEl.length - 1; i += 1) {
      const location = locationsEl[i]?.firstChild?.data?.trim();
      locations.push(location);
    }

    const money = locationsEl[locationsEl.length - 1]?.firstChild?.data?.trim();
    let minSalary = '';
    let maxSalary = '';
    if (money) {
      const moneyText = money.replace('💰 ', '').replace('*', '').split(' - ');

      if (moneyText.length === 2) {
        [minSalary, maxSalary] = moneyText;
      } else if (moneyText.length === 1) {
        [minSalary] = moneyText;
      }
    }

    return {
      id,
      company,
      url: `https://remoteok.com${url}`,
      title,
      tags,
      time,
      locations,
      minSalary,
      maxSalary,
      offset,
    };
  };

  router.addDefaultHandler(async ({ request, log, $, crawler }) => {
    log.info(`Processing page ${request.url}`);

    let currentOffset = 0;
    const jobs = [];
    await $('tr').map(async (_, el) => {
      if (el.attributes.find(x => x.name === 'class' && x.value.includes('job'))) {
        currentOffset = getAttInt(el, 'data-offset');
        if (currentOffset > maxOffset) {
          // we got number of jobs that we wanted
          return;
        }
        jobs.push(getJobData(el, $));
      } else if (el.attributes.find(x => x.name === 'class' && x.value.includes('expand'))) {
        const jobId = getAtt(el, 'data-id');
        const job = jobs.find(x => x.id === jobId);

        if (!job) {
          log.debug(`Job ${jobId} cannot be found, current offset: ${currentOffset}`);
          return;
        }

        job.description = $('div.html', el)?.first()?.text()?.trim();
        job.descriptionHtml = $('div.html', el)?.first()?.html()?.trim();
      }
    });

    const url = new URL(request.url);
    url.searchParams.set('offset', currentOffset);

    await Dataset.pushData(jobs);

    if (currentOffset < maxOffset) {
      const requests = [];
      requests.push({
        url: url.toString(),
      });
      await crawler.addRequests(requests);
    }
  });

  return router;
};
