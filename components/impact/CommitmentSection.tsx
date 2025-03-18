'use client'
import React, { useState, useEffect } from 'react';
import { GiBullHorns } from 'react-icons/gi';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ExtraData {
  title: string;
  short_description: string;
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

const CommitmentSection: React.FC = () => {
const [commitmentData, setCommitmentData] = useState<BaseCard[]>([]);

  useEffect(() => {
    const fetchBaseCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/base-categories/`);
        const result: BaseCategoryApiResponse = await response.json();
        if (result.status === 'success') {
          const commitmentCategory = result.data.find(category => category.name === 'commitment');
          if (commitmentCategory) {
            fetchBaseCards(commitmentCategory.id);
          }
        }
      } catch (error) {
        console.error('Error fetching base categories:', error);
      }
    };

    const fetchBaseCards = async (categoryId: string) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/base-category/${categoryId}/base-cards/`);
        const result: BaseCardApiResponse = await response.json();
        if (result.status === 'success' && result.data.length > 0) {
          setCommitmentData(result.data);
        }
      } catch (error) {
        console.error('Error fetching base cards:', error);
      }
    };

    fetchBaseCategories();
  }, []);

  return (
    <div className='container mx-auto flex flex-col justify-center items-center lg:flex-col lg:justify-center lg:items-center py-20'>
      <div className="max-w-4xl text-center">
        <GiBullHorns className='w-full text-3xl text-center text-green-700 mb-3' />
        <h2 className="text-xl font-bold text-[#687469]">strength and vision</h2>
        <h1 className="text-5xl font-bold text-[#334b35]">Our Commitment</h1>
      </div>

      <p className='text-center font-semibold text-gray-500 mt-10 text-2xl lg:max-w-[800px]'>
        At InsureCow, we are dedicated to transforming agriculture by connecting investors with smallholder farmers. Together, we cultivate sustainable growth, drive food security, and uplift communities, ensuring every investment contributes to a better future for all.
      </p>

      {commitmentData && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className='container mx-auto mt-10 flex flex-col justify-center items-center gap-2 lg:gap-14 lg:flex-row lg:justify-center lg:items-center'
        >
          {commitmentData.map((data) => (
            <motion.div
              key={data.id}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className='mt-20 lg:w-1/3 sm:w-1/2 md:w-1/2 cursor-pointer shadow-lg rounded-lg flex flex-col items-center justify-center'
            >
              <div className="rounded-lg overflow-hidden relative h-[400px] lg:h-[400px]">
                <Image
                  src={data.image_url}
                  alt={data.name}
                  objectFit='cover'
                  className="rounded-lg object-cover w-full h-full overflow-clip"
                  width={800}
                  height={600}
                  priority
                />
                <div className='container bg-black bg-opacity-50 absolute w-full top-0 bottom-0 flex flex-col items-end lg:flex-col lg:space-y-2 lg:justify-end lg:items-end justify-end'>
                  <div className='flex flex-col lg:flex-col items-start  w-full  space-y-4 mb-10 p-5'>
                    <div className='w-full text-start font-bold text-4xl text-white'>{data.extra_data.title}</div>
                    <div className='text-white font-bold '>{data.extra_data.short_description}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default CommitmentSection;
