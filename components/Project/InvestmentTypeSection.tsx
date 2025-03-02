'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';

import React from 'react'
import { GiBullHorns } from 'react-icons/gi'
import sampleCow2 from '../../public/eifel-cows-near-aachen-germany.jpg';
import farmer from '../../public/farmerPic.jpg';
import farmer2 from '../../public/farmers-and-their-lifestyle-of-rice-farming-.jpg';




export default function InvestmentTypeSection() {
    return (
        <div className='container mx-auto flex flex-col justify-center items-center lg:flex-col lg:justify-center lg:items-center py-20'>

            <div className="max-w-4xl text-center">
                <GiBullHorns className='w-full text-3xl text-center text-green-700 mb-3' />

                <h2 className="text-xl font-bold text-[#687469]">Investment Enriched</h2>
                <h1 className="text-5xl font-bold text-[#334b35]">Tailor Your Portfolio with Diverse
                    Investment Approaches</h1>

            </div>

            <p className='text-center font-semibold text-gray-500 mt-10 text-2xl lg:max-w-[80vh]'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo aliquam distinctio placeat quis repellat sapiente earum nulla quam, iste consequuntur fugit alias et?

            </p>

              <div className='rounded-lg flex flex-col justify-center items-center gap-2 lg:gap-14 lg:flex-row lg:justify-center lg:items-center'>
  
          
          
         <motion.div
            
                      initial={{ opacity: 0, x: 100 }} // Initial state (hidden)
                      whileInView={{ opacity: 1, x: 0 }} // Animate when in view
                      viewport={{ once: true }} // Only animate once
                      transition={{ duration: 0.3 }} className='mt-20 lg:w-1/4 sm:w-1/2 md:w-1/2  cursor-pointer  shadow-lg  rounded-lg    flex flex-col items-center justify-center '>
                <div className="  rounded-lg overflow-hidden relative h-[70vh] lg:h-[65vh] ">
                    <Image
                        src={sampleCow2}
                        alt="Profile"
                        objectFit='cover'
                        className="rounded-lg  object-cover w-full h-full overflow-clip"
                    />
                    <div className='container bg-gradient-to-t from-black to-gray-800/25 bg-opacity-35 absolute w-full top-0 bottom-0 flex flex-col items-end lg:flex-col lg:space-y-2 lg:justify-end lg:items-end justify-end'>
                        <div className='flex flex-col lg:flex-col items-end justify-between w-full px-5 space-y-4'>
                            <div className='w-full text-start font-bold text-3xl text-white'>Invest by Return Type</div>
                            <div className='text-white font-bold pb-10'>You can choose projects between fixed returns and variable returns. By selecting the return type that aligns with your financial goals, you can tailor your investment strategy to suit your preferences and risk tolerance.</div>
                        </div>
                    </div>
                </div>
            </motion.div>

                 
         <motion.div
            
            initial={{ opacity: 0, x: 200 }} // Initial state (hidden)
            whileInView={{ opacity: 1, x: 0 }} // Animate when in view
            viewport={{ once: true }} // Only animate once
            transition={{ duration: 0.3 }} className='mt-20 lg:w-1/4 sm:w-1/2 md:w-1/2  cursor-pointer  shadow-lg  rounded-lg    flex flex-col items-center justify-center '>
      <div className="  rounded-lg overflow-hidden relative h-[70vh] lg:h-[65vh] ">
          <Image
              src={farmer}
              alt="Profile"
              objectFit='cover'
              className="rounded-lg  object-cover w-full h-full overflow-clip"
          />
             <div className='container bg-gradient-to-t from-black to-gray-800/25 bg-opacity-35 absolute w-full top-0 bottom-0 flex flex-col items-end lg:flex-col lg:space-y-2 lg:justify-end lg:items-end justify-end'>
                        <div className='flex flex-col lg:flex-col items-end justify-between w-full px-5 space-y-4'>
                            <div className='w-full text-start font-bold text-3xl text-white'>Invest by Return Type</div>
                            <div className='text-white font-bold pb-10'>You can choose projects between fixed returns and variable returns. By selecting the return type that aligns with your financial goals, you can tailor your investment strategy to suit your preferences and risk tolerance.</div>
                        </div>
                    </div>
      </div>
  </motion.div>

  <motion.div
            
            initial={{ opacity: 0, x: 300 }} // Initial state (hidden)
            whileInView={{ opacity: 1, x: 0 }} // Animate when in view
            viewport={{ once: true }} // Only animate once
            transition={{ duration: 0.3 }} className='mt-20 lg:w-1/4 sm:w-1/2 md:w-1/2  cursor-pointer  shadow-lg  rounded-lg    flex flex-col items-center justify-center '>
      <div className="  rounded-lg overflow-hidden relative h-[70vh] lg:h-[65vh] ">
          <Image
              src={farmer2}
              alt="Profile"
              objectFit='cover'
              className="rounded-lg  object-cover w-full h-full overflow-clip"
          />
              <div className='container bg-gradient-to-t from-black to-gray-800/25 bg-opacity-35 absolute w-full top-0 bottom-0 flex flex-col items-end lg:flex-col lg:space-y-2 lg:justify-end lg:items-end justify-end'>
                        <div className='flex flex-col lg:flex-col items-end justify-between w-full px-5 space-y-4'>
                            <div className='w-full text-start font-bold text-3xl text-white'>Invest by Return Type</div>
                            <div className='text-white font-bold pb-10'>You can choose projects between fixed returns and variable returns. By selecting the return type that aligns with your financial goals, you can tailor your investment strategy to suit your preferences and risk tolerance.</div>
                        </div>
                    </div>
      </div>
  </motion.div>

  
          
          
            </div>  



        </div>
    )
}
