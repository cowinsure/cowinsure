'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';


interface LogoData {
  id: number;
  name: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface MenuItem {
  title: string;
  link: string;
  sub_menu: MenuItem[];
}

interface ApiResponse {
  status: string;
  message: string;
  data: MenuItem[];
}

function NavBarResponsive() {
  const [isClick, setClick] = useState(false);
  // const [hidden, setHidden] = useState(false);
  const [logoData, setLogoData] = useState<LogoData | null>(null);
  const [menuData, setMenuData] = useState<MenuItem[]>([]);

  const toggleNavbar = () => {
    setClick(!isClick);
  };

  // useEffect(() => {
  //   let lastScrollY = window.scrollY;

  //   const handleScroll = () => {
  //     if (window.scrollY > lastScrollY) {
  //       setHidden(true);
  //     } else {
  //       setHidden(false);
  //     }
  //     lastScrollY = window.scrollY;
  //     // if (window.scrollY === 0) {
  //     //   setStartScroll(true);
  //     // } else {
  //     //   setStartScroll(false);
  //     // }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);



  useEffect(() => {
    const fetchLogoData = async () => {
      try {
       
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logo/`);
        const result = await response.json();
        if (result.status === 'success') {
          setLogoData(result.data);
        }
      } catch (error) {
        console.error('Error fetching logo data:', error);
      }
    };

    const fetchMenuData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/menu/`);
        const result: ApiResponse = await response.json();
        if (result.status === 'success') {
          setMenuData(result.data);
        }
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchLogoData();
    fetchMenuData();
  }, []);

  return (
    <>
      <nav className={`relative bg-[#F6F4EC] bg:blur-md ${isClick ? "h-auto" : "h-20"} text-white  lg:p-6 shadow-md fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${false ? "-translate-y-full" : "translate-y-0"}`}>
        <div className='max-w-7xl mx-auto px-4 sm:p-6 '>
          <div className='flex items-center justify-evenly h-2'>           <div className='hidden md:block'>
              <div className='flex items-center lg:justify-center lg:items-center space-x-20'>
                <div className='h-auto items-start'>
                  <div className='text-[#687649] pb-8'>
                    <Link href={'/'}>
                      {logoData && (
                        <Image
                          src={logoData.image_url}
                          alt={logoData.name}
                          width={50}
                          height={20}
                          className="object-fit w-auto h-[80px]"
                          priority
                          unoptimized
                        />
                      )}
                    </Link>
                  </div>
                </div>
                {menuData.map((item) => (
                  <div key={item.title} className="relative group menu-item">
                    <Link href={item.link} className={`text-[#334b35] text-x font-semibold`}>
                      <span>{item.title}</span>
                    </Link>
                    {item.sub_menu.length > 0 && (
                      <ul className="absolute left-0 hidden lg:w-[50vh] pt-[5vh] space-y-2 bg-transparent group-hover:block rounded-md">
                        <div className='bg-[#F6F4EC] flex flex-col justify-between w-full gap-4 p-2 rounded-md shadow-md'>
                          {item.sub_menu.map((subItem) => (
                            <li key={subItem.title}>
                              <Link href={subItem.link} className="text-x rounded-md font-semibold text-[#687469] block py-2 hover:bg-gray-200">
                                {subItem.title}
                              </Link>
                              {subItem.sub_menu.length > 0 && (
                                <ul className="pl-4 space-y-2">
                                  {subItem.sub_menu.map((subSubItem) => (
                                    <li key={subSubItem.title}>
                                      <Link href={subSubItem.link} className="text-xs rounded-md font-semibold text-[#687469] block px-4 py-2 hover:bg-gray-200">
                                        {subSubItem.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </div>
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className='md:hidden h-auto flex items-center justify-between mt-10 w-full'>
              <div className='flex text-[#687649]'>
                <Link href={'/'}>
                  {logoData && (
                    <Image
                      src={logoData.image_url}
                      alt={logoData.name}
                      width={120}
                      height={50}
                      className="object-cover w-auto h-15 overflow-clip"
                    />
                  )}
                </Link>
              </div>
              <button className='inline-flex items-center justify-center p-4 rounded-md text-black md:text-black hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black text-2xl' onClick={toggleNavbar}>
                {!isClick ? "=" : "x"}
              </button>
            </div>
          </div>
        </div>
        <AnimatePresence>
  {isClick && (
    <motion.div
      key="mobile-menu"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="md:hidden w-full flex justify-center items-center mt-10 overflow-y-auto max-h-[calc(100vh-2rem)]"
    >
            <div className='px-2 pt-2 space-y-3 sm:px-3 flex flex-col'>
              {menuData.map((item) => (
                <div key={item.title} className=''>
                  <Link href={item.link} className={`text-[#334b35] text-x font-semibold`}>
                    <span>{item.title}</span>
                  </Link>
                  {item.sub_menu.length > 0 && (
                    <ul className="pl-4 space-y-2">
                      {item.sub_menu.map((subItem) => (
                        <li key={subItem.title} className="group">
                          <Link href={subItem.link} className=" text-xs font-semibold text-[#687469] block px-4 py-2 hover:bg-gray-200" >
                                {subItem.title}
                              </Link>
                       
                        
                       
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
          )}
</AnimatePresence>
      </nav>
      <style jsx>{`
        .menu-item {
          position: relative;
        }
        .menu-item::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          display: block;
          margin-top: 5px;
          right: 0;
          background: #334b35;
          transition: width 0.4s ease;
          -webkit-transition: width 0.4s ease;
        }
        .menu-item:hover::after {
          width: 100%;
          left: 0;
          background: #334b35;
        }
      `}</style>
    </>
  );
}

export default NavBarResponsive;
