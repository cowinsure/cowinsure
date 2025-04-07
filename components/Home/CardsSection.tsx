'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GiBullHorns } from 'react-icons/gi';

interface ExtraData{
  url: string;
  heading: string;
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


const CardsSection: React.FC = () => {
  const [whatWeOfferData, setWhatWeOfferData] = useState<BaseCard[]>([]);

  useEffect(()=>{
    const fetchBaseCategories = async()=>{
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/base-categories/`);
        const result: BaseCategoryApiResponse = await response.json();
        if (result.status==='success'){
          const whatWeOfferCategory = result.data.find(category => category.name === 'What We Offer - Home Section');
          if(whatWeOfferCategory){
            fetchBaseCards(whatWeOfferCategory.id);
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
          setWhatWeOfferData(result.data);
        }
      } catch(error){
        console.error('Error fetching base cards: ',error);
      }
    };
    fetchBaseCategories();

    },
  []);  


  return (

    <>


     <div className=" flex flex-col justify-center items-center  text-center w-full mb-10">
            <GiBullHorns className='lg:w-auto w-full text-2xl text-start text-green-700 mb-2' />
            <h2 className="text-xl font-bold text-[#687469] text-start mb-3">Services</h2>
            <h1 className="lg:text-5xl text-2xl min-w-[150px] font-bold text-[#334b35]  text-start">What we offer</h1>
          </div>
    
          <div className='p-5  h-auto lg:h-auto    flex justify-center items-center overflow-auto lg:items-center lg:justify-center flex-col mt-20 mb-28 lg:mt-20 lg:mb-28 lg:flex-row w-full lg:w-auto gap-8  lg:px-24'>
          {whatWeOfferData.map((item,index)=>(
            <Link href={item.extra_data.url}  key={index} className='rounded-md  relative h-[300px] lg:h-[300px] w-full group cursor-pointer'>
            <Image
              src={item.image_url}
              alt={item.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
    
            <div className='absolute inset-0 rounded-lg group-hover:bg-black/50 transition duration-500 bg-opacity-50 flex justify-start items-start'></div>
            <div className='absolute inset-0 lg:bottom-10 flex justify-center items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              
                <div className='bg-green-900 text-white p-4 rounded-lg cursor-pointer'>Learn More</div>
            
            </div>
            <div className='absolute inset-0 top-16 left-10 rounded-lg   bg-opacity-50 flex justify-start items-start'>
              <div className='flex flex-col space-y-4 text-start group-hover:opacity-15'>
                <h2 className='text-white text-xl font-light italic'>{item.extra_data.heading}</h2>
                <h2 className='text-white text-2xl lg:font-3xl font-bold'>{item.name}</h2>
              </div>
            </div>
          </Link>
      
    ))}
      
    </div>
 
    
     </>
  );
};

export default CardsSection;
