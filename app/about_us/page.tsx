import AppBranding from '@/components/Project/AppBranding'
import React from 'react'
import banner from '../../public/farmers-with.jpg';
import bannerGenereal from '../../public/back-view-of-filipino-local-farmers-2025-01-07-23-27-27-utc.jpg';

import FaqSection from '@/components/Home/FaqSection';
import ContactUs from '@/components/Helper/ContactUs';
import CoreValueSection from '@/components/AboutPage/CoreValueSection';
import BannerGeneral from '@/components/Home/BannerGeneral';
import AwardRecognitionSection from '@/components/Helper/AwardRecognitionSection';
import ServiceHighlighted from '@/components/common/ServiceHighlighted';


const mission  = "Our mission is to promote financial inclusion for smallholder farmers by providing accessible, innovative insurance and financial products. We aim to empower underserved farming communities with technol-ogy-driven solutions, enhancing their ability to mitigate risks, increase productivity, and achieve long-term economic resilience"
const vision  = "Our vision is to ensure that smallholder farmers in emerging economies have access to financial services, cutting-edge technology, and essential information, fostering a sustainable and prosperous agricultural sector."

const AboutUs = () => {
  return (
    <div>
        <AppBranding title="Stronger Together, Enriching Farmers' Future!" bannerUrl={banner}  />


    <ServiceHighlighted url='' image={bannerGenereal} title='Our Mission' description={mission} reverse/>
    <ServiceHighlighted url='' image={bannerGenereal} title='Our Vision' description={vision} />

        
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
        <div className='text-center bg-green-900 p-5' >
      <ContactUs/>

        </div>

        </div>
    </div>
  )
}

export default AboutUs
