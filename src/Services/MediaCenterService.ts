import { Constants, MediaCenterConstants } from "src/configurations/Constants";

export class MediaCenterProvider {
  public async getArticles(language: string, nextPage: string, term: string,yearFilter:string,catFilter:string) {
    const termFilter =
      !term || term.trim().length === 0
        ? ''
        : ` {
            name: "title"
            value: "${term}"
            operator: CONTAINS
        }`;
        const categoryFilter =
        !catFilter || catFilter.trim().length === 0
      ? ''
      : ` {
              name: "ArticleCategoryTags"
              value: "${catFilter}"
              operator: CONTAINS
          }`;
        const year_filter =
          !yearFilter || yearFilter.trim().length === 0
        ? ''
        : ` {
                name: "Year"
                value: "${yearFilter}"
                operator: CONTAINS
            }`;
            
  const query = `query mediaCenter {
  search(
    where: {
      AND: [
        { name: "_language", value: "en" },
        { name: "_path",  value: "${MediaCenterConstants.MediaCenterPage}", operator: CONTAINS },
        ${termFilter}
        ${categoryFilter}
        ${year_filter}
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
    try {
      const response = await fetch(
        `${Constants.GraphQLLink}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query
          })
        }
      );
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
