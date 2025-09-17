import { Button } from "@/components/ui/button";
import { useUserPersonalInfoQuery } from "@/redux/features/info/info.api";
import { motion } from "framer-motion";

export function Hero() {
  const { data } = useUserPersonalInfoQuery("");
  const creditScore = data?.data?.creditScore;

  return (
    <div className="">
      <section className="bg-[#4B203A] text-white py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20  ">
        {/* Main Container */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4">
              <span className="bg-[#5E314C] text-xs sm:text-sm px-3 sm:px-4 py-1 rounded-full inline-block">
                Trusted by 10,000+ clients and lenders
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Revolutionizing <span className="text-[#C8B491]">Lending</span>
              <br />
              <span className="text-[#C8B491]">Solutions</span>
            </h1>

            <p className="text-sm sm:text-base text-[#e0d6d6] mb-6 max-w-lg">
              Our platform helps clients get fair credit ratings and connects
              them with trusted lenders for faster, more transparent lending
              decisions across multiple industries.
            </p>

            <Button
              variant="secondary"
              className="bg-[#C8B491] text-black hover:bg-[#bda77f] transition text-sm sm:text-base px-5 sm:px-6 py-2 sm:py-3"
            >
              Get Started as Client
            </Button>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center md:justify-end"
          >
            <img
              src="https://images.pexels.com/photos/5935739/pexels-photo-5935739.jpeg"
              alt="Credit card and laptop"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg"
            />
            {creditScore ? (
              <div className="absolute bottom-3 right-1 md:bottom-4 md:-right-16 bg-white text-xs sm:text-sm text-black px-3 sm:px-4 py-2 rounded shadow">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-green-500 rounded-full" />
                  {`Credit Score: ${creditScore}/100`}
                </span>
              </div>
            ) : (
              <div className=""></div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats Section - attached to Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="bg-white text-black shadow-lg rounded-lg py-6 sm:py-8 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center -mt-10 sm:-mt-15 relative z-10 border-2"
      >
        <div>
          <h3 className="text-lg sm:text-xl font-bold">10K+</h3>
          <p className="text-xs sm:text-sm text-gray-600">Active Users</p>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold">$250M+</h3>
          <p className="text-xs sm:text-sm text-gray-600">Loans Facilitated</p>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold">98%</h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Client Satisfaction
          </p>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold">5</h3>
          <p className="text-xs sm:text-sm text-gray-600">Industry Verticals</p>
        </div>
      </motion.section>
    </div>
  );
}
