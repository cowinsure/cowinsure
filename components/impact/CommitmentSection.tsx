'use client'
import React from 'react'
import { GiBullHorns } from 'react-icons/gi'
import { motion } from 'framer-motion';


function CommitmentSection() {
    return (
        <div className='container mx-auto flex flex-col justify-center items-center lg:flex-col lg:justify-center lg:items-center py-20'>

            <div className="max-w-4xl text-center">
                <GiBullHorns className='w-full text-3xl text-center text-green-700 mb-3' />

                <h2 className="text-xl font-bold text-[#687469]">strength and vision</h2>
                <h1 className="text-5xl font-bold text-[#334b35]">Our Commitment</h1>

            </div>

            <p className='text-center font-semibold text-gray-500 mt-10 text-2xl lg:max-w-[80vh]'>
                At InsureCow, we are dedicated to transforming agriculture by connecting investors with smallholder farmers. Together, we cultivate sustainable growth, drive food security, and uplift communities, ensuring every investment contributes to a better future for all.

            </p>

            <motion.div

                initial={{ opacity: 0, x: 100 }} // Initial state (hidden)
                whileInView={{ opacity: 1, x: 0 }} // Animate when in view
                viewport={{ once: true }} // Only animate once
                transition={{ duration: 0.3 }}
                className='container mx-auto mt-20  flex flex-col justify-center items-center gap-2 lg:gap-14 lg:flex-row lg:justify-center lg:items-center'>

                <div className='bg-white text-start rounded-lg lg:w-1/2 p-5 lg:h-[25vh] flex flex-col justify-center'>
                    <h1 className='text-2xl font-semibold mb-2'> Empowering Smallholder Farmers  </h1>
                    <p className='text-xl text-gray-600'>We are committed to providing smallholder farmers with easy and steady access to finance and markets, enabling them to thrive economically.</p>
                </div>



                <div className='bg-white text-start rounded-lg lg:w-1/2 p-5 lg:h-[25vh] flex flex-col justify-center'>
                    <h1 className='text-2xl font-semibold mb-2'> Empowering Smallholder Farmers  </h1>
                    <p className='text-xl text-gray-600'>We are committed to providing smallholder farmers with easy and steady access to finance and markets, enabling them to thrive economically.</p>
                </div>





            </motion.div>

            <motion.div

                initial={{ opacity: 0, x: 400 }} // Initial state (hidden)
                whileInView={{ opacity: 1, x: 0 }} // Animate when in view
                viewport={{ once: true }} // Only animate once
                transition={{ duration: 0.3 }}
                className='container mx-auto mt-20  flex flex-col justify-center items-center gap-2 lg:gap-14 lg:flex-row lg:justify-center lg:items-center'>

                <div className='bg-white text-start rounded-lg lg:w-1/2 p-5 lg:h-[25vh] flex flex-col justify-center'>
                    <h1 className='text-2xl font-semibold mb-2'> Empowering Smallholder Farmers  </h1>
                    <p className='text-xl text-gray-600'>We are committed to providing smallholder farmers with easy and steady access to finance and markets, enabling them to thrive economically.</p>
                </div>



                <div className='bg-white text-start rounded-lg lg:w-1/2 p-5 lg:h-[25vh] flex flex-col justify-center'>
                    <h1 className='text-2xl font-semibold mb-2'> Empowering Smallholder Farmers  </h1>
                    <p className='text-xl text-gray-600'>We are committed to providing smallholder farmers with easy and steady access to finance and markets, enabling them to thrive economically.</p>
                </div>


            </motion.div>



        </div>
    )
}

export default CommitmentSection
