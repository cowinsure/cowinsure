import React from "react";
import BannerGeneral from "@/components/Home/BannerGeneral";
import FaqSection from "@/components/Home/FaqSection";
// import banner from '../../public/agriculture-farmland-2023-11-27-05-02-44-utc.jpg';
import Link from "next/link";

const page = () => {
  return (
    <div className="h-auto overflow-hidden">
      {/* Banner Section */}
      <BannerGeneral bannerUrl={"/Feedimg.png"}>
        <div className="relative z-10 flex flex-col items-center justify-center h-full bg-orange-950 bg-opacity-50 text-white text-center p-5">
          <h1 className="text-xl lg:text-6xl font-semibold mb-4">
            Feed Services
          </h1>
          <p className="text-lg lg:text-2xl mb-6">
            Quality feed solutions to optimize livestock nutrition and
            productivity.
          </p>
          <Link href="/contact">
            <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-md">
              Get Feed Service
            </button>
          </Link>
        </div>
      </BannerGeneral>

      {/* About Feed Services Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl lg:text-4xl font-bold text-left text-[#334b35] mb-8 underline">
          About Our Feed Services
        </h2>
        <div className="text-left">
          <p className="text-lg text-gray-700 mb-6">
            Our feed services provide high-quality, balanced nutrition for
            livestock to ensure optimal health, growth, and productivity. We
            offer customized feed formulations and expert advice on feeding
            practices.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#334b35] mb-4">
                Custom Feed Formulations
              </h3>
              <p className="text-gray-600">
                Tailored feed mixes designed to meet the specific nutritional
                needs of different livestock types and ages.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#334b35] mb-4">
                Feeding Advisory
              </h3>
              <p className="text-gray-600">
                Expert guidance on feeding schedules, portion control, and
                supplementation to maximize efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awareness Campaign Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2">
          <div className="px-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-left text-[#334b35] mb-8 underline">
              Why Quality Feed Matters
            </h2>
            <div className="max-w-lg">
              <p className="text-lg text-gray-700 mb-6 text-left leading-10">
                Proper nutrition is the foundation of livestock health and
                productivity. Choosing the right feed can significantly impact
                milk yield, weight gain, and overall farm profitability. Learn
                how to choose the best feed for your livestock. Our awareness
                campaign provides tips on evaluating feed quality, understanding
                labels, and implementing sustainable feeding practices.
              </p>
            </div>
          </div>

          <div className="grid md:grid-rows-3 gap-6">
            <div className="text-center flex items-center gap-5 border p-1 bg-orange-500/30 rounded-l-full">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto">
                <span className="text-2xl">🌾</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#334b35] mb-2 text-left">
                  Nutrient Balance
                </h3>
                <p className="text-gray-600 text-left">
                  Ensure feeds provide the right mix of proteins, vitamins, and
                  minerals for optimal growth.
                </p>
              </div>
            </div>

            <div className="text-center flex items-center gap-5 border p-1 bg-blue-500/30 rounded-l-full">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto">
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#334b35] mb-2 text-left">
                  Quality Assurance
                </h3>
                <p className="text-gray-600 text-left">
                  Source feeds from reputable suppliers to avoid contaminants
                  and ensure safety.
                </p>
              </div>
            </div>

            <div className="text-center flex items-center gap-5 border p-1 bg-purple-500/30 rounded-l-full">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#334b35] mb-2 text-left">
                  Cost Efficiency
                </h3>
                <p className="text-gray-600 text-left">
                  Balanced feeds reduce waste and improve feed conversion ratios
                  for better returns.
                </p>
              </div>
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
