'use client'
import AppBranding from '@/components/Project/AppBranding'
import React, { useEffect, useState } from 'react'
import banner from '../../public/farmers-with.jpg';
import bannerGenereal from '../../public/farmerfieldimg.jpeg';
import bannerGenereal2 from '../../public/back-view-of-filipino-local-farmers-2025-01-07-23-27-27-utc.jpg';
import { GiBullHorns } from 'react-icons/gi';
import FaqSection from '@/components/Home/FaqSection';
import ContactUs from '@/components/Helper/ContactUs';
import CoreValueSection from '@/components/AboutPage/CoreValueSection';
import BannerGeneral from '@/components/Home/BannerGeneral';
import AwardRecognitionSection from '@/components/Helper/AwardRecognitionSection';
import ServiceHighlighted from '@/components/common/ServiceHighlighted';
import Image from 'next/image';


const mission  = "Our mission is to promote financial inclusion for smallholder farmers by providing accessible, innovative insurance and financial products. We aim to empower underserved farming communities with technol-ogy-driven solutions, enhancing their ability to mitigate risks, increase productivity, and achieve long-term economic resilience"
const vision  = "Our vision is to ensure that smallholder farmers in emerging economies have access to financial services, cutting-edge technology, and essential information, fostering a sustainable and prosperous agricultural sector."

interface ExtraData{
  url: string;
  heading: string;
  description: string;
}

interface BaseCard {
  id: number;
  name: string;
  category: string;
  image_url: string;
  extra_data: ExtraData;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface BaseCardApiResponse {
  status: string;
  message: string;
  data: BaseCard[];
}

interface BaseCategory {
  id: string;
  name: string;
  description: string;
}

interface BaseCategoryApiResponse {
  status: string;
  message: string;
  data: BaseCategory[];
}

const AboutUs: React.FC = () => {

const [aboutUsData, setAboutUsData] = useState<BaseCard[]>([]);
useEffect(()=>{
  const fetchBaseCategories = async()=>{
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/base-categories/`);
      const result: BaseCategoryApiResponse =await response.json();
      if(result.status === 'success'){
        const AboutUsCategory = result.data.find(category => category.name ==="About Us - Home Section");
        if(AboutUsCategory){
          fetchBaseCards(AboutUsCategory.id)
        }
      }
    }catch(error){
      console.error("Error fetching base categories: ",error);
    }
  };
  const fetchBaseCards = async(categoryId: string)=>{
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/base-category/${categoryId}/base-cards/`);
      const result: BaseCardApiResponse = await response.json();
      if(result.status=== 'success'){
        setAboutUsData(result.data)
      }

    }catch(error){
      console.error("Error fetching base cards: ",error);
    }
  };
  fetchBaseCategories();
},[]);

  return (
    <div className=' lg:h-auto h-auto'>
        <AppBranding title="Stronger Together, Enriching Farmers' Future!" bannerUrl={banner}  />

        <div className='min-h-[600px] p-14 mb-10'>
      {aboutUsData.map((item , index)=>(
        <div key={index} className='flex flex-col lg:flex-row lg:justify-around md:flex-col w-full lg:pt-10 mt-[280px] lg:mt-2 '>
<div  className='flex-1 w-full lg:w-1/2 lg:pr-10 pb-10 flex justify-center  lg:justify-center items-center relative'>
        {/* <div className='absolute rounded-full  bg-[#fcf4e6] lg:right-[35vh] right-[65px]  h-[300px] w-[300px] lg:h-[500px] lg:w-[500px]  '></div> */}
        {/* <motion.div
          animate={{ y: [1, -10, 1], opacity: [1, 0.5, 1] }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}

          className='absolute rounded-full   lg:bottom-[150px] lg:right-[19vh] bottom-[80px] right-[40px]  h-[10vh] w-[10vh] lg:h-[15vh] lg:w-[15vh]  bg-green-900'></motion.div> */}

        <div className='relative px-10  '>

          <div className="relative z-30 h-[300px] w-[300px] lg:h-[500px] lg:w-[500px] overflow-hidden border-gray-300 rounded-[5px] group">
            <Image
              src={item.image_url}
              alt={item.name}
              height={200}
              width={300}
              className="w-full h-full rounded-md object-cover"
              unoptimized
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-0 h-full bg-white bg-opacity-20 transform group-hover:w-full transition-all duration-500 ease-in-out"></div>
            </div>
          </div>

          {/* <motion.div
            animate={{ y: [1, -10, 1], opacity: [1, 0.5, 1] }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
            }} className='absolute bg-green-800 z-20 lg:left-[0px] left-5 bottom-10 rounded-md h-[200px] w-[120px] lg:h-[250px] lg:w-[200px]'>

          </motion.div>
          <div className='absolute bg-transparent z-40 px-16 left-[0px] right-0 lg:bottom-[-60px] bottom-0 rounded-md h-[100px] w-full lg:h-[250px] lg:w-full flex justify-center items-center'>
            <div className='w-full  bg-green-800 flex flex-row gap-4  justify-center items-center p-4 rounded-md '>

              <div className='flex flex-col items-center'>
                <span className='text-white text-3xl'>4,136</span>
                <span className='text-white text-md'>Farmer Benefited</span>

              </div>

            </div>

          </div> */}
        </div>


      </div>
      <div  className='pl-2 pr-2 flex-1 w-full lg:w-1/2 text-start'>
        <GiBullHorns className='w-auto text-3xl text-green-700 mb-3 pl-2 pr-2' />
        <span className="pl-2 pr-2 text-sm text-[#687469] uppercase font-semibold">get to know about us</span>
        <h2 className="text-4xl lg:text-5xl font-bold text-[#334b35] mt-2 max-w-xl pl-2 pr-2">
          {item.name}
        </h2>
        <p className="mt-5 pl-2 pr-2 text-xl text-[#687469] ">
          {item.extra_data.heading}
        </p>
        <p className="space-y-3 mb-8 pt-5 pl-2 pr-2 text-[18px] text-[#334b35]">
          {item.extra_data.description}
        </p>
        

      </div>

        </div>
      ))}
    </div>

    <ServiceHighlighted url='' image={bannerGenereal} title='Our Mission' description={mission} reverse/>
    <ServiceHighlighted url='' image={bannerGenereal2} title='Our Vision' description={vision} />

        
        <div className='h-auto lg:h-auto lg:pt-10 md:h-auto bg-[#F7F7F7]'>

          <CoreValueSection/>

        {/* <TeamSection /> */}

        <BannerGeneral bannerUrl={bannerGenereal}>
        <div className="relative z-10 flex flex-row items-center justify-center h-full bg-black bg-opacity-50 text-white text-center ">
          <div className='flex flex-1 item-center  lg:justify-center lg:items-center    justify-center '>
            <h1 className=" text-xs lg:text-6xl font-semibold "> <span className='text-white'>JOIN US ON THE PATH TO SUSTAINABLE AGRICULTURE</span></h1>
          </div>
          <div className='flex flex-col item-center flex-1 lg:justify-center lg:items-center  backdrop-blur-lg bg-green-800 bg-opacity-15  h-full justify-center text-center gap-4' style={{ clipPath: 'ellipse(90% 90% at 50% 50%)' }}>
            <p className=" lg:text-2xl text-xs mb-6 lg:max-w-[70vh]">We transform rural economies through innovation, financial empowerment, and sustainable development. Partner with us to promote financial inclusion and global food security, one farmer at a time</p>
            <div className="flex space-x-4">
           
            </div>
          </div>
        </div>
      </BannerGeneral>


      <AwardRecognitionSection/>

        <div className='text-center' >
      <FaqSection/>

        </div>
        <div className='p-5 text-center bg-green-900'>
      <ContactUs/>

        </div>

        </div>
    </div>
  )
}

export default AboutUs
