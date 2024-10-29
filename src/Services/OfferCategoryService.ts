import { Constants } from 'src/configurations/Constants';

export class OfferCategoryProvider {
  public async getOfferCategory(language: string, nextPage: string, pagesize: string) {
    const nextPageFilter = !nextPage || nextPage.trim().length === 0 ? '' : ` after :"${nextPage}"`;

    const query = `query offerCategory {
  search(
    where: {
      AND: [
        
        { name: "_language", value:"${language}" }
        { name: "_path", value: "{4A0FA8DB-0A62-4884-9C4F-D57A403D7C96}", operator: CONTAINS },
        { name: "_templates", value: "{2B81F8CD-A721-4AC6-B382-A1928CB6B70F}", operator: EQ}
      ]
    }
    first: ${pagesize} ${nextPageFilter}

  ) {
    total
    pageInfo {
      endCursor
      hasNext
    }
   
    results {
   url{path}
      parent{name}
      children{total }
      id
      name
      title: field(name: "title") {
         ... on TextField{
          value
        }
      }
     Content: field(name: "content") {
         ... on RichTextField{
          value
        }
      }
      OverviewTitle: field(name: "OverviewTitle") {
         ... on RichTextField{
          value
        }
      }
      OverviewLink: field(name: "OverviewLink") {
        ... on LinkField{
        url
      }
      }
      Icon : field(name: "Icon") {
         ... on ImageField{
          src
        }
      }
      OfferSliderImage: field(name: "OfferSliderImage") {
         ... on ImageField{
          src
        }
      }
    }
  }
}

`;
    try {
      const response = await fetch(`${Constants.GraphQLLink}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
        }),
      });
      const result = await response.json();
      if (result.errors) {
        //console.log(result.errors);
        console.error('GraphQL errors:', result.errors);
      } else {
        return result.data.search;
      }
      return null;
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  }
}
