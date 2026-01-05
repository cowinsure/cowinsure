import React from "react";
import BannerGeneral from "@/components/Home/BannerGeneral";
import FaqSection from "@/components/Home/FaqSection";
import Link from "next/link";

const page = () => {
  return (
    <div className="h-auto overflow-hidden">
      {/* Banner Section */}
      <BannerGeneral bannerUrl={"/cowinspection.jpg"}>
        <div className="relative z-10 flex flex-col items-center justify-center h-full bg-green-950 bg-opacity-50 text-white text-center p-5">
          <h1 className="text-xl lg:text-6xl font-semibold mb-4">
            Veterinary Services
          </h1>
          <p className="text-lg lg:text-2xl mb-6">
            Comprehensive health checkups and vaccination support for your
            livestock
          </p>
          <Link href="/contact">
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md">
              Get Vet Service
            </button>
          </Link>
        </div>
      </BannerGeneral>

      {/* About Vet Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[76%] mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-left text-[#334b35] mb-8 underline">
            About Our Veterinary Services
          </h2>
          <div className="mx-auto text-left">
            <p className="text-lg text-gray-700 mb-6">
              Our veterinary services are designed to ensure the health and
              well-being of your livestock. We provide expert care through
              regular health checkups and vaccination programs to prevent
              diseases and promote longevity.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-[#334b35] mb-4">
                  Health Checkups
                </h3>
                <p className="text-gray-600">
                  Regular examinations to monitor the health of your animals,
                  detect issues early, and provide timely treatment.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-[#334b35] mb-4">
                  Vaccination Support
                </h3>
                <p className="text-gray-600">
                  Comprehensive vaccination programs tailored to protect against
                  common diseases affecting livestock in your region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awareness Campaign Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[76%] mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-left text-[#334b35] mb-8 underline">
            Why Veterinary Services Matter
          </h2>
          <div className="mx-auto">
            <p className="text-lg text-gray-700 mb-6 text-left">
              Investing in veterinary care is crucial for sustainable livestock
              farming. Healthy animals lead to better productivity, higher
              yields, and economic stability for farmers.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center bg-green-200 p-3 rounded-lg">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🐄</span>
                </div>
                <h3 className="text-xl font-semibold text-[#334b35] mb-2">
                  Disease Prevention
                </h3>
                <p className="text-gray-600">
                  Vaccinations and checkups prevent outbreaks that can devastate
                  herds.
                </p>
              </div>

              <div className="text-center bg-green-200 p-3 rounded-lg">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-xl font-semibold text-[#334b35] mb-2">
                  Increased Productivity
                </h3>
                <p className="text-gray-600">
                  Healthy livestock produce more milk, meat, and offspring.
                </p>
              </div>

              <div className="text-center bg-green-200 p-3 rounded-lg">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-semibold text-[#334b35] mb-2">
                  Economic Benefits
                </h3>
                <p className="text-gray-600">
                  Reduce losses from illness and improve farm profitability.
                </p>
              </div>
            </div>
            <div className="text-left mt-8">
              <p className="text-lg text-gray-700">
                Join our awareness campaign to spread the importance of
                veterinary care in livestock management. Together, we can build
                healthier communities and sustainable agriculture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="text-center">
        <FaqSection />
      </div>
    </div>
  );
};

export default page;
