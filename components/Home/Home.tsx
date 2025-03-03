
import React from 'react'

import cover3 from '../../public/cover3.jpg';

import cover01 from '../../public/homeCover1.jpg';
import cover02 from '../../public/homcover2.jpg';
import cover03 from '../../public/homecover3.jpg';
import grassBrandingImage from '../../public/brandinggrassfieldimg.jpeg';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperComponent from '../Helper/SwiperComponent';
import HomeInvestmentSection from './HomeInvestmentSection';
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

const Home = () => {
 const slides = [
    cover01,
    cover02,
    cover03,
    cover3,
    cover01,
    cover3,
    cover03,
    cover3,

  ];
  const slideTexts = [
    "Welcome to InsureCow",
    " Investment plans for you",
   
    "Easy Insurance "
  ];

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

  return (
    <div className="pt-[5vh] lg:h-auto w-auto h-auto">
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

   

        <SwiperComponent  slides={slides} slideTexts={slideTexts} styleHtmlText={[]}  />
     



        {/* Cards at the end, overflow effect */}
   

      {/* </section> */}

 


      {/* Section 2 - About Us */}

      
      <section className=" w-full    mx-auto  flex flex:row items-center justify-center p-2">


        <AboutUsSection/>

   




      </section >

      {/* <div
       className='w-screen bg-slate-600    h-auto'> */}
      <CardsSection/>

      {/* </div> */}


      <HomeVedioBanner/>


      {/* insurance section */}
      <HomeInsuranceSection />

      {/* Section 3 - Services */}
      <HomeInvestmentSection />


    <div className='my-20'>
      
<WhyInvestWithUs slides={slides} slideTexts={[]} styleHtmlText={[]}/>
    </div>

      


      <BannerGeneral
        bannerUrl={grassBrandingImage}
       >
 <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center h-full bg-black bg-opacity-50 text-white text-center ">
          <div className='flex flex-1  item-center  lg:justify-center lg:items-center  justify-center '>
            <h1 className=" text-xl lg:text-6xl font-semibold text-center flex justify-center items-center "> <span className='text-white'>What Sets </span>
              InsureCow Apart</h1>


          </div>


          <div className='flex w-full  flex-col item-center flex-1 lg:justify-center lg:items-center  backdrop-blur-lg  bg-gradient-to-r  from-green-900/80 to-[#16351810]   h-full justify-center text-center ' style={{ clipPath: 'ellipse(90% 90% at 50% 50%)' }}>

            <p className="text-x lg:text-2xl mb-6 lg:max-w-[70vh]">Our product innovates every aspect of smallholder financing from how the loan is disbursed, how the returns are shared and how the risk is priced and managed.</p>
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
      <FeedbackSlider slides={slides} slideTexts={[]} styleHtmlText={[]}/>
      </div>


        <GallerySection  />

      {/* faq section */}
      <div className='bg-white'>

      <FaqSection />
      </div>


      {/* contact us */}
      <div className='py-16 bg-green-950 '>
        <ContactUs />
      </div>


      {/* Section 4 - Contact Us */}



    </div>
  )
}

export default Home
