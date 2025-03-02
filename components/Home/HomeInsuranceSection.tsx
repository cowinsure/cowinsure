'use client';

import React from 'react'
import { GiBullHorns } from 'react-icons/gi'
import insureCow2 from '../../public/insurancecow.svg';
import family from '../../public/family.svg';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HomeInsuranceSection = () => {
  return (
    <section className=" py-[15vh] h-auto lg:h-auto  flex flex-col  lg:flex-col lg:justify-start  lg:items-center items-center justify-center bg-white ">
      <div className="max-w-4xl text-center">
        <GiBullHorns className='w-full lg:text-3xl text-xl text-center text-green-700 mb-2' />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3, }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-sm lg:text-xl font-bold text-[#687469] mb-2">Digital Insurance Solutions</h2>
          <h1 className="lg:text-5xl text-3xl font-bold text-[#334b35]">Simply compare,
            order, and get covered.</h1>
        </motion.div>
      </div>

      <div className='mt-10 w-full h-auto container mx-auto flex flex-col gap-4 lg:flex-row items-center justify-center  mb-5 '>


        <motion.div

          initial={{ opacity: 0, x: 10 }} // Initial state (hidden)
          whileInView={{ opacity: 1, x: 0 }} // Animate when in view
          viewport={{ once: true }} // Only animate once
          transition={{ duration: 0.3 }} // Animation duration
          className='lg:w-1/4 w-2/3 bg-[#F6F4EC] h-100 rounded-lg shadow-lg py-8 border-[#F6F4EC]  hover:border-b-4 hover:border-b-green-700'
        >
          <Link href='/insurance/livestock ' className='w-full flex flex-col items-center justify-center lg:flex-col lg:items-center lg:justify-center'>
            <Image
              src={insureCow2}
              alt="Profile"
              objectFit='cover'
              className=" object-cover w-24 h-24 overflow-clip"
            />
            <h1 className='mt-10 text-2xl font-bold text-green-900'>LiveStock Insurance</h1>
          </Link>


        </motion.div>




        <motion.div

          initial={{ opacity: 0, x: 10 }} // Initial state (hidden)
          whileInView={{ opacity: 1, x: 0 }} // Animate when in view
          viewport={{ once: true }} // Only animate once
          transition={{ duration: 0.3 }} // Animation duration
          className='lg:w-1/4 w-2/3 bg-[#F6F4EC] h-100 rounded-lg shadow-lg py-8 border-[#F6F4EC]   hover:border-b-4 hover:border-b-green-700'
        >
          <Link href='/insurance/life' className='w-full flex flex-col items-center justify-center lg:flex-col lg:items-center lg:justify-center'>
            <Image
              src={family}
              alt="Profile"
              objectFit='cover'
              className=" object-cover w-24 h-24 overflow-clip"
            />
            <h1 className='mt-10 text-2xl font-bold text-green-900'>Life Insurance</h1>
          </Link>


        </motion.div>

        <motion.div

          initial={{ opacity: 0, x: 10 }} // Initial state (hidden)
          whileInView={{ opacity: 1, x: 0 }} // Animate when in view
          viewport={{ once: true }} // Only animate once
          transition={{ duration: 0.3 }} // Animation duration
          className='lg:w-1/4 w-2/3 bg-[#F6F4EC] h-100 rounded-lg shadow-lg py-8 border-[#F6F4EC]   hover:border-b-4 hover:border-b-green-700'
        >
          <Link href='/insurance/health' className='w-full flex flex-col items-center justify-center lg:flex-col lg:items-center lg:justify-center'>
            <Image
              src={family}
              alt="Profile"
              objectFit='cover'
              className=" object-cover w-24 h-24 overflow-clip"
            />
            <h1 className='mt-10 text-2xl font-bold text-green-900'>Health Insurance</h1>
          </Link>


        </motion.div>
      </div>


    </section>
  )
}

export default HomeInsuranceSection
