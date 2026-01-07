"use client";
import React from "react";
import BannerGeneral from "@/components/Home/BannerGeneral";
import FaqSection from "@/components/Home/FaqSection";
// import banner from '../../public/agriculture-farmland-2023-11-27-05-02-44-utc.jpg';
import Link from "next/link";

const products = [
  {
  image:
    "https://akijfeed.com/wp-content/uploads/al_opt_content/IMAGE/akijfeed.com/wp-content/uploads/2024/12/DAIRY-CATTLE_25-KG.jpg.bv.webp?bv_host=akijfeed.com",
  name: "Daily Cattle Feed",
  description:
    "High-quality feed formulated for dairy cattle to ensure optimal milk production and overall health.",
  price: 25.99,
},
{
  image:
    "https://akijfeed.com/wp-content/uploads/al_opt_content/IMAGE/akijfeed.com/wp-content/uploads/2024/12/BEEF-CATTLE_25-KG.jpg.bv.webp?bv_host=akijfeed.com",
  name: "Beef Cattle Feed",
  description:
    "Nutrient-rich feed specially designed for beef cattle to support growth, muscle development, and weight gain.",
  price: 18.5,
},
{
  image:
    "https://akijfeed.com/wp-content/uploads/al_opt_content/IMAGE/akijfeed.com/wp-content/uploads/2024/12/BEEF-BUILDER_25-KG-2.jpg.bv.webp?bv_host=akijfeed.com",
  name: "Beef Builder Feed",
  description:
    "Protein-rich feed for livestock aimed at building strength, enhancing muscle mass, and promoting healthy growth.",
  price: 22.75,
},
{
  image:
    "https://akijfeed.com/wp-content/uploads/al_opt_content/IMAGE/akijfeed.com/wp-content/uploads/2024/12/MILK-BOOSTER_25-KG.jpg.bv.webp?bv_host=akijfeed.com",
  name: "Milk Booster Feed",
  description:
    "Specially formulated pellets for cows to improve milk yield, support digestion, and maintain optimal health.",
  price: 20.0,
},

];

const page = () => {
  return (
    <div className="h-auto overflow-hidden">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
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

      {/* Our Products Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#334b35] mb-12">
          Our Products
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer group"
            >
              {/* Product Image */}
              <div className="relative h-64 w-full overflow-hidden rounded-t-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
                {/* Floating badge */}
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full font-semibold text-sm shadow-lg">
                  New
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col justify- ">
                <div>
                  <h3 className="text-xl font-bold text-[#334b35] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {product.description}
                  </p>
                </div>

                {/* WhatsApp Button */}
                <a
                  href={`https://wa.me/?text=I'm interested in ${encodeURIComponent(
                    product.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 text-lg"
                >
                  {/* WhatsApp Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.52 3.48A11.87 11.87 0 0012 0C5.37 0 0 5.37 0 12a11.94 11.94 0 001.85 6.28L0 24l5.77-1.88A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22c-2.03 0-3.92-.62-5.5-1.67l-.39-.23-3.42 1.12 1.14-3.33-.26-.42A9.95 9.95 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.02-7.98l-2.29-.66a1 1 0 00-1.07.3l-.52.53a8.28 8.28 0 01-3.85-3.85l.53-.52a1 1 0 00.3-1.07l-.65-2.3a1 1 0 00-1.1-.65l-1.57.25a1 1 0 00-.9 1.09 11.22 11.22 0 0011 11 1 1 0 001.09-.9l.24-1.57a1 1 0 00-.65-1.1z" />
                  </svg>
                  Order Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

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
