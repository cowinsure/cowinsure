'use client'
import FaqSection from '@/components/Home/FaqSection';
import WhyInvestWithUs from '@/components/Home/WhyInvestWithUsSection';
import CowPurchaseSlider from '@/components/Project/cowSellProject/CowPurchaseSlider';
import 'swiper/css';
import 'swiper/css/pagination';
import InvestmentSection from '@/components/Helper/InvestmentSection';


const Project = () => {
  
  return (
    <div className='pt-16 lg:pt-0 overflow-hidden mt-[-10vh] lg:mt-[0vh]'>
        
        <div>
          <InvestmentSection/>
        </div>

      <div className='mt-20'>
        <CowPurchaseSlider />
      </div>

      <div className='my-20'>
        <WhyInvestWithUs />
      </div>

      <section className='bg-[#F6F4EC] py-10 text-center'>
        <FaqSection />
      </section>
    </div>
  );
};

export default Project;
