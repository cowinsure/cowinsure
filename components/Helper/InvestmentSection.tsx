"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import { FaArrowRightLong } from "react-icons/fa6";

import { Autoplay, Navigation } from "swiper/modules";
import { GiBullHorns } from "react-icons/gi";

import Image from "next/image";
import Link from "next/link";
import { formatToBDT } from "@/utils/currencyFormatter";
import { CiLocationOn } from "react-icons/ci";

interface ExtraData {
  isSold: boolean;
}

interface Portfolio {
  id: string;
  name: string;
  location: string;
  investment_value: string;
  currency: string;
  investment_period: string;
  expected_return_min: string;
  expected_return_max: string;
  total_return_min: string;
  total_return_max: string;
  image_url: string;
  description: string;
  extra_data: ExtraData;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: Portfolio[];
}

interface Category {
  id: string;
  name: string;
  description: string;
}

interface CategoryApiResponse {
  status: string;
  message: string;
  data: Category[];
}

const InvestmentSection = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const memoizedPortfolios = useMemo(() => portfolios, [portfolios]);
  const [isLoading, setIsLoading] = useState(true);
  // const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/portfolio/categories/`
        );
        const result: CategoryApiResponse = await response.json();
        if (result.status === "success") {
          // setCategories(result.data);
          const cowSellCategory = result.data.find(
            (category) => category.name === "Short Term Investment"
          );
          if (cowSellCategory) {
            fetchPortfolios(cowSellCategory.id);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setIsLoading(false);
      }
    };

    const fetchPortfolios = async (categoryId: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/portfolio/category/${categoryId}/portfolios/`
        );

        const result: ApiResponse = await response.json();
        if (result.status === "success") {
          setPortfolios(result.data);
        }
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [isLoading]);

  if (isLoading) {
    return (
      <section className="pt-[50vh] pb-[50vh] h-auto lg:h-auto flex flex-col lg:flex-col lg:justify-start lg:items-center items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-10 px-5 h-auto lg:h-auto  flex flex-col  lg:flex-col lg:justify-start  lg:items-center items-center justify-center bg-[#F6F4EC] pt-10">
      <div className="max-w-4xl text-center">
        <GiBullHorns className="w-full text-3xl text-center text-green-700 mb-3" />

        <h2 className="text-xl font-bold text-[#687469]">Invest Now</h2>
        <h1 className="text-5xl font-bold text-[#334b35]">Our Projects</h1>
      </div>

      <div className="mt-10 h-auto container mx-auto flex flex-col gap-4 lg:flex-row items-center justify-center mb-5 max-w-[77%]">
        <Swiper
          centeredSlides={true}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3 },
          }}
          spaceBetween={60}
          loop={memoizedPortfolios.length > 1}
          pagination={{ clickable: false }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Navigation, Autoplay]}
          className=" lg:h-auto w-full md:w-full flex-1 justify-center flex items-center lg:justify-center lg:items-center"
        >
          {memoizedPortfolios.map((portfolio) => (
            <SwiperSlide key={portfolio.id}>
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-t from-[#151a19] to-[#4b5a7b] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
                {/* IMAGE */}
                <div className="relative h-[220px] overflow-hidden">
                  <Image
                    src={portfolio.image_url}
                    alt={portfolio.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Status */}
                  {portfolio.extra_data.isSold && (
                    <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/90 text-black">
                      Completed
                    </span>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col h-[calc(100%-220px)]">
                  <div className="flex items-center justify-between">
                    {/* TITLE */}
                    <div>
                      <h3 className="text-xl font-semibold text-white leading-tight text-left">
                        {portfolio.name}
                      </h3>
                      <p className="text-slate-200 mt-1 text-left flex items-center gap-1">
                        <CiLocationOn size={20} /> {portfolio.location}
                      </p>
                    </div>

                    {/* PRIMARY VALUE */}
                    <div className="mb-6">
                      <p className="text-sm text-slate-400 text-right">
                        Investment
                      </p>
                      <p className="text-3xl font-bold text-amber-400 tracking-tight">
                        {formatToBDT(parseInt(portfolio.investment_value))}
                      </p>
                    </div>
                  </div>

                  {/* DIVIDER */}
                  <div className="my-5 h-px bg-white/10" />

                  {/* STATS */}
                  <div className="space-y-3 text-sm">
                    <StatRow
                      label="Period"
                      value={portfolio.investment_period}
                    />
                    <StatRow
                      label="Return"
                      value={`${portfolio.expected_return_min}% – ${portfolio.expected_return_max}%`}
                    />
                    <StatRow
                      label="Total Return"
                      value={`${formatToBDT(
                        parseInt(portfolio.total_return_min)
                      )} – ${formatToBDT(
                        parseInt(portfolio.total_return_max)
                      )}`}
                    />
                    <StatRow label="Currency" value={portfolio.currency} />
                  </div>

                  {/* CTA */}
                  {!portfolio.extra_data.isSold && (
                    <Link
                      href={`/project/project_details/${portfolio.id}`}
                      className="mt-auto"
                    >
                      <button className="w-full mt-6 py-3 rounded-xl bg-amber-500 text-black font-semibold tracking-wide transition-all duration-300 hover:bg-amber-400 hover:shadow-lg">
                        View Project →
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const StatRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center text-base">
    <span className="text-slate-400">{label}</span>
    <span className="text-white font-medium">{value}</span>
  </div>
);

export default InvestmentSection;
