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
  const [filteredImages, setFilteredImages] = useState<GalleryItem[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Sample gallery data - replace with your API data
  const galleryData: GalleryItem[] = [
    {
      id: 1,
      title: "Farmer with Cattle",
      category: "farmers",
      image_url: "/field-cow.png",
      description: "A smallholder farmer with his livestock in Bangladesh",
    },
    {
      id: 2,
      title: "Digital Livestock ID",
      category: "technology",
      image_url:
        "/placeholder.svg?height=400&width=600&text=Digital+ID+Technology",
      description: "Our AI-powered Muzzle Printometry technology in action",
    },
    {
      id: 3,
      title: "Rural Community",
      category: "community",
      image_url: "/placeholder.svg?height=400&width=600&text=Rural+Community",
      description: "Empowering rural communities through financial inclusion",
    },
    {
      id: 4,
      title: "Partnership Meeting",
      category: "partnerships",
      image_url:
        "/placeholder.svg?height=400&width=600&text=Partnership+Meeting",
      description: "Strategic partnerships driving innovation and scale",
    },
    {
      id: 5,
      title: "Cattle Insurance",
      category: "insurance",
      image_url: "/placeholder.svg?height=400&width=600&text=Cattle+Insurance",
      description: "Providing microinsurance for livestock protection",
    },
    {
      id: 6,
      title: "Mobile App Interface",
      category: "technology",
      image_url: "/placeholder.svg?height=400&width=600&text=Mobile+App",
      description: "User-friendly mobile application for farmers",
    },
    {
      id: 7,
      title: "Training Session",
      category: "community",
      image_url: "/placeholder.svg?height=400&width=600&text=Training+Session",
      description: "Capacity building and farmer education programs",
    },
    {
      id: 8,
      title: "Award Ceremony",
      category: "achievements",
      image_url: "/placeholder.svg?height=400&width=600&text=Award+Ceremony",
      description: "Recognition for innovation in fintech and insurtech",
    },
    {
      id: 9,
      title: "Field Operations",
      category: "farmers",
      image_url: "/placeholder.svg?height=400&width=600&text=Field+Operations",
      description: "On-ground operations supporting farmers",
    },
  ];

  const categories = [
    { id: "all", name: "All", count: galleryData.length },
    {
      id: "farmers",
      name: "Farmers",
      count: galleryData.filter((item) => item.category === "farmers").length,
    },
    {
      id: "technology",
      name: "Technology",
      count: galleryData.filter((item) => item.category === "technology")
        .length,
    },
    {
      id: "community",
      name: "Community",
      count: galleryData.filter((item) => item.category === "community").length,
    },
    {
      id: "partnerships",
      name: "Partnerships",
      count: galleryData.filter((item) => item.category === "partnerships")
        .length,
    },
    {
      id: "insurance",
      name: "Insurance",
      count: galleryData.filter((item) => item.category === "insurance").length,
    },
    {
      id: "achievements",
      name: "Achievements",
      count: galleryData.filter((item) => item.category === "achievements")
        .length,
    },
  ];

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredImages(galleryData);
    } else {
      setFilteredImages(
        galleryData.filter((item) => item.category === selectedCategory)
      );
    }
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
  }, [filteredImages]);

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

  const openModal = (image: GalleryItem) => {
    setSelectedImage(image);
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredImages.map((item, index) => (
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
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
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
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white py-16">
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
      </div>

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

            <div className="modal-image relative">
              <Image
                src={selectedImage.image_url || "/placeholder.svg"}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-xl"
                unoptimized
              />

              {/* Image Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/0 to-transparent p-6 rounded-b-lg">
                <span className="text-sm text-green-400 uppercase font-semibold tracking-wider text-shadow-sm">
                  {selectedImage.category}
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mt-2 mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
