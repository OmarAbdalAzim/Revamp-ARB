import React, { useEffect, useState } from 'react';
import { MediaCenterConstants } from 'src/configurations/Constants';
import { GraphQlAPI } from 'src/pages/api/graphQl/Services/GraphQlAPI';
import MediaCenter_Query from 'src/pages/api/graphQl/MediaCenter/MediaCenterQuery';
import Tag_Query from 'src/pages/api/graphQl/Common/TagQuery';

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [articles, setArticles] = useState<any[]>([]);
  const [yearItems, setYearItems] = useState<any[]>([]);
  const [catItems, setCatItems] = useState<any[]>([]);

  const APIService = new GraphQlAPI();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    handleSearch(value, yearFilter, catFilter);
  };

  const handleYearFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setYearFilter(value);
    handleSearch(searchTerm, value, catFilter);
  };

  const handleCatFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCatFilter(value);
    handleSearch(searchTerm, yearFilter, value);
  };

  // Fetch data on component mount or when filters change
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const yFilter = urlParams.get('yearFilter');
    const cFilter = urlParams.get('catFilter');

    if (query) setSearchTerm(query);
    if (yFilter) setYearFilter(yFilter);
    if (cFilter) setCatFilter(cFilter);

    handleSearch(query, yFilter, cFilter);
  }, []);

  const handleSearch = async (
    term: string | null,
    yearFilter: string | null,
    catFilter: string | null
  ) => {
    // Update URL with search parameters
    const url = new URL(window.location.toString());
    term ? url.searchParams.set('query', term) : url.searchParams.delete('query');
    yearFilter
      ? url.searchParams.set('yearFilter', yearFilter)
      : url.searchParams.delete('yearFilter');
    catFilter ? url.searchParams.set('catFilter', catFilter) : url.searchParams.delete('catFilter');
    window.history.pushState({}, '', url);

    const language = 'en';
    const nextPage = '';

    try {
      const articles = await APIService.getItems(
        MediaCenter_Query(language, nextPage, term, yearFilter, catFilter)
      );
      if (articles) setArticles(articles);
    } catch (error) {
      console.error('Error fetching Articles:', error);
    }

    try {
      const yearItems = await APIService.getItems(
        Tag_Query(language, MediaCenterConstants.YearTagFolder)
      );
      if (yearItems) setYearItems(yearItems);
    } catch (error) {
      console.error('Error fetching Years:', error);
    }

    try {
      const catItems = await APIService.getItems(
        Tag_Query(language, MediaCenterConstants.ArticleCategoryTagsFolder)
      );
      if (catItems) setCatItems(catItems);
    } catch (error) {
      console.error('Error fetching Categories:', error);
    }
  };

  return (
    <div className="px-6 flex flex-col gap-4">
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search..."
          className="p-2 border border-solid"
        />
        <select value={yearFilter} onChange={handleYearFilterChange}>
          <option value="">Select a Year</option>
          {yearItems?.results?.map((res: any) => (
            <option key={res.name} value={res.name}>
              {res.title.value}
            </option>
          ))}
        </select>
        <select value={catFilter} onChange={handleCatFilterChange}>
          <option value="">Select a category</option>
          {catItems?.results?.map((res: any) => (
            <option key={res.name} value={res.name}>
              {res.title.value}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-12 gap-5">
        {articles?.results?.map((res: any) => (
          <div key={res.id} className="border col-span-3 p-4 flex flex-col items-center">
            <div className='space-x-2'>
              {res?.ArticleCategoryTags?.targetItems.map((itm: any) => (
                <span key={itm?.title?.value} className="p-2 bg-blue-300 rounded-md">
                  {itm?.title?.value}
                </span>
              ))}
            </div>
            <div>
              <br />
            </div>
            {res?.Year?.targetItems.map((itm: any) => (
              <span key={itm?.title?.value}>{itm?.title?.value}</span>
            ))}
            <img src={res?.image?.src} alt="" className="width-full h-auto rounded-2xl" />
            <h3>
              <a href={res?.url?.path}>{res.title.value}</a>
            </h3>
            <p>{res?.content?.value}</p>
            <p>{res?.PublishedDate?.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
