'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';

import React from 'react'
import { GiBullHorns } from 'react-icons/gi'
import zeroHunger from '../../public/zerohungerSDG.png';
import provertSDG from '../../public/noprovertySDG.png';
import DecentWorkSDG from '../../public/decentworkSDG.png';
import climateSDG from '../../public/climateSDG.jpg';
import genderequality from '../../public/genderEqualitySDG.png';

export default function SDGImapctSection() {
  return (
    <div className='container mx-auto flex flex-col justify-center items-center lg:flex-col lg:justify-center lg:items-center py-20'>

    <div className="max-w-4xl text-center">
        <GiBullHorns className='w-full text-3xl text-center text-green-700 mb-3' />

        <h2 className="text-xl font-bold text-[#687469]">SDG</h2>
        <h1 className="text-5xl font-bold text-[#334b35]">SDG Impact</h1>

    </div>

    <p className='text-center font-semibold text-gray-500 mt-10 text-2xl lg:max-w-[80vh]'>
    The activities we undertake everyday are helping to achieve the below Sustainable Development Goals as defined by UN.

    </p>

      <div className='rounded-lg flex flex-col justify-center items-center gap-2 lg:gap-14 lg:flex-row lg:justify-center lg:items-center'>

  

{/* {[...Array(6)].map((_, index) => (
    <
))} */}

<motion.div
     
        initial={{ opacity: 0, x: 100 }} // Initial state (hidden)
        whileInView={{ opacity: 1, x: 0 }} // Animate when in view
        viewport={{ once: true }} // Only animate once
        transition={{ duration: 0.3 }} 
        className='mt-20 lg:w-[25vh] sm:w-1/2 md:w-1/2 cursor-pointer shadow-lg rounded-lg flex flex-col items-center justify-center'
    >
        <div className="rounded-lg overflow-hidden relative h-[25vh] lg:h-[25vh]">
            <Image
                src={provertSDG}
                alt="Profile"
                objectFit='cover'
                className="rounded-lg object-cover w-full h-full overflow-clip"
            />
           
        </div>
    </motion.div>

    <motion.div
     
        initial={{ opacity: 0, x: 100 }} // Initial state (hidden)
        whileInView={{ opacity: 1, x: 0 }} // Animate when in view
        viewport={{ once: true }} // Only animate once
        transition={{ duration: 0.3 }} 
        className='mt-20 lg:w-[25vh] sm:w-1/2 md:w-1/2 cursor-pointer shadow-lg rounded-lg flex flex-col items-center justify-center'
    >
        <div className="rounded-lg overflow-hidden relative h-[25vh] lg:h-[25vh]">
            <Image
                src={zeroHunger}
                alt="Profile"
                objectFit='cover'
                className="rounded-lg object-cover w-full h-full overflow-clip"
            />
        
        </div>
    </motion.div>


    <motion.div
     
        initial={{ opacity: 0, x: 100 }} // Initial state (hidden)
        whileInView={{ opacity: 1, x: 0 }} // Animate when in view
        viewport={{ once: true }} // Only animate once
        transition={{ duration: 0.3 }} 
        className='mt-20 lg:w-[25vh] sm:w-1/2 md:w-1/2 cursor-pointer shadow-lg rounded-lg flex flex-col items-center justify-center'
    >
        <div className="rounded-lg overflow-hidden relative h-[25vh] lg:h-[25vh]">
            <Image
                src={genderequality}
                alt="Profile"
                objectFit='cover'
                className="rounded-lg object-cover w-full h-full overflow-clip"
            />
          
        </div>
    </motion.div>

    <motion.div
     
        initial={{ opacity: 0, x: 100 }} // Initial state (hidden)
        whileInView={{ opacity: 1, x: 0 }} // Animate when in view
        viewport={{ once: true }} // Only animate once
        transition={{ duration: 0.3 }} 
        className='mt-20 lg:w-[25vh] sm:w-1/2 md:w-1/2 cursor-pointer shadow-lg rounded-lg flex flex-col items-center justify-center'
    >
        <div className="rounded-lg overflow-hidden relative h-[25vh] lg:h-[25vh]">
            <Image
                src={DecentWorkSDG}
                alt="Profile"
                objectFit='cover'
                className="rounded-lg object-cover w-full h-full overflow-clip"
            />
          
        </div>
    </motion.div>

    <motion.div
     
        initial={{ opacity: 0, x: 100 }} // Initial state (hidden)
        whileInView={{ opacity: 1, x: 0 }} // Animate when in view
        viewport={{ once: true }} // Only animate once
        transition={{ duration: 0.3 }} 
        className='mt-20 lg:w-[25vh] sm:w-1/2 md:w-1/2 cursor-pointer shadow-lg rounded-lg flex flex-col items-center justify-center'
    >
        <div className="rounded-lg overflow-hidden relative h-[25vh] lg:h-[25vh]">
            <Image
                src={climateSDG}
                alt="Profile"
                objectFit='cover'
                className="rounded-lg object-cover w-full h-full overflow-clip"
            />
           
        </div>
    </motion.div>

         
     




  
  
    </div>  



</div>
  )
}
