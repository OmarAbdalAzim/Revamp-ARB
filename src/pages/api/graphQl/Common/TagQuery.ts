import { TagConstants } from 'src/configurations/Constants';

export const Tag_Query = (language: string, datasource: string) => `query Tags    {
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
              value: "${TagConstants.TagTemplate}"
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

export default Tag_Query;
