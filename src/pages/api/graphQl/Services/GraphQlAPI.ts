import { Constants } from 'src/configurations/Constants';

export class GraphQlAPI {
  public async getItems(query: string) {
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
