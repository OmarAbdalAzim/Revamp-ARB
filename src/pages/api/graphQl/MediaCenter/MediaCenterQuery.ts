import { MediaCenterConstants } from 'src/configurations/Constants';

export const MediaCenter_Query = (
  language: string,
  nextPage: string,
  term: string,
  yearFilter: string,
  catFilter: string
) => `query mediaCenter {
  search(
    where: {
      AND: [
         { name: "_language", value:"${language}" }
        { name: "_path",  value: "${MediaCenterConstants.MediaCenterPage}", operator: CONTAINS },
         ${
           !term || term.trim().length === 0
             ? ''
             : ` {
              name: "title"
              value: "${term}"
              operator: CONTAINS
          }`
         }
        ${
          !catFilter || catFilter.trim().length === 0
            ? ''
            : ` {
                name: "ArticleCategoryTags"
                value: "${catFilter}"
                operator: CONTAINS
            }`
        }
        ${
          !yearFilter || yearFilter.trim().length === 0
            ? ''
            : ` {
                name: "Year"
                value: "${yearFilter}"
                operator: CONTAINS
            }`
        }
        {name: "_templates", value: "${MediaCenterConstants.ArticlTemplate}",operator: EQ}
      ]
    }
    first: 20

  ) {
    total
    pageInfo {
      endCursor
      hasNext
    }
    results {
      id
      name
       url{path}
      title: field(name: "title") {
         ... on TextField{
          value
        }
      }
           ArticleCategoryTags: field(name: "ArticleCategoryTags") {
        ... on MultilistField {
          targetItems {
            id
            name
            title: field(name: "title") {
              ... on TextField {
                value
              }
            }
          }
        }
      }
            Year: field(name: "Year") {
        ... on MultilistField {
          targetItems {
            id
            name
            title: field(name: "title") {
              ... on TextField {
                value
              }
            }
          }
        }
      }
        PublishedDate: field(name: "PublishedDate") { ... on DateField { value: formattedDateValue(format: "g", offset: 0) } }
       Content: field(name: "Content") {
         ... on RichTextField{
          value
        }
      }
           image: field(name: "Hero Background Image") {
         ... on ImageField{
          src
        }
      }

    }
  }
}
`;

export default MediaCenter_Query;
