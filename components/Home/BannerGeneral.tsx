// import Link from 'next/link'
import React,{ ReactNode } from 'react';
// import bannerImage from '../../public/brandingbg.jpg';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface AppBrandingProps {
  title?: string;
  description?: string;
  bannerUrl: string | StaticImport;
  customStyles?: React.CSSProperties;
  children: ReactNode; 


}

const BannerGeneral = ({children , bannerUrl}:AppBrandingProps) => {
  return (
    <div className="relative w-full h-[50vh] lg:h-[50vh] md:h-[40vh]">
    <Image
      src={bannerUrl}
      alt="Banner"
      layout="fill"
      objectFit="cover"
      objectPosition="center"
      className="absolute inset-0 z-0"
    />
   {children}
  </div>
  )
}

export default BannerGeneral
