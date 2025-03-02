import React from 'react'
import Image from 'next/image';
import whitebg from '../../public/whitebg.jpg';
import whitebg2 from '../../public/whitebg2.jpg';
import { MdOutlineArrowRightAlt } from 'react-icons/md';

const HomeKnowUsSection = () => {
  return (
          <section className='w-full container mx-auto flex flex-col gap-4 lg:flex-row items-center justify-center  mb-5 '>

        <div className='lg:w-1/3  bg-slate-500 h-80 rounded-lg  '>
          <div className=" h-80  rounded-md overflow-hidden relative">
            <Image
              src={whitebg}
              alt="Profile"


              objectFit='cover'
              className="rounded-md object-cover w-full h-full overflow-clip"
            />

            <div className=' container absolute w-full h-full left-5 top-5 flex flex-col lg:flex-col lg:space-y-2   lg:justify-start lg:items-start justify-start items-start' >

              <div className='text-pink-600 text-3xl '>Invest Now</div>
              <h3 className=' text-4xl '>Grab your opertunity</h3>
              <div className='flex  items-center justify-center text-white '>
                <MdOutlineArrowRightAlt
                  className='text-5xl text-green-500' />
                <span className=' text-green-500    font-light'>  Get Started</span>
              </div>

            </div>
          </div>
        </div>
        <div className='lg:w-1/3  bg-slate-500 h-80 rounded-lg  '>
          <div className=" h-80  rounded-md overflow-hidden relative">
            <Image
              src={whitebg2}
              alt="Profile"


              objectFit='cover'
              className="rounded-md object-cover w-full h-full overflow-clip"
            />

            <div className=' container absolute w-full h-full left-5 top-5 flex flex-col lg:flex-col lg:space-y-2   lg:justify-start lg:items-start justify-start items-start' >

              <div className='text-pink-600 text-3xl '>Get Loan</div>
              <h3 className=' text-4xl '>Choose best Loan</h3>
              <div className='flex  items-center justify-center text-white '>
                <MdOutlineArrowRightAlt
                  className='text-5xl text-green-500' />
                <span className=' text-green-500    font-light'>  Get Started</span>
              </div>

            </div>
          </div>
        </div>
        <div className='lg:w-1/3  bg-slate-500 h-80 rounded-lg  '>
          <div className=" h-80  rounded-md overflow-hidden relative">
            <Image
              src={whitebg}
              alt="Profile"


              objectFit='cover'
              className="rounded-md object-cover w-full h-full overflow-clip"
            />

            <div className=' container absolute w-full h-full left-5 top-5 flex flex-col items-start lg:flex-col lg:space-y-2   lg:justify-start lg:items-start justify-start ' >

              <div className='text-pink-600 text-3xl '>Insurance</div>
              <h3 className=' text-4xl text-start'>Fastest Insurance claim policy</h3>
              <div className='flex  items-center justify-center text-white '>
                <MdOutlineArrowRightAlt
                  className='text-5xl text-green-500' />
                <span className=' text-green-500    font-light'>  Get Started</span>
              </div>

            </div>
          </div>
        </div>




      </section>
  )
}

export default HomeKnowUsSection
