import React, { useEffect, useRef } from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

if(typeof window !== 'undefined'){
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceHighlightedProps {
  title: string;
  description: string;
  reverse?: boolean;
  image: StaticImageData;
  url: string;
}


const ServiceHighlighted: React.FC<ServiceHighlightedProps> = ({ url,image, title, description, reverse }) => {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(imageRef.current, {
        x: reverse ? 100 : -100,
        opacity: 0,
      })

      gsap.set(textRef.current, {
        y: -50,
        opacity: 0,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      tl.to(imageRef.current, {
        duration: 1.2,
        x: 0,
        opacity: 1,
        ease: "power2.out",
      })

      tl.to(
        textRef.current,
        {
          duration: 0.8,
          y: 0,
          opacity: 1,
          ease: "power2.out",
        },
        "-=0.6",
      )
    }, containerRef)

    return () => ctx.revert()
  }, [reverse])

  return (
    <div ref={containerRef} className={`container mx-auto flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} justify-center items-center p-5`}>
      <div ref={imageRef} className='w-full lg:w-auto flex justify-center items-center '>
        <Link className='relative group' href={url}>
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
      </div>
      
      <div ref={textRef} className='w-full lg:w-1/2 flex flex-col justify-center items-start p-5'>
        <h2 className='text-2xl lg:text-4xl font-bold text-[#334b35] mb-4'>{title}</h2>
        <p className='text-lg lg:text-xl text-gray-500'>
          {description}
        </p>
      </div>
    </div>
  )
}

export default ServiceHighlighted
