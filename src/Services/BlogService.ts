import { Constants, DataSource } from "src/configurations/Constants";

export class BlogServiceProvider {
  public async getBlogs(
    language: string,
    nextPage: string,
    term: string,
    categoryFilter:string
  ) {

    const Catfilter = !categoryFilter || categoryFilter.trim().length === 0
      ? ''
      : `
    {
      name:"category"
      value:"${categoryFilter}"
      operator:EQ
      
    }`;

    const termFilter = !term || term.trim().length === 0
    ? ''
    : `
   {
  OR:[
         {
            name: "title"
            value: "${term}"
            operator: CONTAINS
        }
                  {
            name: "content"
            value: "${term}"
            operator: CONTAINS
        }
  ]    
  }`;

  const query = `query blogs    {
  search(
    where: {
      AND: [
           { name: "_language", value:"${language}" } 
        {
             name: "_path"
             value: "${Constants.BlogFolder}"
             operator: CONTAINS
        }
        ${termFilter}
        ${Catfilter}
        {
          OR: [
            {
              name: "_templates"
              value: "${Constants.BlogItem}"
              operator: EQ
            }
          ]
        }
      ]
    }
    first: 10 after:"${nextPage}"
    orderBy: { name: "publishdate", direction:  DESC}
  ) {
    total
    pageInfo {
      endCursor
      hasNext
    }
    results {
      language {
        name
      }
      parent {
        id
        name
        titlepart1: field(name: "title part1") { value}
        ctatitle: field(name: "CTA Title") { value}
        ctaLink: field(name: "CTA Link") { value}
      }
      id
      name
      title: field(name: "title") {
         ... on TextField{
          value
        }
      }
      publishdate: field(name: "publishdate") {
       ... on DateField{
         value: formattedDateValue(format:"g",offset:0)
        }
      }
      content: field(name: "content") {
        ... on RichTextField{
          value
        }
      }
      image: field(name: "image") {
         ... on ImageField{
          src
        }
      }
      category: field(name: "category") {
        value
      }
        multilistfield: field(name: "MultilistField") {
         ... on MultilistField{
          targetItems{fields{name,value}}
        }
      }
         dropLinkField: field(name: "dropLinkField") {
       ... on LookupField{
          targetItem{fields{value,name}}
        }
      }
       dropListField: field(name: "dropListField") {
        value
      }
       nameValueListField: field(name: "nameValueListField") {
        ... on NameValueListField{
        value
        }
      }
      treeList: field(name: "treeList") {
            ... on MultilistField{
          targetItems{fields{name,value}}
        }
      }
      generalLink: field(name: "generalLink") {
        ... on LinkField{
        url
      }
      }
       checkboxField: field(name: "checkboxField") {
        ... on CheckboxField{boolValue}
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
        return result.data.search ;//as IBlog;
      }
      return null;
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  }
}