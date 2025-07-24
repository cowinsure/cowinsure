
import React from 'react'

import grassBrandingImage from '../../public/brandinggrassfieldimg.jpeg';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperComponent from '../Helper/SwiperComponent';
import HomeInsuranceSection from './HomeInsuranceSection';
import FaqSection from './FaqSection';
import ContactUs from '@/components/Helper/ContactUs';
import BannerGeneral from './BannerGeneral';
import Link from 'next/link';
import FeedbackSlider from './FeedbackSlider';
import GallerySection from './GallerySection';
import HomeVedioBanner from './HomeVedioBanner';
import AboutUsSection from './AboutUsSection';
import CardsSection from './CardsSection';
import WhyInvestWithUs from './WhyInvestWithUsSection';
import AwardRecognitionSection from '../Helper/AwardRecognitionSection';
import PartnerAndInvestorSection from '../Helper/PartnerAndInvestorSection';
// import ServiceHighlighted from '../common/ServiceHighlighted';
// import bannerGenereal from '../../public/back-view-of-filipino-local-farmers-2025-01-07-23-27-27-utc.jpg';
// import CowPurchaseSection from '../Project/cowSellProject/CowPurchaseSection';
import InvestmentSection from '../Helper/InvestmentSection';
// import HomeInvestmentSection from './HomeInvestmentSection';



// Testing git

const Home = () => {

  // const slideTexts = [
  //   "Welcome to InsureCow",
  //   " Investment plans for you",
   
  //   "Easy Insurance "
  // ];

  // const stylingHtmlText = [
  //   <h2 key="1" className=" text-white text-2xl font-bold text-center lg:text-5xl md:text-[50px] ">
  //     Welcome to  <span className="text-green-700">InsureCow</span>
  //   </h2>,
  //   <h2 key="2" className="text-white text-2xl md:text-4xl font-bold text-center lg:text-[80px] md:text-[50px] ">
  //     We have tailored for your  <span className="text-green-700 md:text-5xl ">Investment plans</span> 
  //   </h2>,
  //   <h2 key="3" className="text-white text-2xl font-bold text-center lg:t5xl md:text-[50px] ">
  //     Loan that can <span className="text-green-700">change your life</span>
  //   </h2>,
  //   <h2 key="4" className="text-white text-2xl font-bold text-center lg:text-5xl md:text-[50px] ">
  //     <span className="text-green-700">Insurance</span> that you can trust
  //   </h2>

  // ]

  // const stylingHtmlText2 = [
  //   <h2 key="1" className=" text-white text-5xl font-bold text-center lg:text-[90px] md:text-[50px] ">
  //     Welcome to  <span className="text-white"> <br></br> InsureCow</span>
  //   </h2>,
  //   <h2 key="2" className="text-white text-5xl font-bold text-center lg:text-[90px] md:text-[50px] ">
  //     We have tailored <span className="text-white">Investment plans</span> for you
  //   </h2>,
  //   <h2 key="3" className="text-white text-5xl font-bold text-center lg:text-[90px] md:text-[50px] ">
  //     Loan that can <span className="text-white">change your life</span>
  //   </h2>,
  //   <h2 key="4"  className="text-white text-5xl font-bold text-center lg:text-[90px] md:text-[50px] ">
  //     <span className="text-white">Insurance</span> that you can trust
  //   </h2>

  // ]

//   const mission  = "Our mission is to promote financial inclusion for smallholder farmers by providing accessible, innovative insurance and financial products. We aim to empower underserved farming communities with technol-ogy-driven solutions, enhancing their ability to mitigate risks, increase productivity, and achieve long-term economic resilience"
// const vision  = "Our vision is to ensure that smallholder farmers in emerging economies have access to financial services, cutting-edge technology, and essential information, fostering a sustainable and prosperous agricultural sector."


  return (
    <div className=" lg:h-auto w-auto h-auto overflow-hidden">
      {/* Hero Section */}

      {/* <section className=" h-auto flex items-center justify-center "> */}
        {/* Background Image */}
        {/* <Image
          src={herobg2}
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
        /> */}
        {/* <Carousel slides={slides} /> */}

   
   <div className='h-screen'>

    
        <SwiperComponent   />
   </div>

     



        {/* Cards at the end, overflow effect */}
   

      {/* </section> */}

 


      {/* Section 2 - About Us */}

      
      <section className=" max-[767px]:mt-20 mb-10   mx-auto  flex flex:row items-center justify-center p-2">


        <AboutUsSection/>

   




      </section >

   
      <div className='h-auto lg:h-auto lg:pt-10 md:h-auto bg-[#F6F4EC] pb-10'>


      <CardsSection/>
      </div>



     


      {/* <ServiceHighlighted url='/about_us' image={bannerGenereal} title='Our Mission' description={mission} reverse/>
      <ServiceHighlighted url='/about_us' image={bannerGenereal} title='Our Vision' description={vision} /> */}
        


      <HomeVedioBanner/>


      {/* insurance section */}
      <HomeInsuranceSection />

      {/* Section 3 - Services */}
      {/* <HomeInvestmentSection /> */}
      <InvestmentSection/>

      {/* <CowPurchaseSection /> */}



    <div className='my-20'>
      
<WhyInvestWithUs />
    </div>

      


      <BannerGeneral
        bannerUrl={grassBrandingImage}
       >
 <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center h-full bg-black bg-opacity-50 text-white text-center ">
          <div className='flex flex-1  item-center  lg:justify-center lg:items-center  justify-center '>
            <h1 className=" text-xl lg:text-6xl font-semibold text-center flex justify-center items-center "> What Sets 
              InsureCow Apart</h1>


          </div>


          <div className='flex w-full  flex-col item-center flex-1 lg:justify-center lg:items-center  backdrop-blur-lg  bg-gradient-to-r  from-green-900/80 to-[#16351810]   h-full justify-center text-center ' style={{ clipPath: 'ellipse(90% 90% at 50% 50%)' }}>

            <p className="text-x lg:text-2xl mb-6 lg:max-w-[70vh]"></p>
            <div className="flex space-x-4">


              <Link href="/about_us" className='w-full flex flex-col items-center justify-center lg:flex-col lg:items-center lg:justify-center'>

                <button className="px-4 py-2 bg-white hover:bg-gray-200  border-2 rounded-md hover:border-green-800 text-green-600 font-semibold" >Learn More</button>
              </Link>
            </div>
          </div>

        </div>


       </BannerGeneral>
    




      {/* Loan Section */}
      {/* <HomeLoanSection/> */}

      <AwardRecognitionSection/>

      <PartnerAndInvestorSection/>


      <div className='bg-[#F6F4EC]'>
      <FeedbackSlider/>
      </div>


        <GallerySection  />

      {/* faq section */}
      <div className='bg-white'>

      <FaqSection  />
      </div>


      {/* contact us */}
      <div className='py-16 bg-[#F6F4EC] '>
        <ContactUs />
      </div>


      {/* Section 4 - Contact Us */}



    </div>
  )
}

export default Home
