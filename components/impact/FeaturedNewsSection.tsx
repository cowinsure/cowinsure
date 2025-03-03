'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GiBullHorns } from 'react-icons/gi';
import Link from 'next/link';

interface ExtraData {
  url: string;
  date: string;
  headline: string;
}

interface BaseCard {
  id: number;
  name: string;
  category: string;
  image_url: string;
  extra_data: ExtraData;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface BaseCardApiResponse {
  status: string;
  message: string;
  data: BaseCard[];
}

interface BaseCategory {
  id: string;
  name: string;
  description: string;
}

interface BaseCategoryApiResponse {
  status: string;
  message: string;
  data: BaseCategory[];
}

const FeaturedNewsSection: React.FC = () => {
  const [newsData, setNewsData] = useState<BaseCard[]>([]);
  const [visibleItems, setVisibleItems] = useState(4);

  useEffect(() => {
    const fetchBaseCategories = async () => {
      try {
        const response = await fetch('http://52.66.196.177:8000/api/v1/base-categories/');
        const result: BaseCategoryApiResponse = await response.json();
        if (result.status === 'success') {
          const newsCategory = result.data.find(category => category.name === 'news');
          if (newsCategory) {
            fetchBaseCards(newsCategory.id);
          }
        }
      } catch (error) {
        console.error('Error fetching base categories:', error);
      }
    };

    const fetchBaseCards = async (categoryId: string) => {
      try {
        const response = await fetch(`http://52.66.196.177:8000/api/v1/base-category/${categoryId}/base-cards/`);
        const result: BaseCardApiResponse = await response.json();
        if (result.status === 'success') {
          setNewsData(result.data);
        }
      } catch (error) {
        console.error('Error fetching base cards:', error);
      }
    };

    fetchBaseCategories();
  }, []);

  const showMoreItems = () => {
    setVisibleItems((prev) => prev + 4);
  };

  return (
    <section className="w-full container mx-auto py-8 flex flex-col items-center space-y-10">
      <div className="max-w-4xl text-center">
        <GiBullHorns className='w-full text-3xl text-center text-green-700 mb-3' />
        <h2 className="text-xl font-bold text-[#687469]">strength and vision</h2>
        <h1 className="text-5xl font-bold text-[#334b35]">Featured News</h1>
      </div>
      <p className='text-center font-semibold text-gray-500 mt-10 text-2xl lg:max-w-[800px]'>
        At InsureCow, we are dedicated to transforming agriculture by connecting investors with smallholder farmers. Together, we cultivate sustainable growth, drive food security, and uplift communities, ensuring every investment contributes to a better future for all.
      </p>
      <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsData.slice(0, visibleItems).map((news, index) => (
          <Link href={news.extra_data.url} key={index} className="relative bg-white p-20 rounded-lg shadow-md overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-cover bg-center -right-full group-hover:right-0 transition-all duration-500">
              <Image
                src={news.image_url}
                alt={news.name}
                layout="fill"
                objectFit="cover"
                objectPosition='center'
                className="rounded-lg w-full h-full"
                unoptimized
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 rounded-md flex justify-center items-center"></div>
            <div className="relative z-10 group-hover:visible">
              <h3 className="text-2xl font-semibold mb-2 text-white">{news.extra_data.headline}</h3>
              <p className="text-white mb-4">{news.name}</p>
              <p className="text-white text-sm">{news.extra_data.date}</p>
            </div>
          </Link>
        ))}
      </div>
      {visibleItems < newsData.length && (
        <div className="text-center mt-6">
          <button
            onClick={showMoreItems}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
};

export default FeaturedNewsSection;
