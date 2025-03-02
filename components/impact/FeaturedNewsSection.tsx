'use client'
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import bridhi from '../../public/bridhi.jpg';
import achv01 from '../../public/achivement.jpeg';
import webinar from '../../public/webinar.png';
import aea2024 from '../../public/aea2024.png';
import dubai2023 from '../../public/dubai2023.png';
import mena from '../../public/mena.jpg';
import asiaNews from '../../public/aisainsurancereview.png';
import { GiBullHorns } from 'react-icons/gi';
import Link from 'next/link';



interface NewsItem {
  title: string;
  description: string;
  date: string;
  image:StaticImageData
  link:string
}

const newsData: NewsItem[] = [
  { title: 'Winner', description: "Dubai InsureTech ", date: 'October 26, 2023' , image: dubai2023
     ,link:"https://www.instagram.com/expand_north_star/p/Cy2_9N5uG5T/" },
  { title: 'Webinar', description: "The Future of Agri Tech in Bangladesh", date: 'October 28, 2023' , image: webinar
     ,link:"https://www.dhakatribune.com/bangladesh/329384/ces-ulab-and-future-startup-organized-webinar-on" },
  { title: 'Winner', description: "She Loves Tech Bangladesh 2023", date: 'September 13, 2023' , image: achv01 ,
    link:"https://www.turtleventure.com/she-loves-tech-bangladesh-2023-pioneering-women-empowerment-in-tech-innovation/"
  },
  { title: 'Winner', description: "Menna Summit 2024", date: 'May 14, 2024' , image: mena ,
    link:"https://oqic.com/mena-insurtech-summit-2024-concludes-with-success/"
  },
  { title: 'News Article', description: "Asia Insurance Review", date: 'July 18, 2024' , image: asiaNews ,
    link:"https://www.asiainsurancereview.com/News/View-NewsLetter-Article/id/88824/Type/eDaily/Bangladesh-Technology-backed-livestock-insurer-plans-to-expand-reach"
  },
  { title: 'B-Briddhi', description: "Singing Ceremony", date: 'November 03, 2024' , image: bridhi ,
    link:"https://lightcastlepartners.com/news/b-briddhi-catalytic-funding/"
  },
  { title: 'AEA2024', description: "Asian Enterpreneurship Award", date: 'November 21, 2024' , image: aea2024 ,
    link:"https://aea.events/e/entry/insurecow-ltd/"
  },
  // { title: 'News 2', description: 'Description for news 2', date: '2023-01-02' },
  // { title: 'News 3', description: 'Description for news 3', date: '2023-01-03' },
  // { title: 'News 4', description: 'Description for news 4', date: '2023-01-04' },
  // { title: 'News 5', description: 'Description for news 5', date: '2023-01-05' },
  // { title: 'News 6', description: 'Description for news 6', date: '2023-01-06' },
  // { title: 'News 7', description: 'Description for news 7', date: '2023-01-07' },
  // { title: 'News 8', description: 'Description for news 8', date: '2023-01-08' },
];

const FeaturedNewsSection: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState(4);

  const showMoreItems = () => {
    setVisibleItems((prev) => prev + 4);
  };

  return (
    <section className="w-full container mx-auto  py-8 flex flex-col items-center space-y-10">
           <div className="max-w-4xl text-center">
                      <GiBullHorns className='w-full text-3xl text-center text-green-700 mb-3' />
      
                      <h2 className="text-xl font-bold text-[#687469]">strength and vision</h2>
                      <h1 className="text-5xl font-bold text-[#334b35]">Featured News</h1>
      
                  </div>
                  
            <p className='text-center font-semibold text-gray-500 mt-10 text-2xl lg:max-w-[80vh]'>
                At InsureCow, we are dedicated to transforming agriculture by connecting investors with smallholder farmers. Together, we cultivate sustainable growth, drive food security, and uplift communities, ensuring every investment contributes to a better future for all.

            </p>
      <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsData.slice(0, visibleItems).map((news, index) => (
            <Link href={news.link} key={index} className="relative bg-white p-20 rounded-lg shadow-md overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-cover bg-center -right-full group-hover:right-0 transition-all duration-500">
              <Image
              src={news.image}
              alt="Profile"
              layout="fill"
              objectFit="cover"
              objectPosition='center'
              className="rounded-lg w-full h-full"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50  transition-opacity duration-300 rounded-md flex justify-center items-center"></div>

            <div className="relative z-10 group-hover:visible">
              <h3 className="text-2xl font-semibold mb-2 text-white">{news.title}</h3>
              <p className="text-white mb-4">{news.description}</p>
              <p className="text-white text-sm">{news.date}</p>
            </div>
            </Link>
        ))}
      </div>
      {visibleItems < newsData.length && (
        <div className="text-center mt-6">
          <button
            onClick={showMoreItems}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
};

export default FeaturedNewsSection;
