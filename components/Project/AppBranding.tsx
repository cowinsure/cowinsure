import React from 'react';
import Image from 'next/image';
import bannerImage from '../../public/many-wooden-people-figures-under-umbrella-on-yello.jpg'; // Replace with your actual image path
import Link from 'next/link';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface AppBrandingProps {
  title?: string;
  description?: string;
  bannerUrl: string | StaticImport;
  customStyles?: React.CSSProperties;
  link?:string

}

const AppBranding: React.FC<AppBrandingProps> = ({ title, description, customStyles = "relative w-full h-[50vh] lg:h-[100vh]" ,bannerUrl ,link }) => {
  return (
    <div className={`${customStyles}`}>
      <Image
        src={bannerUrl}
        placeholder='blur'
        blurDataURL={bannerImage.src}
        alt="Banner"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="absolute inset-0 z-0"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-30 text-white text-center p-5">
        {title ? (
          <h1 className="text-4xl lg:text-6xl font-semibold mb-4">
            <span className='text-white'>{title}</span>
          </h1>
        ) : (
          <h1 className="text-4xl lg:text-6xl font-semibold mb-4 lg:text-[109px]">
            <span className=' text-green-800'>Empowering Communities,</span> <span className=''>Simplified.</span> 
          </h1>
        )}
        {description ? (
          <p className="text-lg lg:text-2xl mb-6 lg:w-full lg:text-[36px]">{description}</p>
        ) : (
          <p className="text-lg lg:text-2xl mb-6  lg:text-[28px]">
            Join us in making a difference - your investment can uplift communities and transform millions of lives for the better.
          </p>
        )}

          {link ?
          <div className="flex space-x-4">
          {/* <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md">Learn More</button> */}
          <Link href={`${link}`}>
            {/* <button className="px-4 py-2 bg-white hover:bg-gray-200 text-green-600 font-semibold rounded-md">Get Started</button> */}
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md">Learn More</button>
          </Link>
        </div>
          
          :<></>}

        
      </div>
    </div>
  );
};

export default AppBranding;
