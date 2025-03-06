import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link';


interface ServiceHighlightedProps {
  title: string;
  description: string;
  reverse?: boolean;
  image: StaticImageData;
  url: string;
}

const ServiceHighlighted: React.FC<ServiceHighlightedProps> = ({ url,image, title, description, reverse }) => {
  return (
    <div className={`container mx-auto flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} justify-center items-center p-5`}>
      <Link href={url} className='w-full lg:w-auto flex justify-center items-center relative group'>
        <Image
          src={image}
          alt='Service Highlight'
          width={500}
          height={300}
          className='rounded-lg object-cover'
        />
        <div className=" absolute inset-0 bg-black bg-opacity-0  group-hover:bg-opacity-50 transition-opacity duration-300 rounded-lg flex justify-center items-center">
          <span className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">+</span>
        </div>
      </Link>
      
      <div className='w-full lg:w-1/2 flex flex-col justify-center items-start p-5'>
        <h2 className='text-2xl lg:text-4xl font-bold text-[#334b35] mb-4'>{title}</h2>
        <p className='text-lg lg:text-xl text-gray-500'>
          {description}
        </p>
      </div>
    </div>
  )
}

export default ServiceHighlighted
