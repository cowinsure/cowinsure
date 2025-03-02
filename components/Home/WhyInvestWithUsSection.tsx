'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image, { StaticImageData } from 'next/image';
import { Autoplay, Navigation } from 'swiper/modules';
import { GiBullHorns } from 'react-icons/gi';
import banner from '../../public/agriculture-farmland-2023-11-27-05-02-44-utc.jpg'

interface CarouselProps {
  slides: StaticImageData[];
  slideTexts: string[];
  styleHtmlText: React.JSX.Element[];
}


const listSlides = [
  {
      image:banner,
      title:"Insurance-Backed Security",
      description:"Every investment is covered by comprehensive insurance policies that protect against cattle death or disability"

  },

  {
      image:banner,
      title:"Low-Risk, High-Impact Returns",
      description:"A profit-sharing model that delivers financial returns while contributing to rural economic empowerment."

  },
  {
      image:banner,
      title:"Verified Farmers",
      description:"Rigorous verification ensures transparency, accountability, and responsible use of funds."

  },
  {
      image:banner,
      title:"Empowering Communities",
      description:"Your investment helps farmers break free from high-interest debt cycles, fostering economic independence and rural development."

  }
 
]
const WhyInvestWithUs = ({ slides}: CarouselProps) => {
//   const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(null);





  return (
    <div className='container mx-auto flex flex-col justify-center items-center lg:flex-col lg:justify-center lg:items-center w-full lg:h-auto h-auto p-5'>
      <div className="flex-1 flex flex-col justify-center items-center max-w-4xl text-center w-full">
        <GiBullHorns className='lg:w-auto w-full text-2xl text-start text-green-700 mb-2' />
        <h2 className="text-xl font-bold text-[#687469] text-start mb-3">our goal</h2>
        <h1 className="lg:text-5xl text-2xl min-w-[150px] mb-5 font-bold text-[#334b35]  text-start">Why Invest With Us</h1>
        <p className='text-center font-semibold text-gray-500 mb-10 text-xl lg:text-2xl lg:max-w-[80vh]'>
      Our full value-chain model offers tangible growth opportunities

            </p>
      </div>
      
     

      <Swiper
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        spaceBetween={50}
        loop={true}
        pagination={{ clickable: false }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Navigation, Autoplay]}
        className="flex-1 w-full lg:h-auto justify-center items-center lg:justify-center lg:items-center"
      >
        {listSlides.map((s, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex-col lg:w-auto lg:h-auto cursor-pointer group">
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

export default WhyInvestWithUs;
