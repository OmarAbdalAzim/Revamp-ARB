import { Constants } from 'src/configurations/Constants';

export const Category_Query = (language: string) => `query Categories {
  search(
    where: {
      AND: [
           { name: "_language", value:"${language}" } 
        {
             name: "_path"
             value: "${Constants.CategoryFolderData}"
             operator: CONTAINS
        }
        {
          OR: [
            {
              name: "_templates"
              value: "${Constants.CategoryTemplate}"
              operator: EQ
            }
          ]
        }
      ]
    }
    first: 100 
    orderBy: { name: "oredr", direction:  ASC}
  ) {
    total
    pageInfo {
      
      endCursor
      hasNext
    }
    results {
      id
      name
      title: field(name: "Title") {
         ... on TextField{
          value
        }
      }
    }
  }
}
`;

export default Category_Query;
