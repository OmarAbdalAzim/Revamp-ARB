import { OfferConstants } from 'src/configurations/Constants';

export const Offers_Category_Query = (
  language: string,
  nextPage: string,
  pagesize: string
) => `query offerCategory {
  search(
    where: {
      AND: [
        
        { name: "_language", value:"${language}" }
        { name: "_path", value: "${OfferConstants.OfferCategoryPath}", operator: CONTAINS },
        { name: "_templates", value: "${OfferConstants.OfferCategoryTemplate}", operator: EQ}
      ]
    }
    first: ${pagesize} ${!nextPage || nextPage.trim().length === 0 ? '' : ` after :"${nextPage}"`}

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

export default Offers_Category_Query;
