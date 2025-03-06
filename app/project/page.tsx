'use client'
import React, { useEffect, useState } from 'react';
import { GiBullHorns } from 'react-icons/gi';
import Image from 'next/image';
import FaqSection from '@/components/Home/FaqSection';
import Link from 'next/link';
import InvestmentTypeSection from '@/components/Project/InvestmentTypeSection';
import WhyInvestWithUs from '@/components/Home/WhyInvestWithUsSection';
import cover3 from '../../public/cover3.jpg';
import cover01 from '../../public/homeCover1.jpg';
import cover02 from '../../public/homcover2.jpg';
import cover03 from '../../public/homecover3.jpg';
import { formatToBDT } from '@/utils/currencyFormatter';
import CowPurchaseSection from '@/components/Project/cowSellProject/CowPurchaseSection';

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

const Project = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

    const [categories, setCategories] = useState<Category[]>([]);
  
  console.log(categories);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://52.66.196.177:8000/api/v1/portfolio/categories/');
        const result: CategoryApiResponse = await response.json();
        if (result.status === 'success') {
          setCategories(result.data);
          const cowSellCategory = result.data.find(category => category.name === 'Long Term Investment');
          if (cowSellCategory) {
            fetchPortfolios(cowSellCategory.id);
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };



    const fetchPortfolios = async (categoryId: string)  => {
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

  // const slides = [
  //   cover01,
  //   cover02,
  //   cover03,
  //   cover3,
  //   cover01,
  //   cover3,
  //   cover03,
  //   cover3,
  // ];

  return (
    <div className='pt-16 lg:pt-0 overflow-hidden'>
      <section className="h-auto pb-10 lg:mt-14 lg:h-auto flex flex-col lg:flex-col lg:justify-start lg:items-center items-center justify-center bg-[#F6F4EC] pt-10">
        <div className="max-w-4xl text-center">
          <GiBullHorns className='w-full text-3xl text-center text-green-700 mb-3' />
          <h2 className="text-xl font-bold text-[#687469]">Invest Now</h2>
          <h1 className="text-5xl font-bold text-[#334b35]">Our Projects</h1>
        </div>

        <div className='mt-10 w-full h-auto container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-5'>
          {portfolios.map((portfolio) => (
            <Link key={portfolio.id} href={`/project/project_details/${portfolio.id}`} className='bg-white shadow-lg rounded-lg border-bg-[#F6F4EC] border-2 flex flex-col items-start justify-start'>
            <div className="w-full  rounded-lg  relative flex flex-col lg:flex-col lg:justify-start lg:items-start">
              <Image
                src={portfolio.image_url}
                alt={portfolio.name}
                objectFit='cover'
                className="rounded-lg object-cover w-full h-48 "
                width={500}
                height={400}
                unoptimized
              />
              <div className='container bg-black bg-opacity-20 absolute w-full bottom-0 flex flex-col items-start lg:flex-col lg:space-y-2 lg:justify-end lg:items-end justify-start'>
                <div className='flex flex-row lg:flex-row items-end justify-between w-full px-2'>
                  <div className='text-xl text-white font-semibold'>{portfolio.name}</div>
                  <div className='text-white text-xl font-bold'> {formatToBDT(parseInt(portfolio.investment_value))}</div>
                </div>
                <div className='flex flex-row lg:flex-row items-end justify-between w-full px-2 py-2'>
                  <div className='text-white text-xl font-semibold'>{portfolio.location}</div>
                  <div className='text-white text-xl font-bold'>{portfolio.currency} </div>
                </div>
              </div>
            </div>

            <div className='flex flex-row lg:flex-row items-start justify-between w-full px-2  py-3'>
              <div className='text-md text-[#334b35] font-semibold'>Period</div>
              <div className='text-gray-700 text-md font-bold'>{portfolio.investment_period}</div>
            </div>

            <div className='flex flex-row lg:flex-row items-start justify-between w-full px-2 py-3'>
              <div className='text-md text-[#334b35] font-semibold'>Return</div>
              <div className='text-gray-700 text-md font-bold'>{portfolio.expected_return_min}% - {portfolio.expected_return_max}%</div>
            </div>

            <div className='flex flex-row lg:flex-row items-start justify-between w-full px-2 py-3'>
              <div className='text-md text-[#334b35] font-semibold'>Total Return</div>
              <div className='text-xm font-bold text-gray-700'> {formatToBDT(parseInt(portfolio.total_return_min))} - {formatToBDT(parseInt(portfolio.total_return_max))}</div>
            </div>

            <div className="h-auto w-full flex flex-col justify-center items-end lg:justify-center lg:items-center bg-white rounded-md p-5">
              <div className="relative text-end p-3 bg-green-100 text-green-800 font-bold rounded-md overflow-hidden group cursor-pointer">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Invest Now</span>
                <div className="absolute inset-0 bg-green-800 transform -translate-x-[105px] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
              </div>
            </div>
          </Link>
          ))}
        </div>
      </section>

      <div>
        <CowPurchaseSection />
      </div>

      <div className='my-20'>
        <WhyInvestWithUs  />
      </div>

      <InvestmentTypeSection />

      <section className='bg-[#F6F4EC] text-center'>
        <FaqSection />
      </section>
    </div>
  );
};

export default Project;
