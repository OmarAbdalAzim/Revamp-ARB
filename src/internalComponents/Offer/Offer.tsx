import React, { useEffect, useState } from 'react';
import { GraphQlAPI } from 'src/pages/api/graphQl/Services/GraphQlAPI';
import ALL_Offers from 'src/pages/api/graphQl/Offer/OfferQuery';

interface OfferProps {
  id: string;
}

const Offer: React.FC<OfferProps> = ({ id }) => {
  const [offers, setOffers] = useState<any>(null);
  const APIService = new GraphQlAPI();

  // Function to fetch offers
  const handleSearch = async () => {
    const language = 'en';
    try {
      const fetchedOffers = await APIService.getItems(ALL_Offers(id, language));
      if (fetchedOffers) {
        setOffers(fetchedOffers);
        console.log('Offers fetched:', fetchedOffers);
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    handleSearch();
  }, [id]);


  return (
    <div className="grid grid-cols-12 gap-4 p-5">
      {offers?.results?.map((res: any) => (
        <div
          key={res.id}
          className="col-span-3 border border-gray-300 rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow duration-300"
        >
          <span className="block bg-cyan-100 text-cyan-900 text-sm font-semibold py-1 px-2 rounded-md mb-3">
            {res?.ExpiryDate?.value}
          </span>
          <img
            src={res?.CardImage?.src}
            alt="Card"
            className="w-20 h-20 mx-auto mb-4 object-cover rounded-full border border-gray-200"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{res.title.value}</h3>
          <p className="text-gray-600 text-center mb-4">{res.SubTitle.value}</p>
          <a href={res?.url.path} className="block">
            <button className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition-colors duration-200">
              Learn more
            </button>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Offer;
