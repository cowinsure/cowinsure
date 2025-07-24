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



  }, [investmentValue,
  profitCount,
  projectDetails?.expected_return_min,
  projectDetails?.expected_return_max,])

  console.log(investmentValue, maxTotalReturn, minTotalReturn);


  const decrementProfitCount = () => {
    setProfitCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
  };

  const calculateReturn = (investment: number, interestRate: number): number => {
    const newv = investment + (investment * (interestRate / 100));
    return newv
  };

  if (loading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Project Details...</p>
        </div>
      </div>
    );
  }


  if (!projectDetails) {
    return <div>Error loading project details.</div>;
  }

  return (
    <div className='h-auto md:pt-0 mx-auto lg:w-full text-center bg-[#F7F7F7]'>
      <div className='pt-[10vh] lg:pt-[10vh] container mx-auto flex flex-col lg:flex-col lg:justify-center lg:items-center justify-center p-5'>
      <div className='relative mb-10 w-full rounded-lg overflow-hidden h-auto lg:h-[100vh]'>
        <Image
          src={projectDetails.image_url}
          width={800}
          height={600}
          alt="Banner"
          loading="eager"
          priority={true}
          unoptimized={true}
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
            <p className='text-start  text-xl  text-[#687469]'>
                <div dangerouslySetInnerHTML={{ __html: projectDetails.description }} />
            </p>

          </div>

        </div>
        <div className="w-full bg-white rounded-lg shadow-md flex flex-col-reverse lg:flex-row mt-10">

  {/* Invest on Cow Section */}
  <div className="w-full lg:w-1/2 p-6 lg:px-8">
    <CowInvestmentForm />
  </div>

  {/* Divider (desktop only) */}
  <div className="hidden lg:block w-px bg-gray-300 my-4"></div>

  {/* Profit Statement Section */}
  <div className="w-full lg:w-1/2 p-6 lg:px-8">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-[#334b35] mb-6">
      Approximate Profit Statement
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="p-6 bg-green-50 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-green-700">Return</h3>
        <p className="text-2xl font-bold text-green-800">
          {projectDetails.expected_return_min}% – {projectDetails.expected_return_max}%
        </p>
      </div>
      <div className="p-6 bg-green-50 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-green-700">Duration</h3>
        <p className="text-2xl font-bold text-green-800">
          {projectDetails.investment_period}
        </p>
      </div>
      <div className="p-6 bg-green-50 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-green-700">Location</h3>
        <p className="text-2xl font-bold text-green-800">
          {projectDetails.location}
        </p>
      </div>
    </div>

    <div className="mt-8 flex flex-col items-center bg-green-800 text-white space-y-4 p-6 rounded-lg">
      <h3 className="text-xl font-semibold">Total Return</h3>
      <p className="text-2xl font-bold text-white">
          {formatToBDT(minTotalReturn)} – {formatToBDT(maxTotalReturn)}
        </p>
      <h3 className="text-lg font-semibold">Profit Count</h3>
      <div className="mt-4 flex items-center space-x-4">
        <button
          onClick={decrementProfitCount}
          disabled={profitCount <= 1}
          className="bg-green-700 hover:bg-green-600 disabled:opacity-50 rounded-full p-2"
        >
          <HiOutlineMinusSm size={20} />
        </button>
        <span className="text-2xl font-bold">{profitCount}</span>
        <button
          onClick={incrementProfitCount}
          className="bg-green-700 hover:bg-green-600 rounded-full p-2"
        >
          <FaPlus size={20} />
        </button>
        
      </div>
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
