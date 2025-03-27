'use client'
import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import image2 from '../../public/watchourvedio.jpeg'
import VideoPlayer from '../Videoplayer';
import { FaPlay } from "react-icons/fa";




export default function VideoBanner() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOverlay = () => setIsOpen(!isOpen);

  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      <Image 
        src={image2}
        alt="Background Image" 
        layout="fill" 
        objectFit="cover"
        objectPosition="top" 
        className="z-10"
      />
      <div className="absolute z-20 bg-black bg-opacity-40 inset-0 flex flex-col items-center justify-center">
        <button 
          onClick={toggleOverlay} 
          className="rounded-full p-5 lg:w-[80px] lg:h-[80px] bg-white shadow-lg relative overflow-hidden"
        >
          <span className="absolute inset-0 flex items-center justify-center">
            {/* <span className="absolute w-full h-full lg:h-[20vh] lg:w-[20vh] z-50 bg-black rounded-full animate-ping"></span> */}
            <span className="relative z-10 text-green-900 lg:text-3xl"><FaPlay /></span>
          </span>
        </button>
        <p className="mt-9 text-white lg:text-5xl text-xl font-semibold">Watch our video</p>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl">
            {/* <VideoPlayer videoSrc='https://www.w3schools.com/html/mov_bbb.mp4'/> */}
            <VideoPlayer videoSrc='/videos/insurecow-no-govt-leader_1080.mp4'/>
            {/* <iframe 
              className="w-full aspect-video rounded-lg" 
              src="https://www.youtube.com/watch?v=lw9fGXYfGOo" 
              title="YouTube video player" 
              style={{ border: 0 }} 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe> */}
            <button onClick={toggleOverlay} className="absolute top-2 right-2 bg-white rounded-full p-2">
              <X className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}