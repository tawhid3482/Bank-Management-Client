// About.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Award, ChartColumn, ShieldCheck, UserPlus } from "lucide-react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";

const steps = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#4B203A]" />,
    title: "Trust & Transparency",
    desc: "We believe in complete transparency in our scoring models and lending processes, building trust with both clients and lenders.",
  },
  {
    icon: <FaArrowTrendUp className="w-6 h-6 text-[#4B203A]" />,
    title: "Innovation",
    desc: "We continuously innovate our platform and scoring models to provide the most accurate and fair assessment of creditworthiness.",
  },
  {
    icon: <UserPlus className="w-6 h-6 text-[#4B203A]" />,
    title: "Client-Centered",
    desc: "We put our clients' needs first, ensuring they have control over their data and receive fair treatment from lenders.",
  },
  {
    icon: <TbWorld className="w-6 h-6 text-[#4B203A]" />,
    title: "Inclusively",
    desc: "We're committed to creating financial opportunities for underserved communities and businesses across diverse industries.",
  },
  {
    icon: <Award className="w-6 h-6 text-[#4B203A]" />,
    title: "Excellence",
    desc: "We strive for excellence in all aspects of our platform, from user experience to the accuracy of our credit scoring algorithms.",
  },
  {
    icon: <ChartColumn className="w-6 h-6 text-[#4B203A]" />,
    title: "Social Impact",
    desc: "We measure our success not just by profits, but by the positive impact we make on individuals, businesses, and communities.",
  },
];

/**
 * fadeInUp: per-index variant generator
 * return type annotated as Variants for better typing
 */
const fadeInUp = (i = 0): Variants => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12, // stagger by index
      duration: 0.6,
      ease: "easeOut", // <-- use string easing to avoid TS error
    },
  },
});

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="bg-[#4B203A] text-white p-6 md:p-12 h-auto md:h-80 flex flex-col items-center justify-center gap-4 text-center"
      >
        <motion.h1
          initial={{ y: -18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold"
        >
          About GUEHI AND CO
        </motion.h1>

        <motion.p
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
          className="text-sm md:text-lg max-w-2xl"
        >
          Transforming the lending industry with transparency, technology, and
          trust
        </motion.p>
      </motion.section>

      {/* Mission Section 1 */}
      <section className="w-full bg-white rounded-2xl overflow-hidden my-6">
        <div className="max-w-6xl mx-auto my-3 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left Image */}
            <motion.div
              variants={fadeInUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4 }}
              className="w-full h-60 md:h-80 rounded-lg overflow-hidden shadow-sm"
            >
              <img
                src="https://media.istockphoto.com/id/627674754/photo/bank-counter.jpg?s=612x612&w=0&k=20&c=NSLm63a5128KNBP3NjU1ovQRVIWJkKRx7m0n0w3Bs9M="
                alt="Bank counter"
                className="object-cover w-full h-full"
              />
            </motion.div>

            {/* Right Text */}
            <motion.div
              variants={fadeInUp(1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              className="my-2"
            >
              <span className="inline-block text-sm px-3 py-1 font-semibold bg-[#4B1E2F33] text-[#4B1E2F] rounded-md">
                Our Mission
              </span>

              <div className="mt-3">
                <p className="text-xl md:text-2xl font-semibold">
                  Democratizing Access to Fair Credit
                </p>
              </div>

              <p className="mt-4 text-gray-600 text-sm md:text-base leading-relaxed">
                At GUEHI AND CO, our mission is to create a more inclusive
                financial ecosystem where everyone has access to fair credit
                opportunities. We break down barriers between lenders and
                borrowers through transparent, data-driven solutions that
                benefit both sides of the lending equation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section 2 */}
      <section className="w-full bg-white rounded-2xl overflow-hidden my-10">
        <div className="max-w-6xl mx-auto my-3 px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-6">
            {/* Right Image */}
            <motion.div
              variants={fadeInUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4 }}
              className="w-full h-60 md:h-80 rounded-lg overflow-hidden shadow-sm"
            >
              <img
                src="https://img.freepik.com/free-photo/two-confident-business-man-shaking-hands-meeting-office-success-dealing-greeting-partner-concept_1423-185.jpg"
                alt="Handshake"
                className="object-cover w-full h-full"
              />
            </motion.div>

            {/* Left Text */}
            <motion.div
              variants={fadeInUp(1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              className="my-2"
            >
              <span className="inline-block text-sm px-3 py-1 font-semibold text-[#4B1E2F] bg-[#4B1E2F33] rounded-md">
                Our Vision
              </span>

              <div className="mt-3">
                <p className="text-xl md:text-2xl font-semibold">
                  Reimagining Financial Relationships
                </p>
              </div>

              <p className="mt-4 text-gray-600 text-sm md:text-base leading-relaxed">
                We envision a world where lending decisions are based on
                comprehensive, fair assessments rather than limited credit
                histories. Our platform aims to be the global standard for
                connecting qualified borrowers with the right lenders across
                multiple industries, creating mutual value and trust.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <div className="max-w-6xl mx-auto px-4 my-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Our Core Values
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            The principles that guide everything we do at GUEHI AND CO
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeInUp(index)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="bg-white border p-6 rounded-lg shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1"
            >
              <div className="mb-4">{step.icon}</div>
              <h4 className="font-semibold mb-1">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
