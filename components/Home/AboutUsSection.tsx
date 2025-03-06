'use client'
import React from 'react';
import Image from 'next/image';
import { GiBullHorns } from 'react-icons/gi';
import { FaCheckCircle } from 'react-icons/fa';
import product from '../../public/productimage.jpg';
import { motion} from 'framer-motion'; // Import Framer Motion
import Link from 'next/link';


const AboutUsSection: React.FC = () => {
  return (


    <div className='flex flex-col lg:flex-row lg:justify-around md:flex-col w-full lg:pt-10'>
      <div className='flex-1 w-full lg:w-1/2 lg:pr-10 pb-10 flex justify-center  lg:justify-end items-center relative '>
        <div className='absolute rounded-full  bg-[#fcf4e6] lg:right-20 right-[65px]  h-[300px] w-[300px] lg:h-[400px] lg:w-[400px]  '></div>
        <motion.div
          animate={{ y: [1, -10, 1], opacity: [1, 0.5, 1] }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}

          className='absolute rounded-full   lg:bottom-[150px] lg:right-[40px] bottom-[80px] right-[40px]  h-[10vh] w-[10vh] lg:h-[15vh] lg:w-[15vh]  bg-green-900'></motion.div>

        <div className="rounded-full z-20   h-[300px] w-[300px] lg:h-[400px] lg:w-[400px] overflow-hidden  border-gray-300">

          <Image
            src={product}
            alt="Profile"

            objectFit="cover"
            className="overflow-hidden  lg:h-[500px] lg:w-[500px]  h-[300px] w-[300px]"
          />

        </div>

      </div>
      <div className='flex-1 w-full lg:w-1/2 text-start'>
        <GiBullHorns className='w-auto text-3xl text-green-700 mb-3' />
        <span className="text-sm text-[#687469] uppercase font-semibold">get to know about us</span>
        <h2 className="text-4xl lg:text-5xl font-bold text-[#334b35] mt-2 max-w-xl">
        Empowering Smallholder Farmers with Digital Livestock Assets
        </h2>
        <p className="mt-10 text-xl text-[#687469]">
        Empowering Farmers, Securing Futures
        </p>
        <ul className="space-y-3 mb-8 pt-10 text-[18px] text-[#334b35]">
          <li className="flex items-center">
            <FaCheckCircle className='text-green-600 mr-2' />
            InsureCow Ltd. Singapore-based fintech & insurtech company
          </li>
          <li className="flex items-center">
            <FaCheckCircle className='text-green-600 mr-2' />
            Revolutionizing financial inclusion for smallholder farmers
          </li>
          <li className="flex items-center">
            <FaCheckCircle className='text-green-600 mr-2' />
            Uses AI Digital Twins & Know Your Cow™ (KYC) technology
          </li>
          <li className="flex items-center">
            <FaCheckCircle className='text-green-600 mr-2' />
            Muzzle Printometry for tamper-proof cattle identification
          </li>
          <li className="flex items-center">
            <FaCheckCircle className='text-green-600 mr-2' />
            Transforming livestock into secure digital assets
          </li>
          <li className="flex items-center">
            <FaCheckCircle className='text-green-600 mr-2' />
            Connecting farmers with financial services for trust, transparency, & empowerment
          </li>
        </ul>
        <div className='flex items-center'>
          <Link href='/about_us' className="relative text-center p-3 lg:w-[150px] lg:h-[50px] bg-green-100 text-green-800 font-semibold rounded-md overflow-hidden group cursor-pointer flex items-center justify-center">
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Learn more</span>
            <div className="absolute inset-0 bg-green-800 transform -translate-x-[-145px] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AboutUsSection;
