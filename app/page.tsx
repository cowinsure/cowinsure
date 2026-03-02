import Home from "@/components/Home/Home";
// import Script from "next/script";

export default function HomePage() {
  return (
    <>
      {/* <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly`}
        strategy="beforeInteractive"
      /> */}
      <div className=" pt-15 md:pt-0 mx-auto lg:w-full  text-center bg-[#F7F7F7] overflow-auto">
        <Home />
      </div>
    </>
  );
}
