'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';

import React, { useEffect, useState } from 'react'
import { GiBullHorns } from 'react-icons/gi'

interface ExtraData{
    value: string;
    description: string;
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

const ImpactHighlightSection: React.FC = () => {
    const [impactHighlightSection, setImpactHighlightSection] = useState<BaseCard[]>([]);
      useEffect(()=>{
        const fetchBaseCategories = async()=>{
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/base-categories/`);
            const result: BaseCategoryApiResponse = await response.json();
            if (result.status==='success'){
              const impactHighlightSectionCategory = result.data.find(category => category.name === 'Impact Scoring');
              if(impactHighlightSectionCategory){
                fetchBaseCards(impactHighlightSectionCategory.id);
              }
            }
          }catch(error){
            console.error("Error fetching base categories: ",error);
          }
        };
        const fetchBaseCards = async(categoryId: string) => {
          try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/base-category/${categoryId}/base-cards/`);
            const result: BaseCardApiResponse = await response.json();
            if(result.status === 'success'){
              setImpactHighlightSection(result.data);
            }
          } catch(error){
            console.error('Error fetching base cards: ',error);
          }
        };
        fetchBaseCategories();
    
        },
      []);  


    return (
        <div className='container mx-auto flex flex-col justify-center items-center lg:flex-col lg:justify-center lg:items-center py-20'>

            <div className="max-w-4xl text-center">
                <GiBullHorns className='w-full text-3xl text-center text-green-700 mb-3' />

                <h2 className="text-xl font-bold text-[#687469]">Impact Scoring</h2>
                <h1 className="text-5xl font-bold text-[#334b35]">InsureCow Impact</h1>

            </div>

            <p className='text-center font-semibold text-gray-500 mt-10 text-2xl lg:max-w-[80vh]'>
                While ensuring access to finance, resources, and markets, we remain driven by our mission to place simplified agriculture in the hands of every farmer. 

            </p>

            <div className='rounded-lg flex flex-col justify-center items-center gap-2 lg:gap-14 lg:flex-row lg:justify-center lg:items-center p-2'>


            {impactHighlightSection.map((item,index)=>(
                <>
                <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }} // Initial state (hidden)
                whileInView={{ opacity: 1, x: 0 }} // Animate when in view
                viewport={{ once: true }} // Only animate once
                transition={{ duration: 0.3 }}
                className="mt-20 w-auto max-w-md md:max-w-lg lg:max-w-xl cursor-pointer shadow-lg rounded-lg flex flex-col items-center justify-center"
              >
                {/* Image container */}
                <div className="relative w-auto h-56 sm:h-72 md:h-80 lg:h-[45vh] overflow-hidden rounded-lg">
                  <Image
                    src={item.image_url}
                    alt="Profile"
                    height={300}
                    width={200}
                    objectFit="cover" // legacy prop, adapt if you're on Next 13+
                    className="rounded-lg object-cover w-full h-full"
                  />
                  {/* Overlay for text */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-end justify-end p-4 sm:p-5">
                    <div className="w-full text-start font-bold text-2xl sm:text-3xl text-white">
                      {item.extra_data.value}
                    </div>
                    <div className="w-full text-start font-bold text-xl sm:text-2xl text-white">
                      {item.name}
                    </div>
                    <div className="w-auto text-white font-bold text-sm sm:text-base pb-4">
                      {item.extra_data.description}
                    </div>
                  </div>
                </div>
              </motion.div>
                </>
            ))} 
            

            </div>



        </div>
    )
}
export default ImpactHighlightSection
