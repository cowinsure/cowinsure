'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';

import React from 'react'
import { GiBullHorns } from 'react-icons/gi'
import sampleCow2 from '../../public/sampleCow2.jpg';
import femaleFarmer from '../../public/cropped-view-of-stylish-young-woman-in-sari-showin.jpg';
import incomeUplife from '../../public/farmers-in-rice-paddy-fields-inle-lake-shan-stat.jpg';
import farmland from '../../public/agriculture-farmland-2023-11-27-05-02-44-utc.jpg';




export default function ImapctHighlightSection() {
    return (
        <div className='container mx-auto flex flex-col justify-center items-center lg:flex-col lg:justify-center lg:items-center py-20'>

            <div className="max-w-4xl text-center">
                <GiBullHorns className='w-full text-3xl text-center text-green-700 mb-3' />

                <h2 className="text-xl font-bold text-[#687469]">Impact Scoring</h2>
                <h1 className="text-5xl font-bold text-[#334b35]">InsureCow Impact</h1>

            </div>

            <p className='text-center font-semibold text-gray-500 mt-10 text-2xl lg:max-w-[80vh]'>
                Apart from ensuring access to finance, input resources, and access to markets; we are thriving everyday towards our vision to make agriculture simplified in the hands of every farmer.

            </p>

            <div className='rounded-lg flex flex-col justify-center items-center gap-2 lg:gap-14 lg:flex-row lg:justify-center lg:items-center'>



                <motion.div

                    initial={{ opacity: 0, x: 100 }} // Initial state (hidden)
                    whileInView={{ opacity: 1, x: 0 }} // Animate when in view
                    viewport={{ once: true }} // Only animate once
                    transition={{ duration: 0.3 }} className='mt-20  lg:w-1/3 sm:w-1/2 md:w-1/2  cursor-pointer  shadow-lg  rounded-lg    flex flex-col items-center justify-center '>
                    <div className="  rounded-lg overflow-hidden relative h-[70vh] lg:h-[45vh] ">
                        <Image
                            src={incomeUplife}
                            alt="Profile"
                            objectFit='cover'
                            className="rounded-lg  object-cover w-full h-full overflow-clip"
                        />
                        <div className=' container bg-black bg-opacity-50 absolute  w-full top-0   bottom-0  flex flex-col items-end lg:flex-col lg:space-y-2   lg:justify-end lg:items-end justify-end' >
                            <div className='flex flex-col  lg:flex-col   items-end justify-between w-full px-5 space-y-4 '>

                                <div className='w-full text-start font-bold text-4xl text-white '>5,000</div>
                                <div className='w-full text-start font-bold text-3xl text-white '>Farmers has access to finanace</div>
                                <div className='text-white  font-bold pb-10'>Empowered over 5,000 smallholder farmers with financial access and insurance-backed microfinance</div>
                            </div>
                        </div>
                    </div>
                </motion.div>



                <motion.div

                    initial={{ opacity: 0, x: 100 }} // Initial state (hidden)
                    whileInView={{ opacity: 1, x: 0 }} // Animate when in view
                    viewport={{ once: true }} // Only animate once
                    transition={{ duration: 0.3 }} className='mt-20  lg:w-1/3 sm:w-1/2 md:w-1/2  cursor-pointer  shadow-lg  rounded-lg    flex flex-col items-center justify-center '>
                    <div className="  rounded-lg overflow-hidden relative h-[70vh] lg:h-[45vh] ">
                        <Image
                            src={farmland}
                            alt="Profile"
                            objectFit='cover'
                            className="rounded-lg  object-cover w-full h-full overflow-clip"
                        />
                        <div className=' container bg-black bg-opacity-50 absolute  w-full top-0   bottom-0  flex flex-col items-end lg:flex-col lg:space-y-2   lg:justify-end lg:items-end justify-end' >
                            <div className='flex flex-col  lg:flex-col   items-end justify-between w-full px-5 space-y-4 '>

                                <div className='w-full text-start font-bold text-4xl text-white '>20-25%</div>
                                <div className='w-full text-start font-bold text-3xl text-white '>Profit Boosting</div>
                                <div className='text-white  font-bold pb-10'>Boosted farmer profitability by 20-25% through enhanced farm management tools and advisory services.</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div

                    initial={{ opacity: 0, x: 100 }} // Initial state (hidden)
                    whileInView={{ opacity: 1, x: 0 }} // Animate when in view
                    viewport={{ once: true }} // Only animate once
                    transition={{ duration: 0.3 }} className='mt-20  lg:w-1/3 sm:w-1/2 md:w-1/2  cursor-pointer  shadow-lg  rounded-lg    flex flex-col items-center justify-center '>
                    <div className="  rounded-lg overflow-hidden relative h-[70vh] lg:h-[45vh] ">
                        <Image
                            src={femaleFarmer}
                            alt="Profile"
                            objectFit='cover'
                            className="rounded-lg  object-cover w-full h-full overflow-clip"
                        />
                        <div className=' container bg-black bg-opacity-50 absolute  w-full top-0   bottom-0  flex flex-col items-end lg:flex-col lg:space-y-2   lg:justify-end lg:items-end justify-end' >
                            <div className='flex flex-col  lg:flex-col   items-end justify-between w-full px-5 space-y-4 '>

                                <div className='w-full text-start font-bold text-4xl text-white '>
                                1,500 farmers</div>
                                <div className='w-full text-start font-bold text-3xl text-white '>Access to low-interest loans</div>
                                <div className='text-white  font-bold pb-10'>Facilitated access to low-interest loans for over 1,500 farmers, reducing reliance on high-interest informal lenders</div>
                            </div>
                        </div>
                    </div>
                </motion.div>






            </div>



        </div>
    )
}
