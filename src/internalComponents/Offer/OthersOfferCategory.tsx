import React, { useEffect, useState } from 'react';
import Offer from './Offer';
import { CommponentSettings } from 'src/configurations/Constants';
import { GraphQlAPI } from 'src/pages/api/graphQl/Services/GraphQlAPI';
import Offers_Category_Query from 'src/pages/api/graphQl/Offer/OfferCategoryQuery';

const OthersOfferCategory: React.FC = () => {
  const [offerCategory, setOfferCategory] = useState<any>(null);
  const APIService = new GraphQlAPI();

  // Function to fetch other offer categories
  const handleSearch = async () => {
    const language = 'en';
    try {
      const offerCategory = await APIService.getItems(
        Offers_Category_Query(
          language,
          CommponentSettings.SuggestedOfferCategoryItemSkip3,
          CommponentSettings.OtherOfferCategoryPageSize
        )
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
    <div className="flex flex-col w-full py-5 px-8 gap-5">
      <h1 className="text-center">Other Offers</h1>
      <br />
      {offerCategory?.results?.map((res: any) => (
        <div key={res.id} className="w-full py-0">
          <div className="flex flex-col border border-solid border-[#ccc] rounded-md">
            <div className='flex flex-col'>
              <img
                src={res?.CardImage?.src}
                alt={res.title.value}
                className="border border-solid bg-cover bg-slate-400 h-60"
              />
              <div className="p-5 flex flex-col gap-2">
                <span>{res?.children?.total} Offers</span>
                <h3>
                  <a href={res?.url?.path}>{res.title.value}</a>
                </h3>
                <p>{res?.Content?.value}</p>
                <div className="text-center my-5">
                  <a href={res?.url?.path}>
                    <button className="text-blue-500">View All</button>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <Offer id={res.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OthersOfferCategory;
