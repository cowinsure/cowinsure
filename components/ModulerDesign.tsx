import React from 'react';
import Link from 'next/link';

const ModulerDesign = (
  <div className="relative z-10 flex flex-row items-center justify-center h-full bg-black bg-opacity-50 text-white text-center">
    <div className='flex flex-1 item-center lg:justify-center lg:items-center h-full justify-center'>
      <h1 className="text-4xl lg:text-6xl font-semibold">
        <span className='text-white'>What Sets </span> InsureCow Apart
      </h1>
    </div>
    <div className='flex flex-col item-center flex-1 lg:justify-center lg:items-center backdrop-blur-lg bg-gradient-to-r from-green-900/80 to-[#16351810] h-full justify-center text-center gap-4' style={{ clipPath: 'ellipse(90% 90% at 50% 50%)' }}>
      <p className="text-lg lg:text-2xl mb-6 lg:max-w-[70vh]">
        Our product innovates every aspect of smallholder financing from how the loan is disbursed, how the returns are shared and how the risk is priced and managed.
      </p>
      <div className="flex space-x-4">
        <Link href="/about_us">
          <button className="px-4 py-2 bg-white hover:bg-gray-200 text-green-600 font-semibold rounded-md">Learn More</button>
        </Link>
      </div>
    </div>
  </div>
);

export default ModulerDesign;
