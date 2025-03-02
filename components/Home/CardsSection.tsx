import React from 'react';
import Image from 'next/image';
import cardImage1 from '../../public/farmManagement.jpg';
import cardImage2 from '../../public/insurance.jpg';
import aibg from '../../public/aibg.jpg';
import Link from 'next/link';


const CardsSection: React.FC = () => {


  return (
    <section className='  h-screen lg:h-auto    flex lg:items-center lg:justify-center flex-col mt-20 mb-28 lg:mt-20 lg:mb-28 lg:flex-row w-auto lg:w-auto gap-8  lg:px-24'>
      <Link href="/insurance"  key={1} className='rounded-lg flex-1 relative lg:h-[32vh]  group cursor-pointer'>
        <Image
          src={cardImage2}
          alt={`Card ${0 + 1}`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />

        <div className='absolute inset-0 rounded-lg group-hover:bg-black/50 transition duration-500 bg-opacity-50 flex justify-start items-start'></div>
        <div className='absolute inset-0 lg:bottom-10 flex justify-center items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          
            <div className='bg-green-900 text-white p-4 rounded-lg cursor-pointer'>Learn More</div>
        
        </div>
        <div className='absolute inset-0 top-16 left-10 rounded-lg   bg-opacity-50 flex justify-start items-start'>
          <div className='flex flex-col space-y-4 text-start group-hover:opacity-15'>
            <h2 className='text-white text-xl font-light italic'>Secure Entitlement</h2>
            <h2 className='text-white text-2xl lg:font-3xl font-bold'>Insurance</h2>
          </div>


        </div>
      </Link>

      <Link href="/service/farm_management" key={2} className='rounded-lg flex-1 relative h-auto w-full lg:h-[32vh] group'>
        <Image
          src={cardImage1}
          alt={`Card ${0 + 1}`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
         <div className='absolute inset-0 rounded-lg bg-black/50 transition duration-500 bg-opacity-50 flex justify-start items-start'></div>
        <div className='absolute inset-0 rounded-lg group-hover:bg-black/50 transition duration-500 bg-opacity-50 flex justify-start items-start'></div>
        <div className='absolute inset-0 lg:bottom-10 flex justify-center items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          
            <div className='bg-green-900 text-white p-4 rounded-lg'>Learn More</div>
     
        </div>
        <div className='absolute inset-0 top-16 left-10 rounded-lg   bg-opacity-50 flex justify-start items-start'>
          <div className='flex flex-col space-y-4 text-start group-hover:opacity-15'>
            <h2 className='text-white text-xl font-light italic'>Nurture & Growth</h2>
            <h2 className='text-white text-2xl lg:font-3xl font-bold'>Farm managment</h2>
          </div>


        </div>
      </Link>

      <Link href="/service/aimuzzel" key={3} className='rounded-lg flex-1 relative h-64 lg:h-[32vh] group'>
        <Image
          src={aibg}
          alt={`Card ${0 + 1}`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />

        <div className='absolute inset-0 rounded-lg group-hover:bg-black/50 transition duration-500 bg-opacity-50 flex justify-start items-start'></div>
        <div className='absolute inset-0 lg:bottom-10 flex justify-center items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
         
            <div className='bg-green-900 text-white p-4 rounded-lg'>Learn More</div>
        
        </div>
        <div className='absolute inset-0 top-16 left-10 rounded-lg   bg-opacity-50 flex justify-start items-start'>
          <div className='flex flex-col space-y-4 text-start group-hover:opacity-15'>
            <h2 className='text-white text-xl font-light italic'>Digital Asset</h2>
            <h2 className='text-white max-w-40 text-2xl lg:font-3xl font-bold'>AI-Powered Livestock Identification</h2>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default CardsSection;
