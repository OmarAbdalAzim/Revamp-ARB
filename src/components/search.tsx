import React, { Component } from 'react';
import { BlogServiceProvider } from 'src/Services/BlogService';
import { CategoryServiceProvider } from 'src/Services/CategoryService';

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      categoryFilter: '', // State for the categoryFilter
      blogs: [],
      categories: [],
    };
    this.blogService = new BlogServiceProvider();
    this.CategoryService = new CategoryServiceProvider();
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({ searchTerm: value }, () => {
      this.handleSearch(value, this.state.categoryFilter);
    });
  };
  handlecategoryFilterChange = (event) => {
    const value = event.target.value;
    this.setState({ categoryFilter: value }, () => {
      this.handleSearch(this.state.searchTerm, value);
    });
  };

  componentDidMount() {
    // Get the search term from the query string when the component mounts
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const catFilter = urlParams.get('categoryFilter');
    if (query) {
      this.setState({ searchTerm: query });
    }
    if (catFilter) {
      this.setState({ categoryFilter :catFilter});
    }
    this.handleSearch(query,catFilter);
  }

  handleSearch = async (term, categoryFilter) => {
    console.log('Searching for:', term, 'with categoryFilter:', categoryFilter);

    // Update the URL with the search term
    const url = new URL(window.location);
    if (term) {
      url.searchParams.set('query', term);
    } else {
      url.searchParams.delete('query'); // Remove the categoryFilter if not selected
    }


    if (categoryFilter) {
      url.searchParams.set('categoryFilter', categoryFilter);
    } else {
      url.searchParams.delete('categoryFilter'); // Remove the categoryFilter if not selected
    }
    window.history.pushState({}, '', url);

    const language = 'en'; // Set your language here
    const nextPage = ''; // Set your next page logic if necessary

    try {
      const blogs = await this.blogService.getBlogs(language, nextPage, term,categoryFilter);
      if (blogs) {
        this.setState({ blogs });
        console.log('Blogs fetched:', blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }

    try {
      const categories = await this.CategoryService.getCategories(language);
      if (categories) {
        this.setState({ categories });
        console.log('categories fetched:', categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
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

    return (
      <>
        <div>
          <input
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleInputChange}
            placeholder="Search..."
          />
          <select value={this.state.categoryFilter} onChange={this.handlecategoryFilterChange}>
            <option value="">Select a categoryFilter</option>
            {this.state?.categories?.results?.map((res) => (
              <option value={res.name}>{res.title.value}</option>
            ))}
          </select>

          <div style={gridStyle}>
            {this.state?.blogs?.results?.map((res) => (
              <div key={res.id} style={cardStyle}>
                <img
                  src={res?.image?.src}
                  alt={'' || ''}
                  style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
                />
                <h3>
                  <a href="#!">{res.title.value}</a>
                </h3>
                <p>{res.content.value}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default SearchComponent;
