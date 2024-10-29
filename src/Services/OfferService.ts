import { Constants, OfferConstants } from 'src/configurations/Constants';

export class OfferProvider {
  public async getOffer(parentId: string, language: string, nextPage: string) {
    const query = `query offer {
  search(
    where: {
      AND: [
        { name: "_language", value:"${language}" }
        { name: "_path", value: "${parentId}", operator: CONTAINS },
        { name: "_templates", value: "${OfferConstants.OfferTemplate}"operator: EQ}
      ]
    }
    first: 5  
    orderBy: { name: "ExpiryDate", direction:  DESC}

  ) {
    total
    pageInfo {
      endCursor
      hasNext
    }
   
    results {
   url{path}
      parent{name}
      id
      name
      title: field(name: "title") {
         ... on TextField{
          value
        }
      }
       SubTitle: field(name: "SubTitle") {
         ... on TextField{
          value
        }
      }

      CardImage: field(name: "CardImage") {
         ... on ImageField{
          src
        }
      }
         BannerImage: field(name: "BannerImage") {
         ... on ImageField{
          src
        }
      }
          ExpiryDate: field(name: "ExpiryDate") {
       ... on DateField{
         value: formattedDateValue(format:"g",offset:0)
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
