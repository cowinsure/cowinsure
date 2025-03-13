'use client'
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Navigation } from 'swiper/modules';
import { GiBullHorns } from 'react-icons/gi'
import image from '../../../public/brandinggrassfieldimg.jpeg';

import Image from 'next/image';
// import Link from 'next/link';
// import { formatToBDT } from '@/utils/currencyFormatter';

interface ExtraData {
  color: string;
  cowId: string;
  price: number;
  teeth: number;
  gender: string;
  cowBreed: string;
  currentLiveWeight: number;
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
  // const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://52.66.196.177:8000/api/v1/portfolio/categories/');
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
        const response = await fetch(`http://52.66.196.177:8000/api/v1/portfolio/category/${categoryId}/portfolios/`);
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
        <h1 className="text-5xl font-bold text-[#334b35]">Our Stock</h1>

      </div>

    

      <div className='mt-10 w-full  container mx-auto flex flex-col gap-4 lg:flex-row items-start justify-center  mb-5 '>

        <Swiper
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          spaceBetween={50}
          loop={true}
          pagination={{ clickable: false }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Navigation, Autoplay]}
          className="  w-full h-[70vh]  lg:h-[450px]   justify-center items-center lg:justify-center lg:items-center "
        >
          {portfolios.map((portfolio, index) => (
            <SwiperSlide key={index}>

              {/* <Link key={portfolio.id} href={`/project/cow_details/${portfolio.id}`} className='bg-white shadow-lg rounded-lg border-bg-[#F6F4EC] border-2 flex flex-col items-start justify-start'>
                <div className="w-full lg:max-h-[500px] rounded-lg  relative flex flex-col lg:flex-col lg:justify-start lg:items-start">
                  <Image
                    src={portfolio.image_url}
                    alt={portfolio.name}
                    objectFit='cover'
                    className="rounded-lg object-cover w-full h-full "
                    width={400}
                    height={300}
                    unoptimized
                  />
                
                </div>

                <div className='flex flex-row lg:flex-row items-start justify-between w-full px-5 py-3'>
                  <div className='text-md font-semibold'>Cow ID</div>
                  <div className='text-green-700 text-lg font-bold'>{portfolio.extra_data.cowId}</div>
                </div>

                <div className='flex flex-row lg:flex-row items-start justify-between w-full px-5 py-3'>
                  <div className='text-md font-semibold'>Live Weight</div>
                  <div className='text-green-700 text-lg font-bold'> {portfolio.extra_data.currentLiveWeight} KG</div>
                </div>
                <div className='flex flex-row lg:flex-row items-start justify-between w-full px-5 py-3'>
                  <div className='text-md font-semibold'>Expected Final Weight</div>
                  <div className='text-green-700 text-lg font-bold'> {portfolio.extra_data.expectedFinalWeight} KG</div>
                </div>

                <div className='flex flex-row lg:flex-row items-start justify-between w-full px-5 py-3'>
                  <div className='text-md font-semibold'>Price</div>
                  <div className='text-green-700 text-lg font-bold'>{formatToBDT(portfolio.extra_data.price) }</div>
                </div>
              

            

                <div className="h-auto w-full flex flex-col justify-center items-end lg:justify-center lg:items-center bg-white rounded-md p-5">
                  <div className="relative text-end p-3 bg-green-100 text-green-800 font-bold rounded-md overflow-hidden group cursor-pointer">
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">Order Now</span>
                    <div className="absolute inset-0 bg-green-800 transform -translate-x-[105px] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
                  </div>
                </div>
              </Link> */}
                <div className='relative   w-full flex-col h-auto  justify-center items-center group bg-gray-800 rounded-lg'>
                                  <div className='relative h-[400px]  rounded-lg bg-black   overflow-hidden'>
                                      <div className='absolute h-auto rounded-lg inset-0 bg-contain left-0 group-hover:-left-12 transition-all duration-500'>
                                          <Image
                                              src={portfolio.image_url}
                                              alt='cover'
                                              layout="fill"
                                              objectFit="cover"
                                              objectPosition='center'
                                              className="rounded-lg w-full h-[500px]"
                                              unoptimized
                                              priority
                                          />
                                          <div className='absolute rounded-lg bg-green-300 bg-opacity-20 top-[-100%] z-30 right-0 w-full h-full group-hover:top-0 transition-all duration-300 ease-in-out overflow-hidden'>
              
                                          </div>
              
              
                                      </div>
              
              
              
                                  </div>
                                  <div className=' absolute bottom-0 left-0 right-0 z-50  mx-5  overflow-hidden group-hover:overflow-visible '>
                                      <div className='relative z-20 flex flex-col h-[100px] justify-center items-center  bg-green-800 rounded-t-lg text-2xl font-bold text-white'>
                                      <div className='flex flex-row lg:flex-row items-center justify-start text-center w-full px-4  py-2'>
                                        
                                          <div className='text-white text-xl font-bold'>1,20,000 TK</div>
                                      </div> 
              
                                      <div className='w-full flex flex-row lg:flex-col items-center justify-center   px-2  '>
                                      <div className='flex flex-row lg:flex-row items-start justify-around  w-full  gap-4 px-2  '>
                                          <div className='flex-1 text-white text-xs '>Live (KG)</div>
                                          <div className= ' flex-1 text-white text-xs font-bold'>600KG</div>
                                      </div>  
              
                                      <div className='flex flex-row lg:flex-row items-start justify-around w-full  gap-4 px-2 '>
                                          <div className='flex-1 text-xs text-white font-semibold'>Expected(KG)</div>
                                          <div className='flex-1 text-white text-xs font-bold'>800KG</div>
                                      </div>
              
              
              
                                      </div>
                                      
                                   
              
              
                                          {/* <div className='absolute invisible bottom-[100%] z-10 bg-black w-full group-hover:visible group-hover:bottom-[-31px] transition-all duration-500'>hellow</div> */}
                                      </div>
              
                                      <div className='rounded-b-lg overflow-hidden absolute left-0 cursor-pointer  right-0  invisible bottom-[0%] bg-transparent   group-hover:visible group-hover:bottom-[-31px]    transition-all duration-500
                                          flex flex-col  justify-center items-center text-black text-2xl font-bold'>
              
                                          <div className='w-full group-hover:bg-green-900 group-hover:text-center text-white'> Buy Now</div>
              
                                      </div>
              
                                  </div>
              
                                  {/* <div className='w-0 group-hover:w-full transition-all duration-500 border-2 border-transparent group-hover:border-green-700'></div> */}
              
              
              
              
                              </div>
           
           

           
            
            </SwiperSlide>
          ))}
        </Swiper>







      </div>


    </section>
  )
}

export default CowPurchaseSection

