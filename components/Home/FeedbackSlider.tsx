'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image, { StaticImageData } from 'next/image';
import { Autoplay, Navigation } from 'swiper/modules';
import { GiBullHorns } from 'react-icons/gi';
// import Link from 'next/link';
// import insureCow2 from '../../public/insurancecow.svg';
import farmerPic from '../../public/farmerPic.jpg';
import farmerPic2 from '../../public/farmerimg.jpg';
import { useRef } from 'react';
import { HiMiniArrowLongLeft } from "react-icons/hi2";



interface CarouselProps {
    slides: StaticImageData[];
    slideTexts: string[];  // Array of image URLs
    styleHtmlText: React.JSX.Element[];  // Array of image URLs
}

const FeedbackSlider = ({ slides }: CarouselProps) => {

    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    return (
        <div className=' container mx-auto flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:items-center  w-full lg:h-[70vh] h-auto p-5'>



            <div className=" flex-1 flex flex-col justify-center items-center lg:max-w-4xl text-center">
                <GiBullHorns className='lg:w-auto w-full  text-2xl text-start text-green-700 mb-2' />

                <h2 className="text-xl font-bold text-[#687469] text-start mb-3">Our Testimonials</h2>
                <h1 className="lg:text-5xl min-w-[150px] font-bold text-[#334b35] mb-10 text-start">What They’re Talking About InsureCow</h1>



                <div className='flex gap-3 mb-10'>
                    <button
                        ref={nextRef}
                        className=" group bg-gray-500/20 hover:bg-gray-500 text-white p-2 rounded-full  "
                    >
                        <HiMiniArrowLongLeft className='text-xl hover:text-white   text-gray-500 ' />
                    </button>
                    <button
                        ref={prevRef}
                        className=" bg-gray-500/20 text-white hover:bg-gray-500 p-2 rounded-full"
                    >
                        <HiMiniArrowLongLeft className='text-xl  hover:text-white rotate-180  text-gray-500 ' />
                    </button>

                </div>


            </div>


            <Swiper
                onSlideChange={(swiper) => {

                }
                }
                onSwiper={(swiper) => {
                    // Delay setting navigation elements to avoid null references
                    setTimeout(() => {
                        if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }
                    })


                }}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}

                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                pagination={{ clickable: false }}
                autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay with 3-second delay
                modules={[Navigation, Autoplay]} // Add Autoplay module
                className="flex-1 w-full lg:h-auto   lg:justify-center lg:items-center"
            >
                {slides.map((s, index) => (
                    <SwiperSlide key={index}
                    >

                        {/* Wrap the entire slide in a motion.div */}
                        <div className='w-full  flex flex-col justify-center items-center lg:flex-row  lg:justify-center lg:items-center  gap-5'>


                            <div className='lg:w-1/2 w-2/3 p-11 h-full bg-white text-start rounded-lg shadow-lg  border-[#F6F4EC]  hover:border-b-4 hover:border-b-green-700'
                            >

                                <div className='w-full h-full flex flex-col text-gray-500 items-center justify-center lg:flex-col lg:items-center lg:justify-between '>
                                    <p className='text-gray-5 font-medium leading-relaxed line-clamp-6'>Lorem ipsum dolor sit amet, nsectetur adipisicing elit. Voluptas, esse. Itaque, odio quibusdam facere a hic iure, explicabo, nam modi accusantiuconsectetur adipisicing elit. Voluptas, esse. Itaque, odio quibusdam facere a hic iure, explicabo, nam modi accusantiu</p>

                                    <div className='mt-5 lg:mt-5 flex flex-col justify-center items-center lg:flex-row lg:justify-start lg:items-center w-full'>

                                        <div className="h-10 w-10 lg:w-20  lg:h-20 rounded-full ">
                                            <Image
                                                src={farmerPic2}
                                                alt="Profile"


                                                objectFit='Content'
                                                className="rounded-full object-cover w-10 h-10 lg:h-20 lg:w-20 "
                                            />
                                        </div>

                                        <div className='flex flex-col   lg:flex-col mx-5 ' >
                                            <span className='text-[#6b9672] font-bold'>Kevin Martin</span>
                                            <span className='text-[#717571] from-neutral-500' >Farmer</span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className='lg:w-1/2 w-2/3 p-11 h-full bg-white text-start rounded-lg shadow-lg  border-[#F6F4EC]  hover:border-b-4 hover:border-b-green-700'
                            >

                                <div className='w-full h-full flex flex-col text-gray-500 items-center justify-center lg:flex-col lg:items-center lg:justify-between '>
                                    <p className='text-gray-5 font-medium leading-relaxed line-clamp-6'>Lorem ipsum dolor sit amet, nsectetur adipisicing elit. Voluptas, esse. Itaque, odio quibusdam facere a hic iure, explicabo, nam modi accusantiuconsectetur adipisicing elit. Voluptas, esse. Itaque, odio quibusdam facere a hic iure, explicabo, nam modi accusantiu</p>

                                    <div className='mt-5 lg:mt-5 flex flex-col justify-center items-center lg:flex-row lg:justify-start lg:items-center w-full'>

                                        <div className="h-10 w-10 lg:w-20  lg:h-20 rounded-full ">
                                            <Image
                                                src={farmerPic}
                                                alt="Profile"


                                                objectFit='Content'
                                                className="rounded-full object-cover w-10 h-10 lg:h-20 lg:w-20 "
                                            />
                                        </div>

                                        <div className='flex flex-col   lg:flex-col mx-5 ' >
                                            <span className='text-[#6b9672] font-bold'>Kevin Martin</span>
                                            <span className='text-[#717571] from-neutral-500' >Farmer</span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}

export default FeedbackSlider
