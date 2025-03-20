'use client'
import React from 'react';
import Image from 'next/image';
import { GiBullHorns } from 'react-icons/gi';
// import { FaCheckCircle } from 'react-icons/fa';
import product from '../../public/cover3.jpg';
import { motion} from 'framer-motion'; // Import Framer Motion
import Link from 'next/link';


const AboutUsSection: React.FC = () => {
  return (


    <div className='flex flex-col lg:flex-row lg:justify-around md:flex-col w-full lg:pt-10 mt-20'>
      <div className='flex-1 w-full lg:w-1/2 lg:pr-10 pb-10 flex justify-center  lg:justify-center items-center relative '>
        {/* <div className='absolute rounded-full  bg-[#fcf4e6] lg:right-[35vh] right-[65px]  h-[300px] w-[300px] lg:h-[500px] lg:w-[500px]  '></div> */}
        {/* <motion.div
          animate={{ y: [1, -10, 1], opacity: [1, 0.5, 1] }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}

          className='absolute rounded-full   lg:bottom-[150px] lg:right-[19vh] bottom-[80px] right-[40px]  h-[10vh] w-[10vh] lg:h-[15vh] lg:w-[15vh]  bg-green-900'></motion.div> */}

<div className='relative px-10 py-10 '>

<div className="relative z-30 h-[300px] w-[300px] lg:h-[500px] lg:w-[500px] overflow-hidden border-gray-300 rounded-[5px] group">
  <Image
    src={product}
    alt='cover'
    height={200}
    width={300}
    objectFit="cover"
    className="w-full h-full rounded-md"
    unoptimized
    priority
  />
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="absolute w-0 h-full bg-white bg-opacity-20 transform group-hover:w-full transition-all duration-500 ease-in-out"></div>
  </div>
</div>

<motion.div
          animate={{ y: [1, -10, 1], opacity: [1, 0.5, 1] }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }} className='absolute bg-green-800 z-20 lg:left-[0px] left-5 bottom-10 rounded-md h-[200px] w-[120px] lg:h-[250px] lg:w-[200px]'></motion.div>
<div className='absolute bg-transparent z-40 px-16 left-[0px] right-0 lg:bottom-[-60px] bottom-0 rounded-md h-[100px] w-full lg:h-[250px] lg:w-full flex justify-center items-center'>
  <div className='w-full  bg-green-800 flex flex-row gap-4  justify-center items-center p-4 rounded-md '>

    <div className='flex flex-col items-center'>
    <span className='text-white text-3xl'>4,136</span>
      <span className='text-white text-md'>Farmer Benefited</span>
  
    </div>
      
  </div>

</div>
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
        <p className="space-y-3 mb-8 pt-10 text-[18px] text-[#334b35]">
          InsureCow Ltd., a Singapore-based fintech and insurtech leader, revolutionizes financial inclusion for smallholder farmers. Using AI Digital Twins and proprietary Know Your Cow™ (KYC) technology, we transform livestock into secure digital assets. Our advanced Muzzle Printometry ensures tamper-proof cattle identification, enabling farmers to access financial and insurance services with trust and transparency.
        </p>
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
