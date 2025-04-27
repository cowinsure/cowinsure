import React from 'react';
import Image from 'next/image';
import bannerImage from '../../public/aibg.png'; // Replace with your actual image path

import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface AppBrandingProps {
  title?: string;
  description?: string;
  bannerUrl: string | StaticImport;
  customStyles?: React.CSSProperties;
  link?:string

}

const ServiceHeroSection: React.FC<AppBrandingProps> = ({ title, description, customStyles = "relative w-full h-[50vh] lg:h-[100vh]" ,bannerUrl}) => {
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
            <span className='text-white'>AI-Driven Solutions,</span> <span className=''>Transforming Tomorrow.</span> 
          </h1>
        )}
        {description ? (
          <p className="text-lg lg:text-2xl mb-6 lg:w-full lg:text-[36px]">{description}</p>
        ) : (
          <p className="text-lg lg:text-2xl mb-6  lg:text-[28px]">
            Join us in making a difference - your investment can uplift communities and transform millions of lives for the better.
          </p>
        )}
        
      </div>
    </div>
  );
};

export default ServiceHeroSection;
