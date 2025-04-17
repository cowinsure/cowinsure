import React from 'react'
import banner from '../../public/a-young-man-holding-a-basket-of-freshly-harvested.jpg';
import AppBranding from '@/components/Project/AppBranding';
import ImpactHighlightSection from '@/components/impact/ImpactHighlightSection';
import SDGImapctSection from '@/components/impact/SDGImapctSection';
import FeaturedNewsSection from '@/components/impact/FeaturedNewsSection';
import FaqSection from '@/components/Home/FaqSection';



function Imapct() {
  return (
    <div className=' lg:h-auto h-auto w-auto  overflow-hidden'>
        <AppBranding title="Stronger Together, Enriching Farmers' Future!" bannerUrl={banner} link="#impact-highlight"/>
        
        <div id="impact-highlight">
  <ImpactHighlightSection />
</div>

        <div className='bg-[#F6F4EC]'>

        <SDGImapctSection/>

        </div>
        <div className='bg-[#F6F4EC]'>
        {/* <CommitmentSection/> */}
        </div>

        <div className='py-10'>

        <FeaturedNewsSection/>
        </div>

        
      {/* <BannerGeneral bannerUrl={farmeintheway}>
        <div className="relative z-10 flex flex-row items-center justify-center h-full bg-black bg-opacity-50 text-white text-center ">
          <div className='flex flex-1 item-center  lg:justify-center lg:items-center    justify-center '>
            <h1 className=" text-4xl lg:text-6xl font-semibold "> <span className='text-white'>InsureCow impact report </span></h1>
          </div>
          <div className='flex flex-col item-center flex-1 lg:justify-center lg:items-center  backdrop-blur-lg bg-green-800 bg-opacity-15  h-full justify-center text-center gap-4' style={{ clipPath: 'ellipse(90% 90% at 50% 50%)' }}>
            <p className="text-lg lg:text-2xl mb-6 lg:max-w-[70vh]">Download our impact report and dive into the insights you need for your next big decision.</p>
            <div className="flex space-x-4">
              <Link href="/about_us" className='w-full flex flex-col items-center justify-center lg:flex-col lg:items-center lg:justify-center'>
                <button className="px-4 py-2 bg-white hover:bg-gray-200  border-2 rounded-md hover:border-green-800 text-green-600 font-semibold" >Download</button>
              </Link>
            </div>
          </div>
        </div>
      </BannerGeneral> */}

      <div className='text-center bg-[#F6F4EC]'>

      <FaqSection/>

      </div>

      
    </div>
  )
}

export default Imapct
