'use client'
import React, { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Navigation } from 'swiper/modules';
import { GiBullHorns } from 'react-icons/gi'

import Image from 'next/image';
// import Link from 'next/link';
// import { formatToBDT } from '@/utils/currencyFormatter';

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

const HomeInvestmentSection = () => {

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
          const cowSellCategory = result.data.find(category => category.name === 'Short Term Investment');
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

    <section className="pb-10 h-auto lg:h-auto  flex flex-col  lg:flex-col lg:justify-start  lg:items-center items-center justify-center bg-[#F6F4EC] pt-10">
      <div className="max-w-4xl text-center">
        <GiBullHorns className='w-full text-3xl text-center text-green-700 mb-3' />

        <h2 className="text-xl font-bold text-[#687469]">Invest Now</h2>
        <h1 className="text-5xl font-bold text-[#334b35]">Our Projects</h1>

      </div>

      <div className='mt-10 w-full h-auto container mx-auto flex flex-col gap-4 lg:flex-row items-start justify-center  mb-5 '>

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
          className=" w-full lg:h-auto justify-center items-center lg:justify-center lg:items-center"
        >
          {memoizedPortfolios.map((portfolio) => (
            <SwiperSlide key={portfolio.id}>


                           <div className='relative flex-col w-[300px] h-[600px]  justify-center items-center group  bg-[#263c28] rounded-lg'>
              
              <div className='relative h-auto round-lg '>
                  <div className='relative h-[200px]  rounded-t-lg   overflow-hidden'>
                      <div className='absolute h-full rounded-t-lg inset-0 bg-contain left-0 group-hover:-left-4 transition-all duration-700'>
                          <Image
                        src={portfolio.image_url}
                        alt='cover'
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                        quality={50}
                        loading="eager"
                        priority
                          />
                          <div className='absolute rounded-t-lg bg-green-800 bg-opacity-40 top-0 left-[50%] transform -translate-x-[50%] w-0 h-full group-hover:w-full transition-all duration-500 ease-in-out overflow-hidden'>
                          </div>
                      </div>
              
              
              
                  </div>
                  {/* project title */}
                  <div className=' absolute bottom-[-55px] left-0 right-0 z-50  mx-5  overflow-hidden group-hover:overflow-visible flex justify-center items-center'>
                      <div className='relative z-20 flex flex-col h-[100px] w-[100px] justify-center items-center bg-[#263c28] rounded-full text-2xl font-bold text-white'>
                          <span className='z-50 text-yellow-600 group-hover:text-white transition-all duration-500'>Project</span>
                          <span className='z-50'>101</span>
              
                          <div className='absolute inset-0 flex justify-center items-center'>
                              <div className='w-0 h-0 z-30 bg-yellow-500 rounded-full group-hover:w-full group-hover:h-full  transition-all duration-500'></div>
                          </div>
                          {/* <div className='absolute invisible bottom-[100%] z-10 bg-black w-full group-hover:visible group-hover:bottom-[-31px] transition-all duration-500'>hellow</div> */}
                      </div>
              
              
                  </div>
                  <div className=' absolute bottom-[-60px] left-0 right-0 z-30  mx-5  overflow-hidden group-hover:overflow-visible flex justify-center items-center'>
                      <div className='relative z-20 flex flex-col h-[100px] w-[100px] justify-center items-center bg-[#2b442d] rounded-full text-2xl font-bold text-white'>
              
                          {/* <div className='absolute invisible bottom-[100%] z-10 bg-black w-full group-hover:visible group-hover:bottom-[-31px] transition-all duration-500'>hellow</div> */}
                      </div>
              
              
                  </div>
              </div>
              <div className='w-0 shadow-lg group-hover:w-full transition-all duration-500 border-2 border-transparent group-hover:border-yellow-400 mx-auto'></div>
              <div className='mt-10'>
              
                  {/* period */}
                  <div className='mt-20 text-center p-2 text-white'>
                  <h1 className="lg:text-2xl text-xl min-w-[150px] mb-5  font-bold text-white  text-start">{portfolio.description}</h1>
              
              
                  <p className='text-start font-semibold   text-md '>
                      {portfolio.description}
              
                          </p>
                  </div>
              
               
              </div>
              
              
              
              </div>
            </SwiperSlide>
          ))}
        </Swiper>



        {/* <Link  href="/project" className='lg:w-1/4 cursor-pointer bg-white shadow-lg h-100 rounded-lg border-bg-[#F6F4EC] border-2  flex flex-col items-center justify-center '>
            <div className="w-full rounded-lg overflow-hidden relative group">
            <Image
              src={sampleCow}
              alt="Profile"
              objectFit='cover'
              className="rounded-lg object-cover w-full h-full overflow-clip"
            />
            <div className='container absolute w-full h-full bottom-0 flex flex-col items-start lg:flex-col lg:space-y-2 lg:justify-end lg:items-end justify-start bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300'>
              <div className='flex flex-row lg:flex-row items-end justify-between w-full px-5'>
              <div className='text-xl text-white font-semibold'>Cow-10</div>
              <div className='text-white text-xl font-bold'>$ 10,000 BDT</div>
              </div>
              <div className='flex flex-row lg:flex-row items-end justify-between w-full px-5 py-2'>
              <div className='text-white text-xl font-semibold'>Location</div>
              <div className='text-white text-xl font-bold'>Bogura</div>
              </div>
            </div>
            </div>

          <div className='flex flex-row lg:flex-row   items-start justify-between w-full px-5 py-3'>
            <div className=' text-xl font-semibold' >period</div>
            <div className='text-green-700 text-xl font-bold '>6 Month</div>
          </div>

          <div className='flex flex-row lg:flex-row   items-start justify-between w-full px-5 py-3'>
            <div className=' text-xl font-semibold'>Rertun</div>
            <div className='text-green-700 text-xl font-bold'>22% - 6.7%</div>
          </div>

          <div className='flex flex-row lg:flex-row   items-start justify-between w-full px-5 py-3'>
            <div className=' text-xl font-semibold'>Total Return</div>
            <div className='text-xl font-bold '>$10,375 - $10,425</div>
          </div>


          <div className="h-auto w-full flex flex-col justify-center items-end lg:justify-center lg:items-center bg-white rounded-md p-5">
            <div className="relative text-end p-3 bg-green-100 text-green-800 font-bold rounded-md overflow-hidden group cursor-pointer">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Invest Now</span>
              <div className="absolute inset-0 bg-green-800 transform -translate-x-[105px] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
            </div>
          </div>
        </Link>
       

       
        <Link  href="/project" className='lg:w-1/4 cursor-pointer bg-white shadow-lg h-100 rounded-lg border-bg-[#F6F4EC] border-2  flex flex-col items-center justify-center '>
            <div className="w-full rounded-lg overflow-hidden relative group">
            <Image
              src={sampleCow}
              alt="Profile"
              objectFit='cover'
              className="rounded-lg object-cover w-full h-full overflow-clip"
            />
            <div className='container absolute w-full h-full bottom-0 flex flex-col items-start lg:flex-col lg:space-y-2 lg:justify-end lg:items-end justify-start bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300'>
              <div className='flex flex-row lg:flex-row items-end justify-between w-full px-5'>
              <div className='text-xl text-white font-semibold'>Cow-10</div>
              <div className='text-white text-xl font-bold'>$ 10,000 BDT</div>
              </div>
              <div className='flex flex-row lg:flex-row items-end justify-between w-full px-5 py-2'>
              <div className='text-white text-xl font-semibold'>Location</div>
              <div className='text-white text-xl font-bold'>Bogura</div>
              </div>
            </div>
            </div>

          <div className='flex flex-row lg:flex-row   items-start justify-between w-full px-5 py-3'>
            <div className=' text-xl font-semibold' >period</div>
            <div className='text-green-700 text-xl font-bold '>6 Month</div>
          </div>

          <div className='flex flex-row lg:flex-row   items-start justify-between w-full px-5 py-3'>
            <div className=' text-xl font-semibold'>Rertun</div>
            <div className='text-green-700 text-xl font-bold'>22% - 6.7%</div>
          </div>

          <div className='flex flex-row lg:flex-row   items-start justify-between w-full px-5 py-3'>
            <div className=' text-xl font-semibold'>Total Return</div>
            <div className='text-xl font-bold '>$10,375 - $10,425</div>
          </div>


          <div className="h-auto w-full flex flex-col justify-center items-end lg:justify-center lg:items-center bg-white rounded-md p-5">
            <div className="relative text-end p-3 bg-green-100 text-green-800 font-bold rounded-md overflow-hidden group cursor-pointer">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Invest Now</span>
              <div className="absolute inset-0 bg-green-800 transform -translate-x-[105px] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
            </div>
          </div>
        </Link> */}






      </div>


    </section>
  )
}

export default HomeInvestmentSection
