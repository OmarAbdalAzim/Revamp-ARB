import { constants } from 'buffer';
import React, { Component } from 'react';
import { Constants, MediaCenterConstants } from 'src/configurations/Constants';
import { CategoryServiceProvider } from 'src/Services/CategoryService';
import { MediaCenterProvider } from 'src/Services/MediaCenterService';
import { TagServiceProvider } from 'src/Services/TagService';

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      yearFilter: '', // State for the categoryFilter
      catFilter: '',
      articles: [],
      yearItems:[],
      catItems:[]
    };
    this.mediaCenterService = new MediaCenterProvider();
    this.TagService = new TagServiceProvider();
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({ searchTerm: value }, () => {
      this.handleSearch(value,this.state.yearFilter,this.state.catFilter);
    });
  };
  handleYearFilterChange = (event) => {
    const value = event.target.value;
    this.setState({ yearFilter: value }, () => {
      this.handleSearch(this.state.searchTerm, value,this.state.catFilter);
    });
  };
  handleCatFilterChange = (event) => {
    const value = event.target.value;
    this.setState({ catFilter: value }, () => {
      this.handleSearch(this.state.searchTerm, this.state.yearFilter,value);
    });
  };

  componentDidMount() {
    // Get the search term from the query string when the component mounts
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const yFilter = urlParams.get('yearFilter');
    const cFilter = urlParams.get('catFilter');
    if (query) {
      this.setState({ searchTerm: query });
    }
    if (yFilter) {
      this.setState({ yearFilter: yFilter });
    }
    if (cFilter) {
      this.setState({ catFilter: cFilter });
    }
    this.handleSearch(query,yFilter,cFilter);
  }

  handleSearch = async (term,yearFilter,catFilter) => {

    console.log('Searching for:', term, 'with categoryFilter:');

    // Update the URL with the search term
    const url = new URL(window.location);
    if (term) {
      url.searchParams.set('query', term);
    } else {
      url.searchParams.delete('query'); // Remove the categoryFilter if not selected
    }

    if (yearFilter) {
      url.searchParams.set('yearFilter', yearFilter);
    } else {
      url.searchParams.delete('yearFilter'); // Remove the categoryFilter if not selected
    }

    if (catFilter) {
      url.searchParams.set('catFilter', catFilter);
    } else {
      url.searchParams.delete('catFilter'); // Remove the categoryFilter if not selected
    }

    window.history.pushState({}, '', url);

    const language = 'en'; // Set your language here
    const nextPage = ''; // Set your next page logic if necessary

    try {
      const articles = await this.mediaCenterService.getArticles(language, nextPage, term,yearFilter,catFilter);
      if (articles) {
        this.setState({ articles });
        console.log('Articles fetched:', articles);
      }
    } catch (error) {
      console.error('Error fetching Articles:', error);
    }

    try {
      const yearItems = await this.TagService.getTag(language, MediaCenterConstants.YearTagFolder,MediaCenterConstants.TagTemplate);
      if (yearItems) {
        this.setState({ yearItems });
        console.log('year fetched:', yearItems);
      }
    } catch (error) {
      console.error('Error fetching Years:', error);
    }

    try {
      const catItems = await this.TagService.getTag(language, MediaCenterConstants.ArticleCategoryTagsFolder,MediaCenterConstants.TagTemplate);
      if (catItems) {
        this.setState({ catItems });
        console.log('article cat fetched:', catItems);
      }
    } catch (error) {
      console.error('Error fetching article cat:', error);
    }
  };

  render() {
    const divStyle: React.CSSProperties = {
      width: '300px', // Set width here
      height: '300px', // Set height here
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
    const labelStyle={
      backgroundColor: 'lightblue',
      borderRadius: '20px', // Adjust for more or less curvature
      padding: '4px 8px', // Optional: add some padding
      
    };

    return (
      <>
        <div>
          <input
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleInputChange}
            placeholder="Search..."
          />
          <select value={this.state.yearFilter} onChange={this.handleYearFilterChange}>
            <option value="">Select a Year</option>
            {this.state?.yearItems?.results?.map((res) => (
              <option value={res.name}>{res.title.value}</option>
            ))}
          </select>

          <select value={this.state.catFilter} onChange={this.handleCatFilterChange}>
            <option value="">Select a category</option>
            {this.state?.catItems?.results?.map((res) => (
              <option value={res.name}>{res.title.value}</option>
            ))}
          </select>

          <div style={gridStyle}>
            {this.state?.articles?.results?.map((res) => (
              <div key={res.id} style={cardStyle}>
                {res?.ArticleCategoryTags?.targetItems.map((itm) => (
                  <span style={labelStyle}>{itm?.title?.value}</span>
                ))}
                <div><br /></div>
                {res?.Year?.targetItems.map((itm) => (
                  <span style={labelStyle}>{itm?.title?.value}</span>
                ))}
                <img
                  src={res?.image?.src}
                  alt={'' || ''}
                  style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
                />
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

export default SearchComponent;
