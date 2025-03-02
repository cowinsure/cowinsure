'use client'
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { Autoplay, Navigation } from 'swiper/modules';
import { GiBullHorns } from 'react-icons/gi';

interface GalleryData {
  id: number;
  title: string;
  image_url: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: GalleryData[];
}

const GallerySection = () => {
  const [galleryData, setGalleryData] = useState<GalleryData[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch('http://52.66.196.177:8000/api/v1/gallery/');
        const result: ApiResponse = await response.json();
        if (result.status === 'success') {
          setGalleryData(result.data);
        }
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      }
    };

    fetchGalleryData();
  }, []);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const closeOverlay = () => {
    setSelectedImage(null);
  };

  return (
    <div className='container mx-auto flex flex-col justify-center items-center lg:flex-col lg:justify-center lg:items-center w-full lg:h-[70vh] h-auto p-5'>
      <div className="flex-1 flex flex-col justify-center items-center max-w-4xl text-center w-full">
        <GiBullHorns className='lg:w-auto w-full text-2xl text-start text-green-700 mb-2' />
        <h2 className="text-xl font-bold text-[#687469] text-start mb-3">organic food</h2>
        <h1 className="lg:text-5xl text-2xl min-w-[150px] font-bold text-[#334b35] mb-10 text-start">Watch Our Gallery</h1>
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
        {galleryData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative lg:w-auto lg:h-auto cursor-pointer group" onClick={() => handleImageClick(item.image_url)}>
              <Image
              src={item.image_url}
              alt={item.title}
              objectFit='cover'
              className="rounded-md object-cover"
              width={500}
              height={300}
              unoptimized // Add this line to bypass Next.js image optimization
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-md flex justify-center items-center">
              <span className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">+</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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
              unoptimized // Add this line to bypass Next.js image optimization
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GallerySection;
