# RemoteOK Job Scraper

Scrape data from [RemoteOK](https://remoteok.com/) easily with RemoteOK Job Scraper

## How to use

In order to use RemoteOK Job Scraper you need to go to web site and do approriate search you want to scrape. When you are satisfied with search copy URL from browser and put it in `searchUrls` field. With that set you can start scraping your search with the actor.

### Example

If we want to scrape jobs for `java` and to get 500 results input would look like this:

```json
{
  "searchUrls": [
        {
            "url": "https://remoteok.com/remote-java-jobs?order_by=date"
        }
    ]
  "maxNumberOfListings": 500
}
```

## Data Output Example

```json
[
  {
    "id": "112230",
    "company": "SportyBet",
    "url": "https://remoteok.com/remote-jobs/112230-remote-backend-engineer-sportybet",
    "title": "Backend Engineer",
    "tags": ["Engineer", "Senior", "Finance"],
    "time": "2022-08-26T11:24:54+00:00",
    "locations": ["🇪🇺 Europe", "💃 Latin America", "🇨🇦 Canada", "🇷🇺 Russia", "🇺🇦 Ukraine"],
    "minSalary": "$40k",
    "maxSalary": "$80k",
    "offset": "1"
  }
]
```

## RemoteOK data output

The output from RemoteOK Job Scraper is stored in the dataset. After the run is finished, you can download the dataset in various data formats (JSON, CSV, XML, RSS, HTML Table).

## How much does it cost to scrape RemoteOK?

Running RemoteOK Job Scraper once will get you 1,000 results for less than USD 1 in Apify platform credits. For more details about the plans offer, platform credits, and usage, see the platform pricing [page](https://apify.com/pricing/actors).

## Support

For more custom/simplify outputs or Bug report please contact the developer (me) or report an issue.
