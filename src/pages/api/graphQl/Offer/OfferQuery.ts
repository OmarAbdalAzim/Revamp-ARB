import { OfferConstants } from 'src/configurations/Constants';

export const ALL_Offers = (parentId: string, language: string) => `query offer {
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

export default ALL_Offers;
