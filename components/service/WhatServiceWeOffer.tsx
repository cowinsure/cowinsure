'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image, { StaticImageData } from 'next/image';
import { Autoplay, Navigation } from 'swiper/modules';
import { GiBullHorns } from 'react-icons/gi';

interface ParentProps {

  slider:SliderProps[]
}

interface SliderProps{
    title:string,
    description:string,
    image:StaticImageData
}

const WhatServiceWeOffer = ({ slider}: ParentProps) => {
//   const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(null);





  return (
    <div className='container mx-auto flex flex-col justify-center items-center lg:flex-col lg:justify-center lg:items-center w-full lg:h-auto h-auto p-5'>
      <div className="flex-1 flex flex-col justify-center items-center max-w-4xl text-center w-full">
        <GiBullHorns className='lg:w-auto w-full text-2xl text-start text-green-700 mb-2' />
        <h2 className="text-xl font-bold text-[#687469] text-start mb-3">Services</h2>
        <h1 className="lg:text-5xl text-2xl min-w-[150px] mb-5 font-bold text-[#334b35]  text-start">What We Offer</h1>
        <p className='text-center font-semibold text-gray-500 mb-10 text-xl lg:text-2xl lg:max-w-[80vh]'>
            Our services are tailored to overcome challenges.
        </p>
      </div>
      
     

      <Swiper
       centeredSlides={true}
       slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        

        spaceBetween={50}
        loop={slider.length > 1}
        pagination={{ clickable: false }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Navigation, Autoplay]}
        className="flex-1 w-full lg:h-auto justify-center items-center lg:justify-center lg:items-center"
      >
        {slider.map((s, index) => (
          <SwiperSlide key={index}>
            {/* <div className="relative flex-col lg:w-auto lg:h-auto cursor-pointer group">
              <Image
              src={s.image}
              alt="Profile"
              objectFit='cover'
              className="rounded-md object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-md flex justify-center items-center">
              <span className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">+</span>
              </div>
            </div>

            <div className='text-start'>
            <h1 className="lg:text-2xl text-xl min-w-[150px] mb-5  font-bold text-[#334b35]  text-start">{s.title}</h1>
        <p className='text-start font-semibold text-gray-500  text-xl '>
        {s.description}

            </p>

            </div> */}
             <div className='relative flex-col w-[300px] h-[600px]  justify-center items-center group  bg-[#263c28] rounded-lg'>

<div className='relative h-auto round-lg '>
    <div className='relative h-[200px]  rounded-t-lg   overflow-hidden'>
        <div className='absolute h-full rounded-t-lg inset-0 bg-contain left-0 group-hover:-left-4 transition-all duration-700'>
            <Image
          src={s.image}
          alt='cover'
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
          unoptimized
          priority
            />
            <div className='absolute rounded-t-lg bg-green-800 bg-opacity-40 top-0 left-[50%] transform -translate-x-[50%] w-0 h-full group-hover:w-full transition-all duration-500 ease-in-out overflow-hidden'>
            </div>
        </div>



    </div>
    {/* project title */}
    <div className=' absolute bottom-[-55px] left-0 right-0 z-50  mx-5  overflow-hidden group-hover:overflow-visible flex justify-center items-center'>
        <div className='relative z-20 flex flex-col h-[100px] w-[100px] justify-center items-center bg-[#263c28] rounded-full text-2xl font-bold text-white'>
            <span className='z-50 text-yellow-600 group-hover:text-white transition-all duration-500'>Project</span>
            <span className='z-50'>101</span>

            <div className='absolute inset-0 flex justify-center items-center'>
                <div className='w-0 h-0 z-30 bg-yellow-500 rounded-full group-hover:w-full group-hover:h-full  transition-all duration-500'></div>
            </div>
            {/* <div className='absolute invisible bottom-[100%] z-10 bg-black w-full group-hover:visible group-hover:bottom-[-31px] transition-all duration-500'>hellow</div> */}
        </div>


    </div>
    <div className=' absolute bottom-[-60px] left-0 right-0 z-30  mx-5  overflow-hidden group-hover:overflow-visible flex justify-center items-center'>
        <div className='relative z-20 flex flex-col h-[100px] w-[100px] justify-center items-center bg-[#2b442d] rounded-full text-2xl font-bold text-white'>

            {/* <div className='absolute invisible bottom-[100%] z-10 bg-black w-full group-hover:visible group-hover:bottom-[-31px] transition-all duration-500'>hellow</div> */}
        </div>


    </div>
</div>
<div className='w-0 shadow-lg group-hover:w-full transition-all duration-500 border-2 border-transparent group-hover:border-yellow-400 mx-auto'></div>
<div className='mt-10'>

    {/* period */}
    <div className='mt-20 text-center p-2 text-white'>
    <h1 className="lg:text-2xl text-xl min-w-[150px] mb-5  font-bold text-white  text-start">{s.title}</h1>


    <p className='text-start font-semibold   text-md '>
        {s.description}

            </p>
    </div>

 
</div>



</div>
          </SwiperSlide>
        ))}
      </Swiper>
{/* 
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative max-w-3xl max-h-3xl w-full h-full p-4">
            <button className="absolute top-2 right-2 text-white text-2xl" onClick={closeOverlay}>×</button>
            <Image
              src={selectedImage}
              alt="Selected"
              objectFit='contain'
              className="rounded-md"
              layout="responsive"
              width={800}
              height={600}
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default WhatServiceWeOffer;
