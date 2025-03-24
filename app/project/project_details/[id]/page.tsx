'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import FaqSection from '@/components/Home/FaqSection';
import { useParams } from 'next/navigation';

import { formatToBDT } from '@/utils/currencyFormatter';
import { HiOutlineMinusSm } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import CowInvestmentForm from '@/components/Project/CowInvestmentForm';

// types/Investment.ts
export interface Category {
  id: string;
  name: string;
}

export interface ProjectDetails {
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
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category: Category;
}

const DetailsID = () => {

  const { id } = useParams() as { id: string };

  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(null);
  const [minTotalReturn, setMinTotalReturn] = useState<number>(0);
  const [maxTotalReturn, setMaxTotalReturn] = useState<number>(0);
  const [investmentValue, setInvestmentValue] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/portfolio/${id}/`);
        const data = await response.json();
        setProjectDetails(data.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching project details:', error);
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  useEffect(() => {

    setMinTotalReturn(projectDetails?.total_return_min ? parseInt(projectDetails.total_return_min) : 0)
    setMaxTotalReturn(projectDetails?.total_return_max ? parseInt(projectDetails.total_return_max) : 0)
    setInvestmentValue(projectDetails?.investment_value ? parseInt(projectDetails.investment_value) : 0)
  }, [projectDetails])

  const [profitCount, setProfitCount] = useState(1);

  const incrementProfitCount = () => {
    setProfitCount(prevCount => prevCount + 1);


  };

  useEffect(() => {

    const minReturn = calculateReturn(investmentValue, projectDetails?.expected_return_min ? parseFloat(projectDetails.expected_return_min) : 0)
    const totalMin = minReturn * profitCount
    setMinTotalReturn(totalMin)

    const maxReturn = calculateReturn(investmentValue, projectDetails?.expected_return_max ? parseFloat(projectDetails.expected_return_max) : 0)
    const totalMax = maxReturn * profitCount
    setMaxTotalReturn(totalMax)



  }, [profitCount])

  console.log(investmentValue, maxTotalReturn, minTotalReturn);


  const decrementProfitCount = () => {
    setProfitCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
  };

  const calculateReturn = (investment: number, interestRate: number): number => {
    const newv = investment + (investment * (interestRate / 100));
    return newv
  };

  if (loading) {
    return <div className='h-screen w-screen text-center'>Loading...</div>;
  }


  if (!projectDetails) {
    return <div>Error loading project details.</div>;
  }

  return (
    <div className='h-auto md:pt-0 mx-auto lg:w-full text-center bg-[#F7F7F7] lg:mt-[10vh]'>
      <div className='pt-[10vh] lg:pt-[10vh] container mx-auto flex flex-col lg:flex-col lg:justify-center lg:items-center justify-center p-5'>
      <div className='relative mb-10 w-full rounded-lg overflow-hidden h-auto lg:h-[100vh]'>
        <Image
          src={projectDetails.image_url}
          width={800}
          height={600}
          alt="Banner"
          loading="eager"
          priority={true}
          objectPosition='top'
          className="w-full h-full object-cover rounded-lg"
        />
        <div className='absolute bg-black bg-opacity-45 top-0 h-full w-full flex justify-center items-center lg:justify-center lg:items-center'>
          <h1 className='text-white text-4xl lg:text-6xl font-bold'>{projectDetails.name}</h1>
        </div>
      </div>
        <h1 className='text-3xl font-bold text-[#334b35] text-start w-full mt-5 mb-5'>Project Overview</h1>
        <div className='mb-10 w-full flex flex-col lg:gap-5 gap-5 justify-between lg:flex-row lg:items-start lg:justify-between'>
          <div className='w-full lg:flex-1 p-10 rounded-md bg-green-800 font-bold'>
            <h2 className='text-2xl text-white mb-5'>Return</h2>
            <h2 className='text-xl text-white'>{projectDetails.expected_return_min}% - {projectDetails.expected_return_max}%</h2>
          </div>
          <div className='w-full lg:flex-1 p-10 rounded-md bg-green-800 font-bold'>
            <h2 className='text-2xl text-white mb-5'>Duration</h2>
            <h2 className='text-xl text-white'>{projectDetails.investment_period}</h2>
          </div>
          <div className='w-full lg:flex-1 p-10 rounded-md bg-green-800 font-bold'>
            <h2 className='text-2xl text-white mb-5'>Unit price</h2>
            <h2 className='text-xl text-white'>{formatToBDT(parseInt(projectDetails.investment_value))}</h2>
          </div>

          <div className='w-full lg:flex-1 p-10 rounded-md bg-green-800 font-bold'>
            <h2 className='text-2xl text-white mb-5'>Location</h2>
            <h2 className='text-xl text-white'>{projectDetails.location}</h2>
          </div>

        </div>


        <div className='w-full flex flex-col lg:gap-5 justify-start items-start lg:flex-row lg:items-start lg:justify-between '>
          <div className='flex-1 flex flex-col lg:flex-col gap-5 justify-start items-start lg:items-start lg:justify-start'>
            <h1 className='text-xl font-bold text-[#334b35] text-start w-full mt-5 mb-5'>Project Details</h1>
            <p className='text-start  text-xl font-semibold text-[#687469]'>
              {projectDetails.description}
            </p>

          </div>

        </div>
        <div className='w-full flex flex-col lg:gap-5 justify-start items-start lg:flex-row lg:items-start lg:justify-between mt-10'>
          <div className='flex flex-col w-full justify-start items-center lg:justify-start lg:items-start lg:w-1/3'>

            <div className='w-full text-center mb-10 text-3xl font-bold text-[#334b35] mt-5'>Invest on Cow</div>
            <CowInvestmentForm />

          </div>
          <div className='flex-1 flex flex-col justify-center items-center lg:flex-col lg:justify-center lg:items-center lg:w-1/3' >
            <h1 className=' text-3xl font-bold text-[#334b35] text-center w-full mt-5 mb-5'>Approximate Profit Statement</h1>

            <div className='flex flex-row justify-between lg:justify-around w-full mt-10'>
              <div className='flex flex-col gap-4'>
                <h2 className='text-2xl font-bold text-green-700 '>Return</h2>
                <h2 className='text-3xl text-green-700'>{projectDetails.expected_return_min}% - {projectDetails.expected_return_max}%</h2>
              </div>

              <div className='flex flex-col gap-4'>
                <h2 className='text-2xl font-bold text-green-700 '>Duration</h2>
                <h2 className='text-3xl text-green-700'>{projectDetails.investment_period}</h2>
              </div>

            </div>

            <div className='flex flex-row justify-between lg:justify-around w-full mt-10'>
              <div className='flex flex-col gap-4'>
                <h2 className='text-2xl font-bold text-green-700 '>Total Return</h2>
                <h2 className='text-3xl text-green-700'>{formatToBDT(minTotalReturn)} - {formatToBDT(maxTotalReturn)}</h2>
              </div>

              <div className='flex flex-col gap-4'>
                <h2 className='text-2xl font-bold text-green-700 '>Location</h2>
                <h2 className='text-3xl text-green-700'>{projectDetails.location}</h2>
              </div>

            </div>

            <div className=' flex flex-row items-center justify-start bg-green-800 p-5 rounded-md mt-20'>
              <h1 className='text-white text-2xl'>Profit Count:</h1>
              <button className='ml-4 bg-white text-green-800 rounded-full w-10 h-10 flex items-center justify-center'
                onClick={() => { decrementProfitCount() }}
              >
                <HiOutlineMinusSm />
              </button>
              <span className='mx-4 text-white text-xl'>{profitCount}</span>
              <button

                onClick={() => { incrementProfitCount() }}
                className=' bg-white text-green-800 rounded-full w-10 h-10 flex items-center justify-center'>
                <FaPlus />
              </button>


            </div>

          </div>
        </div>
      </div>


      <div className='mt-11 bg-[#F6F4EC]'>

        <FaqSection />
      </div>

    </div>
  );
};

export default DetailsID;
