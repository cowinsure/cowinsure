"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

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
  const [logoData, setLogoData] = useState<LogoData | null>(null);
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleNavbar = () => setClick(!isClick);

  /* Scroll hide + capsule */
  useEffect(() => {
    // let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 40);

      // if (current > lastScrollY && current > 100) {
      //   setHidden(true);
      // } else {
      //   setHidden(false);
      // }

      // lastScrollY = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchLogoData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/logo/`
        );
        const result = await res.json();
        if (result.status === "success") setLogoData(result.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchMenuData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/menu/`
        );
        const result: ApiResponse = await res.json();
        if (result.status === "success") setMenuData(result.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLogoData();
    fetchMenuData();
  }, []);

  const capsuleSpring = {
    type: "spring",
    stiffness: 260,
    damping: 28,
    mass: 0.9,
  };

  return (
    <>
      <motion.nav
        animate={{
          y: hidden ? -120 : 0,
          scale: scrolled ? 0.985 : 1,
          opacity: 1,
        }}
        transition={{
          y: { duration: 7, ease: "easeInOut" },
          scale: capsuleSpring,
        }}
        className="fixed top-0 left-0 w-full z-50 h-[80px]"
      >
        <motion.div
          animate={{
            borderRadius: scrolled ? "9999px" : "0px",
            paddingLeft: scrolled ? "6px" : "0px",
            paddingRight: scrolled ? "6px" : "0px",
            boxShadow: scrolled ? "0 20px 40px rgba(0,0,0,0.12)" : "",
            backdropFilter: scrolled ? "blur(14px)" : "",
          }}
          transition={{
            borderRadius: {
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1], // premium easing
            },
            paddingLeft: capsuleSpring,
            paddingRight: capsuleSpring,
            boxShadow: { duration: 1, ease: "easeOut" },
            backdropFilter: { duration: 0.4 },
          }}
          className={`transition-all ease-in-out duration-700 mt-3
    ${
      scrolled
        ? "max-w-[1480px] mx-auto bg-[#F6F4EC]/50 translate-y-0"
        : "w-full bg-transparent"
    }
  `}
        >
          <div className=" mx-auto px-6 h-20 flex items-center justify-between relative">
            {/* Logo */}
            <div className="relative flex items-center">
              {/* SVG Blob */}
              <div
                className={`absolute -left-5 -top-8 -z-10 w-[150px] h-[100px] bg-[#F6F4EC] skew-x-[20deg] rounded-md transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  scrolled ? "-translate-y-40" : "translate-y-0"
                }`}
              />

              <Link href="/" className="">
                {logoData && (
                  <Image
                    src={logoData.image_url}
                    alt={logoData.name}
                    width={140}
                    height={60}
                    className="object-contain h-14 w-auto mb-4 -ml-5"
                    priority
                    unoptimized
                  />
                )}
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-12">
              {/* Animated background div */}
              <div
                className={`absolute -top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[100px] bg-black/30 rounded-2xl transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] backdrop-blur-sm ${
                  scrolled ? "-translate-y-[calc(100%)]" : "translate-y-0"
                }`}
              />
              {menuData.map((item) => (
                <div key={item.title} className="relative group menu-item">
                  <Link
                    href={item.link}
                    className={`text-[15px] font-semibold tracking-wide ${
                      scrolled ? "text-[#334b35]" : "text-white"
                    } hover:text-[#a2ffad]`}
                  >
                    {item.title}
                  </Link>

                  {item.sub_menu.length > 0 && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-6 hidden group-hover:block">
                      <div className="min-w-[320px] rounded-2xl bg-[#F6F4EC] shadow-xl border border-black/5 p-4">
                        {item.sub_menu.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.link}
                            className="block px-4 py-3 rounded-xl text-sm font-medium text-[#687469] hover:bg-black/5 hover:text-[#334b35] transition-all duration-300 ease-out hover:[text-shadow:0_0_0_currentColor]"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* WhatsApp CTA */}
            <Link
              href="https://wa.me/8801999467873"
              target="_blank"
              className="ml-4 px-5 py-2 rounded-full bg-[#002b10] text-[#25D366] text-sm font-semibold
                hover:scale-105 transition shadow-md hidden md:flex items-center gap-1"
            >
              <FaWhatsapp size={25} />
              <span className="">Get In Touch</span>
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={toggleNavbar}
              className="md:hidden text-3xl font-light text-[#334b35]"
            >
              {isClick ? "×" : "☰"}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isClick && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="md:hidden bg-[#F6F4EC] border-t border-black/10"
              >
                <div className="px-6 py-6 space-y-6">
                  {menuData.map((item) => (
                    <div key={item.title}>
                      <Link
                        href={item.link}
                        onClick={() => setClick(false)}
                        className="block text-lg font-semibold text-[#334b35]"
                      >
                        {item.title}
                      </Link>

                      {item.sub_menu.length > 0 && (
                        <div className="mt-2 ml-4 space-y-2">
                          {item.sub_menu.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.link}
                              onClick={() => setClick(false)}
                              className="block text-sm text-[#687469]"
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Mobile WhatsApp CTA */}
                  <Link
                    href="https://wa.me/880XXXXXXXXXX"
                    target="_blank"
                    className="block text-center rounded-full bg-[#25D366] text-white py-3 font-semibold"
                  >
                    WhatsApp Us
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.nav>

      {/* Hover underline */}
      <style jsx>{`
        .menu-item::after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          left: 50%;
          bottom: -6px;
          background: #25d366;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        .menu-item:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
}

export default NavBarResponsive;
