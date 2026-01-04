"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import Image from 'next/image'
// import brandLogo from '../../public/brandlogo.png'

const NavMain = () => {
  const [hidden, setHidden] = useState(false);
  const [startCollPassed, setStartScroll] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    console.log(window.scrollY);

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = window.scrollY;
      if (window.scrollY == 0) {
        setStartScroll(true);
      } else {
        setStartScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`  bg-white  text-white p-4 shadow-md fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } `}
    >
      <div className="container mx-auto flex justify-center items-center lg:justify-between gap-5 ">
        {/* <Image src={brandLogo} alt="InsureCow Logo" objectFit="cover"
        objectPosition="bottom" height={42}  className="flex justify-center items-center " />
      <img src="https://www.insurecow.com/images/logo.png" className="flex justify-center items-center h-12" /> */}

        <h2
          className={`text-3xl ${
            startCollPassed ? "text-green-800" : "text-green-800"
          }  font-extrabold`}
        >
          InsureCow
        </h2>

        <ul className="flex flex-row space-x-6">
          <li>
            <Link
              href="/"
              className={`${
                startCollPassed ? "text-[#687469]" : "text-green-800"
              } text-xl font-bold  hover:text-gray-400`}
            >
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/project"
              className={`space-x-2 ${
                startCollPassed ? "text-[#687469]" : "text-green-800"
              } text-xl font-bold  hover:text-gray-400`}
            >
              <span>Project</span>
            </Link>
          </li>

          <li>
            <Link
              href="/impact"
              className={`space-x-2 ${
                startCollPassed ? "text-[#687469]" : "text-green-800"
              } text-xl font-bold hover:text-gray-400`}
            >
              <span>Impact</span>
            </Link>
          </li>
          <li>
            <Link
              href="/about_us"
              className={`space-x-2 ${
                startCollPassed ? "text-[#687469]" : "text-green-800"
              } text-xl font-bold  hover:text-gray-400`}
            >
              <span>About Us</span>
            </Link>
          </li>
        </ul>
        {/* <div>Subscribe</div> */}
        <div></div>
      </div>
    </nav>
  );
};

export default NavMain;

// "use client";

// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { Menu, X, ChevronDown } from "lucide-react";

// export interface NavRoute {
//   label: string;
//   href?: string;
//   children?: {
//     label: string;
//     href: string;
//   }[];
// }

// export const navRoutes: NavRoute[] = [
//   {
//     label: "Home",
//     href: "/",
//   },
//   {
//     label: "Project",
//     href: "/project",
//     children: [
//       { label: "Ongoing Projects", href: "/project/ongoing" },
//       { label: "Completed Projects", href: "/project/completed" },
//     ],
//   },
//   {
//     label: "Impact",
//     href: "/impact",
//   },
//   {
//     label: "About Us",
//     href: "/about_us",
//     children: [
//       { label: "Our Team", href: "/about_us/team" },
//       { label: "Mission & Vision", href: "/about_us/mission" },
//     ],
//   },
// ];

// const NavMain = () => {
//   const [hidden, setHidden] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   useEffect(() => {
//     let lastScrollY = window.scrollY;

//     const handleScroll = () => {
//       const currentScroll = window.scrollY;

//       setScrolled(currentScroll > 20);

//       if (currentScroll > lastScrollY && currentScroll > 80) {
//         setHidden(true);
//       } else {
//         setHidden(false);
//       }

//       lastScrollY = currentScroll;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
//       ${hidden ? "-translate-y-full" : "translate-y-0"}
//       ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"}
//       `}
//     >
//       <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/" className="text-2xl font-extrabold text-green-800">
//           InsureCow
//         </Link>

//         {/* Desktop Nav */}
//         <ul className="hidden lg:flex items-center gap-8">
//           {navRoutes.map((route) => (
//             <li key={route.label} className="relative group">
//               <Link
//                 href={route.href ?? "#"}
//                 className="flex items-center gap-1 text-lg font-semibold text-green-800 hover:text-green-600 transition"
//               >
//                 {route.label}
//                 {route.children && <ChevronDown size={16} className="mt-1" />}
//               </Link>

//               {/* Dropdown (hover-based – unchanged behavior) */}
//               {route.children && (
//                 <ul
//                   className="absolute top-full left-0 mt-3 min-w-[220px]
//                   bg-white shadow-lg rounded-xl border
//                   opacity-0 invisible group-hover:opacity-100 group-hover:visible
//                   transition-all duration-200"
//                 >
//                   {route.children.map((child) => (
//                     <li key={child.href}>
//                       <Link
//                         href={child.href}
//                         className="block px-5 py-3 text-sm font-medium
//                           text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-xl transition"
//                       >
//                         {child.label}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           ))}
//         </ul>

//         {/* Mobile Toggle */}
//         <button
//           onClick={() => setMobileOpen(!mobileOpen)}
//           className="lg:hidden text-green-800"
//         >
//           {mobileOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {mobileOpen && (
//         <div className="lg:hidden bg-white border-t shadow-md">
//           <ul className="flex flex-col p-4 gap-3">
//             {navRoutes.map((route) => (
//               <li key={route.label}>
//                 <Link
//                   href={route.href ?? "#"}
//                   className="block py-2 text-lg font-semibold text-green-800"
//                   onClick={() => setMobileOpen(false)}
//                 >
//                   {route.label}
//                 </Link>

//                 {route.children && (
//                   <ul className="ml-4 mt-1 space-y-1">
//                     {route.children.map((child) => (
//                       <li key={child.href}>
//                         <Link
//                           href={child.href}
//                           className="block py-1 text-sm text-gray-600"
//                           onClick={() => setMobileOpen(false)}
//                         >
//                           {child.label}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default NavMain;
