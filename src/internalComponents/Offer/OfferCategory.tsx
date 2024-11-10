import React, { useEffect, useState } from 'react';
import { CommponentSettings } from 'src/configurations/Constants';
import { GraphQlAPI } from 'src/pages/api/graphQl/Services/GraphQlAPI';
import Offers_Category_Query from 'src/pages/api/graphQl/Offer/OfferCategoryQuery';
import Offer from './Offer';

const OfferCategory: React.FC = () => {
  const [offerCategory, setOfferCategory] = useState<any>(null);
  const APIService = new GraphQlAPI();

  // Function to fetch offer categories
  const handleSearch = async () => {
    const language = 'en';
    try {
      const offerCategory = await APIService.getItems(
        Offers_Category_Query(language, '', CommponentSettings.SuggestedOfferCategoryPageSize)
      );
      if (offerCategory) {
        setOfferCategory(offerCategory);
        console.log('offerCategory fetched:', offerCategory);
      }
    } catch (error) {
      console.error('Error fetching offerCategory:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="flex flex-col w-full py-5 px-8 gap-5 bg-white">
      {/* Heading */}
      <h1 className="text-center text-2xl font-bold text-gray-800">Suggested Offers</h1>
      <br />
      {/* Offers List */}
      {offerCategory?.results?.map((res: any) => (
        <div key={res.id} className="w-full">
          {/* Card Container */}
          <div className="flex flex-col border border-solid border-gray-300 rounded-md shadow-md overflow-hidden">
            {/* Image Section */}
            <div className="flex flex-col">
              <img
                src={res?.OfferSliderImage?.src}
                alt={res.title.value}
                className="bg-cover bg-slate-400 h-60"
              />
              {/* Offer Details */}
              <div className="p-5 flex flex-col gap-2">
                <span className="text-gray-500">{res?.children?.total} Offers</span>
                <h3 className="font-semibold text-gray-800">
                  <a href={res?.url?.path} className="hover:text-cyan-600 transition-colors">
                    {res.title.value}
                  </a>
                </h3>
                <p className="text-gray-600">{res?.Content?.value}</p>
                <div className="text-center my-5">
                  <a href={res?.url?.path}>
                    <button className="text-cyan-600 hover:underline">View All</button>
                  </a>
                </div>
              </div>
            </div>

            {/* Custom Offer Component */}
            <div className="p-4 border-gray-300">
              <Offer id={res.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OfferCategory;
