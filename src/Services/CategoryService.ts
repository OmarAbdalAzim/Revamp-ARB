import { Constants } from "src/configurations/Constants";

export class CategoryServiceProvider {
  public async getCategories(
    language: string
  ){
    
    const query = `# Write your query or mutation here
query Categories    {
  search(
    where: {
      AND: [
           { name: "_language", value:"en" } 
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
                
        //console.log("done");
        return result.data.search ;//as IBlog;
      }
      //console.log("done");
      return null;
    } catch (error) {
      //console.error('Fetch error:', error);
      return null;
    }
  }
}
