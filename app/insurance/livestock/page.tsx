'use client'

import React from 'react'
import inspection from '../../../public/livestockinsuranceimg.jpg';
import Image from 'next/image';
import FaqSection from '@/components/Home/FaqSection';

import LiveStockInsuranceForm from '@/components/livestock/LiveStockInsuranceForm';
import { motion } from 'framer-motion';
import { GiBullHorns } from 'react-icons/gi'

const LiveStock = () => {
    return (
        <div className='h-auto   md:pt-0 mx-auto lg:w-full  text-center bg-[#F7F7F7] '>
            <div className='pt-[10vh] lg:pt-[10vh]   container mx-auto flex flex-col lg:flex-col lg:justify-center justify-between'>
            <div className="w-full  text-center mb-16">
        <GiBullHorns className='w-full text-3xl text-center text-green-700 mb-2' />

        <motion.div
          initial={{ opacity: 0, y: -200 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3, margin: "100px" }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-xl font-bold text-[#687469] mb-2">Digital Insurance Solutions</h2>
          <h1 className="text-5xl font-bold text-[#334b35]">Simply compare,
          order, and get covered.</h1>
        </motion.div>
      </div>

                <div className=' mt-14 flex flex-col lg:flex-row lg:justify-center  gap-3 lg:mb-[10vh]'>

                    <div className='lg:w-1/2 flex flex-col items-center justify-center lg:justify-center lg:items-center'>
                    <div className="md:w-60  md:h-60 rounded-full overflow-hidden border-2 border-gray-300">
              <Image
                src={inspection}
                alt="Profile"


                objectFit='Content'
                className="rounded-full object-cover w-60 h-60"
              />
            </div>

                        <div className='text-2xl text-start mt-5 font-semibold text-[#687469]'>Choose the best  <span className='text-3xl text-green-700 font-bold' >Insurance Plan</span> 
                            </div>
                    </div>
                    <div className=' lg:w-1/2 flex justify-center items-center lg:justify-center lg:items-center'>
                       <LiveStockInsuranceForm/>
                    </div>
                </div>




            </div>


            <div className='mt-11 bg-[#F6F4EC]'>

            <FaqSection />
            </div>
        </div>
    )
}

export default LiveStock
