'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion

import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
// import { GiBullHorns } from 'react-icons/gi';
import Link from 'next/link';
import { HiMiniArrowLongLeft } from "react-icons/hi2";


// Define the type for the props


interface SliderData {
  id: number;
  title: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  data: SliderData[];
  status: string;
}

const SwiperComponent = () => {
  const [activeIndex, setActiveIndex] = useState(5);
  const [sliderData, setSliderData] = useState<SliderData[]>([]);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);


  const [number, setNumber] = useState("");

  useEffect(() => {
    setNumber(prevNumber => prevNumber + Date());


  }, [activeIndex]);





  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/slider/`);
        const result: ApiResponse = await response.json();
        if (result.status === 'success') {
          setSliderData(result.data);
        }
      } catch (error) {
        console.error('Error fetching slider data:', error);
      } finally {
        // setLoading(false);
      }
    };

    fetchSliderData();
  }, []);




  return (
    <div className='relative w-full h-auto md:h-full  lg:h-auto mb-[320px]  lg:mb-[120px] mt-[8vh]'>

      <div className='absolute right-4 bottom-4 top-auto lg:right-16 lg:bottom-0 lg:top-10 z-50 flex gap-3 mb-10 lg:flex-col lg:justify-center'>
        <button
          ref={nextRef}
          className="group hover:border-white text-white p-2 lg:p-4 rounded-full border-2 border-gray-500/20"
        >
          <HiMiniArrowLongLeft className='text-lg lg:text-xl hover:text-white text-gray-500' />
        </button>
        <button
          ref={prevRef}
          className="group hover:border-white text-white p-2 lg:p-4 rounded-full border-2 border-gray-500/20"
        >
          <HiMiniArrowLongLeft className='text-lg lg:text-xl hover:text-white rotate-180 text-gray-500' />
        </button>
      </div>
      {/* <div className='absolute left-16 bottom-0 top-10 z-50 flex flex-col gap-3 bg-black mb-10 lg:justify-center items-center'>
        <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets flex flex-col gap-2 items-center">
          {sliderData.map((_, index) => (
        <button
          key={index}
          className={`swiper-pagination-bullet ${index === activeIndex ? 'swiper-pagination-bullet-active' : ''}`}
          onClick={() => setActiveIndex(index)}
          style={{
        width: index === activeIndex ? '20px' : '10px',
        height: index === activeIndex ? '20px' : '10px',
        borderRadius: '50%',
        backgroundColor: index === activeIndex ? 'white' : 'gray',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
          }}
        >
          <span className="text-white"></span>
        </button>
          ))}
        </div>
      </div> */}


      <Swiper
        onSlideChange={() => {

          setActiveIndex(activeIndex + 1);
        }}
        onSwiper={(swiper) => {
          // Delay the first slide change
          setTimeout(() => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          })
        }}

        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={3000}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="absolute top-0 left-0 w-full lg:h-auto bg-black"
      >
        {sliderData.map((s, index) => (
          <SwiperSlide key={index }>
            <AnimatePresence mode="popLayout" key={index}>
              <motion.div
                key={activeIndex + Date()}
                initial={{ scale: 1, opacity: 0 }}
                animate={index === activeIndex ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 3, ease: 'easeIn' }}
                className="flex w-auto justify-center flex-col lg:justify-center lg:items-center h-auto lg:w-full lg:h-auto"
              >
                <Image
                  objectPosition="top"
                  src={s.image_url}
                  objectFit='cover'
                  alt={`Slide ${index + 1}`}
                  // className="w-full object-cover h-[800px] lg:h-[500px]"
                  className="w-full object-cover h-[800px] lg:h-[90vh]"
                  width={1920} // Add appropriate width
                  height={1080} // Add appropriate height
                  priority // Add this line to prioritize loading
                />
              </motion.div>

              <div className="absolute z-50 top-0 flex-col overflow-hidden h-full  bottom-0 md:left-0  flex items-center justify-start lg:justify-center lg:items-center lg:flex-col md:justify-center space-y-9 md:flex-col bg-black bg-opacity-20 w-full">




                {/* <motion.div
                  animate={{ y: [0, -20, 0], opacity: [1, 0.5, 1] }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                  className='text-center'><GiBullHorns className='mt-20 text-5xl text-white' /></motion.div> */}
                <div className='items-center '>

                </div>
                <motion.p
                  key={number}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                  duration: 1,
                  delay: 2 * 0.5, // Delay for staggering
                  ease: "easeOut",
                  }}
                  className="text-white text-center text-lg font-bold lg:text-[40px] md:text-5xl "
                >
                 
                  {s.title}
                  </motion.p>
                  <motion.div
                    key={activeIndex+ Date()} // Ensure the animation restarts with each slide
                    initial={{ width: 0 }}
                    animate={{ width: '50%' }}
                    transition={{
                      duration: 1,
                      delay: 3, // Wait for the text to appear first
                      ease: "easeOut",
                    }}
                    className="h-1 bg-white mt-2"
                  />

                <motion.div
                  key={Math.floor(Math.random() * 100)}
                  initial={{ y: 250, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 3,
                    delay: 0.1, // Delay for staggering
                    ease: "easeOut",

                  }}
                  className="relative text-center p-3   lg:w-[150px] lg:h-[50px] bg-green-200 text-green-800/75 font-bold rounded-md overflow-hidden group cursor-pointer flex items-center justify-center">
                  <Link href='/project' className="relative z-10 group-hover:text-white transition-colors rounded-md duration-300">Discover Now</Link>
                  <div className=" absolute inset-0 bg-green-800/20 transform -translate-x-[-145px] rounded-md group-hover:translate-x-0 group-hover:bg-green-800 transition-transform duration-300 ease-in-out"></div>
                </motion.div>



              </div>

            </AnimatePresence>
          </SwiperSlide>
        ))}
      </Swiper>

      <motion.div 
      
     
      initial={{ y: 250, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 3,
        delay: 0.1, // Delay for staggering
        ease: "easeOut",

      }}
      
      className=" absolute right-0 w-full bottom-[-200px] lg:bottom-[-100px] lg:right-0  md:left-0   lg:w-full z-10 flex flex-col lg:flex-row  rounded-lg">


        <div className="shadow-md flex items-center lg:h-32 bg-white  flex-col lg:flex-row  gap-0 justify-between w-full lg:mx-20 rounded-lg">
          <div className="p-6 flex-1 flex justify-center items-center h-20 lg:h-auto">
            <div className='items-center mr-4'>
              {/* <GiBullHorns className='text-5xl text-green-600' /> */}
            </div>
            <div className='flex flex-col justify-start items-start'>
              <h3 className="font-semibold text-xl text-[#334B35]">Farmers Impacted</h3>
              <p className="text-sm mt-2 text-[#687469]">4,136</p>
            </div>
          </div>


          <div className="w-full lg:h-full lg:w-[2px] h-[2px]  bg-gray-200 my-4 lg:my-0" />


          <div className="p-6 flex-1 flex justify-center items-center h-35 lg:h-auto">
            <div className='items-center mr-4'>
              {/* <GiBullHorns className='text-5xl text-green-600' /> */}
            </div>
            <div className='flex flex-col justify-start items-start'>
              <h3 className="font-semibold text-xl text-[#334B35]">Loan Disbursed</h3>
              <p className="text-sm mt-2 text-[#687469]">$800K</p>
            </div>
          </div>

          <div className="w-full lg:h-full lg:w-[2px] h-[2px]  bg-gray-200 my-4 lg:my-0" />


          <div className="p-6 flex-1 flex justify-center items-center h-35">
            <div className='items-center mr-4'>
              {/* <GiBullHorns className='text-5xl text-green-600' /> */}
            </div>
            <div className='flex flex-col justify-start items-start'>
              <h3 className="font-semibold text-xl text-[#334B35]">Fradulent Claims</h3>
              <p className="text-sm mt-2 text-[#687469]">Zero</p>
            </div>
          </div>


          <div className="w-full lg:h-full lg:w-[2px] h-[2px]  bg-gray-200 my-4 lg:my-0" />


          <div className="p-6 flex-1 flex justify-center items-center h-35">
            <div className='items-center mr-4'>
              {/* <GiBullHorns className='text-5xl text-green-600' /> */}
            </div>
            <div className='flex flex-col justify-start items-start'>
              <h3 className="font-semibold text-xl text-[#334B35]">Farm Animal</h3>
              <p className="text-sm mt-2 text-[#687469]">1,2345</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SwiperComponent;
