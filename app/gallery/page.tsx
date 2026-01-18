"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GiBullHorns } from "react-icons/gi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AppBranding from "@/components/Project/AppBranding";
import banner from "@/public/field-cow.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image_url: string;
  description: string;
}

const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [filteredImages, setFilteredImages] = useState<GalleryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 9;

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Extended gallery data with more images for pagination demo
  const galleryData: GalleryItem[] = [
    // {
    //   id: 1,
    //   title: "Farmer with Cattle",
    //   category: "farmers",
    //   image_url: "/farmer-1.png",
    //   description: "A smallholder farmer with his livestock in Bangladesh",
    // },
    // {
    //   id: 2,
    //   title: "Farmer with Cattle",
    //   category: "farmers",
    //   image_url: "/farmer-2.png",
    //   description: "A smallholder farmer with his livestock in Bangladesh",
    // },
    // {
    //   id: 3,
    //   title: "Farmer with Cattle",
    //   category: "farmers",
    //   image_url: "/farmer-3.png",
    //   description: "A smallholder farmer with his livestock in Bangladesh",
    // },
    // {
    //   id: 4,
    //   title: "Farmer with Cattle",
    //   category: "farmers",
    //   image_url: "/farmer-4.png",
    //   description: "A smallholder farmer with his livestock in Bangladesh",
    // },
    // {
    //   id: 5,
    //   title: "Farmer with Cattle",
    //   category: "farmers",
    //   image_url: "/farmer-5.png",
    //   description: "A smallholder farmer with his livestock in Bangladesh",
    // },
    // {
    //   id: 6,
    //   title: "Farmer with Cattle",
    //   category: "farmers",
    //   image_url: "/farmer-6.png",
    //   description: "A smallholder farmer with his livestock in Bangladesh",
    // },
    // {
    //   id: 7,
    //   title: "Farmer with Cattle",
    //   category: "farmers",
    //   image_url: "/farmer-7.png",
    //   description: "A smallholder farmer with his livestock in Bangladesh",
    // },
    // {
    //   id: 8,
    //   title: "Farmer with Cattle",
    //   category: "farmers",
    //   image_url: "/farmer-8.png",
    //   description: "A smallholder farmer with his livestock in Bangladesh",
    // },

    // {
    //   id: 9,
    //   title: "Yard Meeting & Awareness Campaign",
    //   category: "campaigns",
    //   image_url: "/Yard-Meeting-&-Awareness-Campaign-21.jpg",
    //   description: "",
    // },
    {
      id: 105,
      title: "Yard Meeting & Awareness Campaign",
      category: "campaigns",
      image_url: "/seminar.jpeg",
      description: "",
    },
      {
      id: 105,
      title: "Yard Meeting & Awareness Campaign",
      category: "campaigns",
      image_url: "/seminar2.jpeg",
      description: "",
    },
   
  
     {
      id: 103,
      title: "Awareness Campaign by our CEO and COO",
      category: "campaigns",
      image_url: "/boss1.jpeg",
      description: "",
    },
     {
      id: 104,
      title: "Branch Campaign",
      category: "campaigns",
      image_url: "/branch.jpeg",
      description: "",
    },
    {
      id: 10,
      title: "Training for Farmers and Cattle Rearers",
      category: "campaigns",
      image_url: "/Training-for-Farmers-and-Cattle-Rearers.jpg",
      description: "",
    },
    {
      id: 11,
      title: "Yard Meeting & Awareness Campaign",
      category: "campaigns",
      image_url: "/Yard-Meeting-&-Awareness-Campaign-16.jpg",
      description: "",
    },
    {
      id: 12,
      title: "Yard Meeting & Awareness Campaign",
      category: "campaigns",
      image_url: "/Yard-Meeting-&-Awareness-Campaign-17.jpg",
      description: "",
    },
    {
      id: 13,
      title: "Yard Meeting & Awareness Campaign",
      category: "campaigns",
      image_url: "/Yard-Meeting-&-Awareness-Campaign-18.jpg",
      description: "",
    },
    {
      id: 14,
      title: "Yard Meeting & Awareness Campaign",
      category: "campaigns",
      image_url: "/Yard-Meeting-&-Awareness-Campaign-20.jpg",
      description: "",
    },
    {
      id: 15,
      title: "Yard Meeting & Awareness Campaign",
      category: "campaigns",
      image_url: "/Yard-Meeting-&-Awareness-Campaign-22.jpg",
      description: "",
    },
    {
      id: 16,
      title: "Yard Meeting & Awareness Campaign",
      category: "campaigns",
      image_url: "/Yard-Meeting-&-Awareness-Campaign-25.jpg",
      description: "",
    },
    {
      id: 17,
      title: "Yard Meeting & Awareness Campaign",
      category: "campaigns",
      image_url: "/Yard-Meeting-&-Awareness-Campaign-26.jpg",
      description: "",
    },
    {
      id: 18,
      title: "Yard Meeting & Awareness Campaign",
      category: "campaigns",
      image_url: "/Yard-Meeting-&-Awareness-Campaign-27.jpg",
      description: "",
    },
    {
      id: 19,
      title: "Yard Meeting & Awareness Campaign",
      category: "campaigns",
      image_url: "/Yard-Meeting-&-Awareness-Campaign-29.jpg",
      description: "",
    },
    {
      id: 20,
      title: "Yard Meeting & Awareness Campaign",
      category: "campaigns",
      image_url: "/Yard-Meeting-&-Awareness-Campaign-24.jpg",
      description: "",
    },
    {
      id: 21,
      title: "Bangladesh Agriculture University",
      category: "partnerships",
      image_url: "/Bangladesh_Agriculture_University.png",
      description: "",
    },
    {
      id: 22,
      title: "B-Briddhi",
      category: "partnerships",
      image_url: "/bridhi.jpg",
      description: "",
    },
    {
      id: 23,
      title: "Swiss Contact",
      category: "partnerships",
      image_url: "/BMMDP.jpg",
      description: "",
    },
    {
      id: 24,
      title: "Tenity",
      category: "partnerships",
      image_url: "/tenity.png",
      description: "",
    },
    {
      id: 99,
      title: "Accelerating Asia",
      category: "partnerships",
      image_url: "/accelaringasia.jpg",
      description: "",
    },
    {
      id: 25,
      title: "Briddhi",
      category: "achievements",
      image_url: "/bridhi.jpg",
      description: "Impact Ready Matching Fund (IRMF)",
    },
    {
      id: 26,
      title: "GITEX Global 2023",
      category: "achievements",
      image_url: "/dubai2023.png",
      description: "Supernova Insurtech Disruptor Champion - Prize $8000",
    },
    {
      id: 27,
      title: "Huawei ICT Incubator 2022",
      category: "achievements",
      image_url: "/huawei.webp",
      description: "Winner - Prize $12500",
    },
    {
      id: 28,
      title: "She Loves Tech Bangladesh 2023 Competition Winner",
      category: "achievements",
      image_url: "/achivement.jpeg",
      description: "",
    },
    {
      id: 29,
      title: "MENA Insurtech Summit 2024 Winner",
      category: "achievements",
      image_url: "/InsurTech-2024.jpg",
      description: "",
    },
  ];

  const categories = [
    // { id: "all", name: "All", count: galleryData.length },
    // {
    //   id: "farmers",
    //   name: "Farmers",
    //   count: galleryData.filter((item) => item.category === "farmers").length,
    // },
    {
      id: "campaigns",
      name: "Campaigns",
      count: galleryData.filter((item) => item.category === "campaigns").length,
    },
    {
      id: "partnerships",
      name: "Partnerships",
      count: galleryData.filter((item) => item.category === "partnerships")
        .length,
    },
    {
      id: "achievements",
      name: "Achievements",
      count: galleryData.filter((item) => item.category === "achievements")
        .length,
    },
  ];

  // Calculate pagination
  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = filteredImages.slice(startIndex, endIndex);

  useEffect(() => {
    let filtered: GalleryItem[];
    if (selectedCategory === "all") {
      filtered = galleryData;
    } else {
      filtered = galleryData.filter(
        (item) => item.category === selectedCategory
      );
    }
    setFilteredImages(filtered);
    setCurrentPage(1); // Reset to first page when category changes
  }, [selectedCategory]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.set([heroRef.current], {
        y: 50,
        opacity: 0,
      });

      // Filter buttons animation
      gsap.set(filterRef.current?.children || [], {
        y: 30,
        opacity: 0,
      });

      // Gallery grid animation
      gsap.set(imageRefs.current, {
        y: 60,
        opacity: 0,
        scale: 0.9,
      });

      // Hero animation timeline
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      heroTl.to(heroRef.current, {
        duration: 0.8,
        y: 0,
        opacity: 1,
        ease: "power2.out",
      });

      // Filter buttons animation
      const filterTl = gsap.timeline({
        scrollTrigger: {
          trigger: filterRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      filterTl.to(filterRef.current?.children || [], {
        duration: 0.6,
        y: 0,
        opacity: 1,
        ease: "power2.out",
        stagger: 0.1,
      });

      // Gallery grid animation
      const gridTl = gsap.timeline({
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      gridTl.to(imageRefs.current, {
        duration: 0.8,
        y: 0,
        opacity: 1,
        scale: 1,
        ease: "power2.out",
        stagger: 0.15,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [currentImages]);

  const handleCategoryChange = (category: string) => {
    // Animate out current images
    gsap.to(imageRefs.current, {
      duration: 0.3,
      y: 20,
      opacity: 0,
      scale: 0.95,
      stagger: 0.05,
      onComplete: () => {
        setSelectedCategory(category);
        // Animate in new images
        setTimeout(() => {
          gsap.fromTo(
            imageRefs.current,
            { y: 20, opacity: 0, scale: 0.95 },
            {
              duration: 0.6,
              y: 0,
              opacity: 1,
              scale: 1,
              ease: "power2.out",
              stagger: 0.1,
            }
          );
        }, 100);
      },
    });
  };

  const handlePageChange = (page: number) => {
    // Animate out current images
    gsap.to(imageRefs.current, {
      duration: 0.3,
      y: 20,
      opacity: 0,
      scale: 0.95,
      stagger: 0.05,
      onComplete: () => {
        setCurrentPage(page);
        // Animate in new images
        setTimeout(() => {
          gsap.fromTo(
            imageRefs.current,
            { y: 20, opacity: 0, scale: 0.95 },
            {
              duration: 0.6,
              y: 0,
              opacity: 1,
              scale: 1,
              ease: "power2.out",
              stagger: 0.1,
            }
          );
        }, 100);
      },
    });
  };

  const openModal = (image: GalleryItem) => {
    const imageIndex = filteredImages.findIndex((img) => img.id === image.id);
    setSelectedImage(image);
    setSelectedImageIndex(imageIndex);
    // Modal animation
    gsap.fromTo(
      ".modal-overlay",
      { opacity: 0 },
      { duration: 0.3, opacity: 1, ease: "power2.out" }
    );
    gsap.fromTo(
      ".modal-image",
      { scale: 0.5, opacity: 0 },
      { duration: 0.5, scale: 1, opacity: 1, ease: "back.out(1.7)" }
    );
  };

  const closeModal = () => {
    gsap.to(".modal-overlay", {
      duration: 0.3,
      opacity: 0,
      ease: "power2.out",
    });
    gsap.to(".modal-image", {
      duration: 0.4,
      scale: 0.5,
      opacity: 0,
      ease: "back.in(1.7)",
      onComplete: () => setSelectedImage(null),
    });
  };

  const navigateImage = (direction: "prev" | "next") => {
    let newIndex: number;
    if (direction === "prev") {
      newIndex =
        selectedImageIndex > 0
          ? selectedImageIndex - 1
          : filteredImages.length - 1;
    } else {
      newIndex =
        selectedImageIndex < filteredImages.length - 1
          ? selectedImageIndex + 1
          : 0;
    }

    // Animate image transition
    gsap.to(".modal-image", {
      duration: 0.2,
      scale: 0.8,
      opacity: 0,
      ease: "power2.out",
      onComplete: () => {
        setSelectedImage(filteredImages[newIndex]);
        setSelectedImageIndex(newIndex);
        gsap.fromTo(
          ".modal-image",
          { scale: 0.8, opacity: 0 },
          { duration: 0.3, scale: 1, opacity: 1, ease: "power2.out" }
        );
      },
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === "ArrowLeft") {
          navigateImage("prev");
        } else if (e.key === "ArrowRight") {
          navigateImage("next");
        } else if (e.key === "Escape") {
          closeModal();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedImage, selectedImageIndex, filteredImages]);

  return (
    <div ref={containerRef} className="lg:h-auto h-auto">
      <AppBranding
        title="Visual Journey of Rural Transformation"
        bannerUrl={banner}
      />

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="min-h-[400px] flex items-center justify-center bg-white"
      >
        <div className="text-center px-4 py-16">
          <GiBullHorns className="w-auto text-4xl text-green-700 mb-4 mx-auto" />
          <span className="text-sm text-[#687469] uppercase font-semibold">
            Our Gallery
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-[#334b35] mt-2 mb-6">
            Capturing Impact Through Images
          </h1>
          <p className="text-xl text-[#687469] max-w-3xl mx-auto">
            Explore our visual story of transforming rural economies, empowering
            farmers, and building sustainable agricultural communities through
            innovative technology and partnerships.
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-[#F7F7F7] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={filterRef}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-md ${
                  selectedCategory === category.id
                    ? "bg-green-700 text-white shadow-lg"
                    : "bg-white text-[#334b35] hover:bg-green-50"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {currentImages.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                className="gallery-item bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => openModal(item)}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        className="w-12 h-12"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm5 3a2 2 0 11-4 0 2 2 0 014 0zm4.5 8.5l-3-3-1.5 1.5-3-3V16h7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs text-green-700 uppercase font-semibold tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-[#334b35] mt-2 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#687469] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-white text-[#334b35] font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-50 transition-all duration-300"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      currentPage === page
                        ? "bg-green-700 text-white shadow-lg"
                        : "bg-white text-[#334b35] hover:bg-green-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-white text-[#334b35] font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-50 transition-all duration-300"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Statistics Section */}
      {/* <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <GiBullHorns className="w-auto text-3xl text-green-700 mb-4 mx-auto" />
          <h2 className="text-4xl lg:text-5xl font-bold text-[#334b35] mb-12">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "5,000+", label: "Farmers Supported" },
              { number: "500M", label: "Smallholder Farmers Globally" },
              { number: "16.6M", label: "Farmers in Bangladesh" },
              { number: "0.3%", label: "Livestock Currently Insured" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-green-700 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-[#687469] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Modal */}
      {selectedImage && (
        <div
          className="modal-overlay fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Arrows */}
            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-3 transition-all duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => navigateImage("next")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-3 transition-all duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute -top-12 left-0 z-10 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
              {selectedImageIndex + 1} / {filteredImages.length}
            </div>

            <div className="modal-image relative">
              <Image
                src={selectedImage.image_url || "/placeholder.svg"}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                unoptimized
              />

              {/* Image Info Overlay */}
              {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6 rounded-b-lg">
                <span className="text-sm text-green-400 uppercase font-semibold tracking-wider">
                  {selectedImage.category}
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mt-2 mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {selectedImage.description}
                </p>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
