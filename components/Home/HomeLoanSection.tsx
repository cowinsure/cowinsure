import React from 'react'
import { GiBullHorns } from 'react-icons/gi'
import investmentpic from '../../public/productimage.jpg';
import Image from 'next/image';

const HomeLoanSection = () => {
  return (
    <section className="pb-10 h-auto lg:h-auto  flex flex-col  lg:flex-col lg:justify-start  lg:items-center items-center justify-center bg-[#F6F4EC] pt-10">
    <div className="max-w-4xl text-center">
      <GiBullHorns className='w-full text-3xl text-center text-green-700 mb-3' />

      <h2 className="text-xl font-bold text-gray-900">Get Loan</h2>
      <h1 className="text-5xl font-bold text-gray-900">Our Loans</h1>

    </div>

    <div className='mt-10 w-full h-auto container mx-auto flex flex-col gap-4 lg:flex-row items-center justify-center  mb-5 '>

    <div className='lg:w-1/3  bg-white shadow-lg h-100 rounded-lg border-white border-4  flex flex-col items-center justify-center '>
        <div className=" h-auto  rounded-t-lg overflow-hidden relative">
          <Image
            src={investmentpic}
            alt="Profile"


            objectFit='cover'
            className="rounded-t-lg  object-cover w-full h-full overflow-clip"
          />
          <div className=' container absolute  w-full   bottom-0  flex flex-col items-start lg:flex-col lg:space-y-2   lg:justify-end lg:items-end justify-start ' >

          <div className='flex flex-row  lg:flex-row   items-end justify-between w-full px-5 py-3'>
            <div className='text-white text-2xl' >Cow-10</div>
            <div className='text-white text-xl'>$ 10,000 BDT</div>
        </div>

        <div className='flex flex-row lg:flex-row   items-end justify-between w-full px-5 py-3'>
            <div className='text-white text-2xl' >Bogura</div>
            <div className='text-white text-xl'>BDT/Unit</div>
        </div>

          </div>


        </div>
        <div className=" h-auto w-full flex flex-col justify-end items-end lg:justify-end lg:items-end bg-white rounded-b-lg p-5">
          <div className= ' text-end p-3 bg-green-300 rounded-3xl ' > variable return</div>
        </div>

        <div className='flex flex-row lg:flex-row   items-start justify-between w-full px-5 py-3'>
            <div className='text-green-700 text-xl' >period</div>
            <div className='text-green-700 text-xl'>6 Month</div>
        </div>

        <div className='flex flex-row lg:flex-row   items-start justify-between w-full px-5 py-3'>
            <div className='text-green-700 text-xl'>Rertun</div>
            <div className='text-green-700 text-xl'>22% - 6.7%</div>
        </div>

        <div className='flex flex-row lg:flex-row   items-start justify-between w-full px-5 py-3'>
            <div className=' text-2xl'>Total Return</div>
            <div className='text-2xl'>$10,375 - $10,425</div>
        </div>
      </div>

      
      <div className='lg:w-1/3 shadow-lg  bg-white h-100 rounded-lg border-white border-4  flex flex-col items-center justify-center '>
        <div className=" h-auto  rounded-t-lg overflow-hidden relative">
          <Image
            src={investmentpic}
            alt="Profile"


            objectFit='cover'
            className="rounded-t-lg  object-cover w-full h-full overflow-clip"
          />
          <div className=' container absolute  w-full   bottom-0  flex flex-col items-start lg:flex-col lg:space-y-2   lg:justify-end lg:items-end justify-start ' >

          <div className='flex flex-row  lg:flex-row   items-end justify-between w-full px-5 py-3'>
            <div className='text-white text-2xl' >Cow-10</div>
            <div className='text-white text-xl'>$ 10,000 BDT</div>
        </div>

        <div className='flex flex-row lg:flex-row   items-end justify-between w-full px-5 py-3'>
            <div className='text-white text-2xl' >Bogura</div>
            <div className='text-white text-xl'>BDT/Unit</div>
        </div>

          </div>


        </div>
        <div className=" h-auto w-full flex flex-col justify-end items-end lg:justify-end lg:items-end bg-white rounded-b-lg p-5">
          <div className= ' text-end p-3 bg-green-300 rounded-3xl ' > variable return</div>
        </div>

        <div className='flex flex-row lg:flex-row   items-start justify-between w-full px-5 py-3'>
            <div className='text-green-700 text-xl' >period</div>
            <div className='text-green-700 text-xl'>6 Month</div>
        </div>

        <div className='flex flex-row lg:flex-row   items-start justify-between w-full px-5 py-3'>
            <div className='text-green-700 text-xl'>Rertun</div>
            <div className='text-green-700 text-xl'>22% - 6.7%</div>
        </div>

        <div className='flex flex-row lg:flex-row   items-start justify-between w-full px-5 py-3'>
            <div className=' text-2xl'>Total Return</div>
            <div className='text-2xl'>$10,375 - $10,425</div>
        </div>
      </div>


      <div className='lg:w-1/3 shadow-lg  bg-white h-100 rounded-lg border-white border-4  flex flex-col items-center justify-center '>
        <div className=" h-auto  rounded-t-lg overflow-hidden relative">
          <Image
            src={investmentpic}
            alt="Profile"


            objectFit='cover'
            className="rounded-t-lg  object-cover w-full h-full overflow-clip"
          />
          <div className=' container absolute  w-full   bottom-0  flex flex-col items-start lg:flex-col lg:space-y-2   lg:justify-end lg:items-end justify-start ' >

          <div className='flex flex-row  lg:flex-row   items-end justify-between w-full px-5 py-3'>
            <div className='text-white text-2xl' >Cow-10</div>
            <div className='text-white text-xl'>$ 10,000 BDT</div>
        </div>

        <div className='flex flex-row lg:flex-row   items-end justify-between w-full px-5 py-3'>
            <div className='text-white text-2xl' >Bogura</div>
            <div className='text-white text-xl'>BDT/Unit</div>
        </div>

          </div>


        </div>
        <div className=" h-auto w-full flex flex-col justify-end items-end lg:justify-end lg:items-end bg-white rounded-b-lg p-5">
          <div className= ' text-end p-3 bg-green-300 rounded-3xl ' > variable return</div>
        </div>

        <div className='flex flex-row lg:flex-row   items-start justify-between w-full px-5 py-3'>
            <div className='text-green-700 text-xl' >period</div>
            <div className='text-green-700 text-xl'>6 Month</div>
        </div>

        <div className='flex flex-row lg:flex-row   items-start justify-between w-full px-5 py-3'>
            <div className='text-green-700 text-xl'>Rertun</div>
            <div className='text-green-700 text-xl'>22% - 6.7%</div>
        </div>

        <div className='flex flex-row lg:flex-row   items-start justify-between w-full px-5 py-3'>
            <div className=' text-2xl'>Total Return</div>
            <div className='text-2xl'>$10,375 - $10,425</div>
        </div>
      </div>


    </div>


  </section>
  )
}

export default HomeLoanSection
