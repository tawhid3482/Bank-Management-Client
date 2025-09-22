import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Building2,
  Landmark,
  Leaf,
  Database,
  HelpCircle,
} from "lucide-react";
import { Link } from "react-router";

const industries = [
  {
    icon: <Building2 className="h-6 w-6 text-[#4B203A]" />,
    title: "Building & Construction",
    description:
      "Specialized financing solutions for construction projects, equipment purchase, and property development with flexible terms tailored to project timelines.",
  },
  {
    icon: <Landmark className="h-6 w-6 text-[#4B203A]" />,
    title: "DeFi & Fintech",
    description:
      "Cutting-edge decentralized finance solutions combining traditional lending models with blockchain technology for faster, more secure transactions.",
  },
  {
    icon: <Leaf className="h-6 w-6 text-[#4B203A]" />,
    title: "Agriculture",
    description:
      "Customized financing for farmers and agribusinesses, considering seasonal cash flows and providing loans for equipment, landscaping, and operational costs.",
  },
  {
    icon: <Calendar className="h-6 w-6 text-[#4B203A]" />,
    title: "Event & Entertainment",
    description:
      "Short-term financing solutions for event organizers and entertainment companies, with quick approval processes and specialized risk assessment models.",
  },
  {
    icon: <Database className="h-6 w-6 text-[#4B203A]" />,
    title: "Data & Technology",
    description:
      "Innovative financing for tech startups and data-driven companies, with IP-backed loan options and growth-focused lending solutions for scaling operations.",
  },
];

export function IndustrySolutions() {
  return (
    <section className="py-20 px-6 md:px-20 bg-[#f9f8f8] text-[#4B203A]">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Our Industry Solutions
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide specialized lending solutions across multiple industries,
            tailored to meet the unique needs of each sector
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industries.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </motion.div>
          ))}

          {/* Custom Solution Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="bg-[#4B203A] text-white p-6 rounded-lg shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="mb-4">
                <HelpCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Need a Custom Solution?
              </h3>
              <p className="text-sm text-gray-100 mb-6">
                Don’t see your industry? We offer customized lending solutions
                tailored to your specific business needs.
              </p>
            </div>
            <Link to={"/sign-up"}>
              <Button
                variant="secondary"
                className="bg-[#C8B491] text-black hover:bg-[#bba272] transition"
              >
                Get Started as Client
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
