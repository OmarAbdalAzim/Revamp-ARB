import { Constants } from 'src/configurations/Constants';

export class TagServiceProvider {
  public async getTag(language: string, datasource: string, template: string) {
    const query = `# Write your query or mutation here
query Tags    {
  search(
    where: {
      AND: [
        { name: "_language", value:"${language}" }
        {
             name: "_path"
             value: "${datasource}"
             operator: CONTAINS
        }
        {
          OR: [
            {
              name: "_templates"
              value: "${template}"
              operator: EQ
            }
          ]
        }
      ]
    }

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
        //console.log("done");
        return result.data.search; //as IBlog;
      }
      //console.log("done");
      return null;
    } catch (error) {
      //console.error('Fetch error:', error);
      return null;
    }
  }
}
