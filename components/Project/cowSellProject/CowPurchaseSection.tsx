'use client'
import React, { useEffect, useMemo, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import { GiBullHorns } from 'react-icons/gi'


import Image from 'next/image';

import Link from 'next/link';
import { formatToBDT } from '@/utils/currencyFormatter';

interface ExtraData {
  color: string;
  cowId: string;
  askingPrice: number;
  teeth: number;
  gender: string;
  cowBreed: string;
  weightKg: number;
  expectedFinalWeight: number;
}

interface Portfolio {
  id: string;
  name: string;
  location: string;
  investment_value: string;
  currency: string;
  investment_period: string;
  expected_return_min: string;
  expected_return_max: string;
  total_return_min: string;
  total_return_max: string;
  image_url: string;
  description: string;
  extra_data: ExtraData;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: Portfolio[];
}

interface Category {
  id: string;
  name: string;
  description: string;
}

interface CategoryApiResponse {
  status: string;
  message: string;
  data: Category[];
}

const CowPurchaseSection = () => {

  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const memoizedPortfolios = useMemo(() => portfolios, [portfolios]);
  // const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/portfolio/categories/`);

        const result: CategoryApiResponse = await response.json();
        if (result.status === 'success') {
          // setCategories(result.data);
          const cowSellCategory = result.data.find(category => category.name === 'Cow for sell');
          if (cowSellCategory) {
            fetchPortfolios(cowSellCategory.id);
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchPortfolios = async (categoryId: string) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/portfolio/category/${categoryId}/portfolios/`);
        const result: ApiResponse = await response.json();
        if (result.status === 'success') {
          setPortfolios(result.data);
        }
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      }
    };

    fetchCategories();
  }, []);

  return (

    <section className="pb-10    flex flex-col  lg:flex-col lg:justify-center  lg:items-center items-center justify-center bg-[#F6F4EC] pt-10">
      <div className="max-w-4xl text-center">
        <GiBullHorns className='w-full text-3xl text-center text-green-700 mb-3' />

        <h2 className="text-xl font-bold text-[#687469]">Order Now</h2>
        <h1 className="text-5xl font-bold text-[#334b35]">Our Livestock</h1>

      </div>
        <div className=' mt-10 w-full h-auto container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-10 mb-5'>
          {memoizedPortfolios.map((portfolio) => (


            <div key={portfolio.id}>
              <div  className='relative lg:w-[300px]'>
              <div className='relative   w-full flex-col h-auto  justify-center items-center group bg-gray-800 rounded-lg'>
                                  <div className='relative h-[400px]  rounded-lg bg-black   overflow-hidden'>
                                      <div className='absolute h-auto rounded-lg inset-0 bg-contain left-0 group-hover:-left-12 transition-all duration-500'>
                                          <Image
                                              src={portfolio.image_url}
                                              alt='cover'
                                              layout="fill"
                                              objectFit="cover"
                                         
                                              objectPosition='center'
                                              quality={50}
                                              loading="eager"
                                              // unoptimized = {true}
                                              priority={true}
                                              className="rounded-lg w-full h-[500px]"
                                          />
                                          <div className='absolute rounded-lg bg-green-300 bg-opacity-20 top-[-100%] z-30 right-0 w-full h-full group-hover:top-0 transition-all duration-300 ease-in-out overflow-hidden'>
              
                                          </div>
              
              
                                      </div>
              
              
              
                                  </div>
                                  <div className=' absolute bottom-0 left-0 right-0 z-30  mx-5  overflow-hidden group-hover:overflow-visible '>
                                      <div className='relative z-20 flex flex-col h-[100px] justify-center items-center  bg-green-800 rounded-t-lg text-2xl font-bold text-white'>
                                      <div className='flex flex-row lg:flex-row items-center justify-start text-center w-full px-4  py-2'>
                                        
                                          <div className='text-white text-xl font-bold'>{formatToBDT(portfolio.extra_data.askingPrice)} TK</div>
                                      </div> 
              
                                      <div className='w-full flex flex-row lg:flex-col items-center justify-center   px-2  '>
                                      <div className='flex flex-row lg:flex-row items-start justify-around  w-full  gap-4 px-2  '>
                                          <div className='flex-1 text-white text-xs '>Live (KG)</div>
                                          <div className= ' flex-1 text-white text-xs font-bold'>{portfolio.extra_data.weightKg}</div>
                                      </div>  
              
                                  
              
              
              
                                      </div>
                                      
                                   
              
              
                                          {/* <div className='absolute invisible bottom-[100%] z-10 bg-black w-full group-hover:visible group-hover:bottom-[-31px] transition-all duration-500'>hellow</div> */}
                                      </div>
              
                                      {/* <Link href={`/cow_details/${portfolio.id}`}> */}
                                      <Link href={`cow_details/${portfolio.id}`} className='rounded-b-lg overflow-hidden absolute left-0 cursor-pointer  right-0  invisible bottom-[0%] bg-transparent   group-hover:visible group-hover:bottom-[-31px]    transition-all duration-500
                                          flex flex-col  justify-center items-center text-black text-2xl font-bold'>
              
                                          <div className='w-full group-hover:bg-green-900 group-hover:text-center text-white'> Buy Now</div>
              
                                      </Link>
                                      {/* </Link> */}
              
                                  </div>
              
                                  {/* <div className='w-0 group-hover:w-full transition-all duration-500 border-2 border-transparent group-hover:border-green-700'></div> */}
              
              
              
              
                              </div>

      
              </div>
            </div>
          ))}
        </div>
    



    </section>
  )
}

export default CowPurchaseSection

