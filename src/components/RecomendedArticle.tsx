import React, { Component } from 'react';
import { GraphQlAPI } from 'src/pages/api/graphQl/Services/GraphQlAPI';
import MediaCenter_Query from 'src/pages/api/graphQl/MediaCenter/MediaCenterQuery';

class RecomendedArticle extends Component {
  APIService: GraphQlAPI;
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
    this.APIService = new GraphQlAPI();
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = async () => {
    const language = 'en'; // Set your language here
    const nextPage = ''; // Set your next page logic if necessary

    try {
      const articles = await this.APIService.getItems(
        MediaCenter_Query(language, nextPage, '', '', '')
      );
      if (articles) {
        this.setState({ articles });
        console.log('Articles fetched:', articles);
      }
    } catch (error) {
      console.error('Error fetching Articles:', error);
    }
  };

  render() {
    let url;
    let itemId;
    // Check if `window` is defined before using it
    if (typeof window !== 'undefined') {
      url = new URL(window.location.toString());
      itemId = url.searchParams.get('id'); // Get the item ID from the URL
      window.history.pushState({}, '', url);
    }

    const styles = {
      container: {
        maxWidth: '1000px',
        margin: 'auto',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
      },
      image: {
        width: '100%',
        borderRadius: '8px',
      },
      title: {
        marginTop: '20px',
        fontSize: '2em',
        color: '#333',
      },
      description: {
        color: '#666',
        lineHeight: 1.6,
      },
    };

    const gridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Responsive grid
      gap: '20px',
      padding: '20px',
    };

    const cardStyle: React.CSSProperties = {
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '10px',
      textAlign: 'center',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    };

    const labelStyle = {
      backgroundColor: 'lightblue',
      borderRadius: '20px', // Adjust for more or less curvature
      padding: '4px 8px', // Optional: add some padding
    };

    return (
      <>
        <div style={styles.container}>
          <div><h1>Recommended Articles</h1></div>
          <div style={gridStyle}>
            {this.state?.articles?.results
              ?.filter(res => res.id.toLowerCase() !== itemId?.replace(/-/g, '').toLowerCase()) // Filter articles by itemId
              .map((res) => (
                <div key={res.id} style={cardStyle}>
                  <img
                    src={res?.image?.src}
                    alt={'' || ''}
                    style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
                  />
                  {res?.ArticleCategoryTags?.targetItems.map((itm) => (
                    <span key={itm.id} style={labelStyle}>{itm?.title?.value}</span>
                  ))}
                  <div><br /></div>
                  {res?.Year?.targetItems.map((itm) => (
                    <span key={itm.id} style={labelStyle}>{itm?.title?.value}</span>
                  ))}
                  <h3>
                    <a href={res?.url?.path}>{res.title.value}</a>
                  </h3>
                  <p>{res?.content?.value}</p>
                  <p style={labelStyle}>{res?.PublishedDate?.value}</p>
                </div>
              ))}
          </div>
        </div>
      </>
    );
  }
}

export default RecomendedArticle;
