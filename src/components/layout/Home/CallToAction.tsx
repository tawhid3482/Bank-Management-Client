
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function CallToAction() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#D9C7B3] py-16 px-6 md:px-12 rounded-xl text-center max-w-5xl mx-auto my-20 shadow"
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-[#4B203A] mb-4">
        Ready to discover your credit potential?
      </h2>
      <p className="text-gray-700 mb-6 max-w-xl mx-auto">
        Get your credit score now and see what credit limit you qualify for. It’s quick, 
        free, and completely transparent.
      </p>
      <Button className="bg-[#4B203A] text-white hover:bg-[#3e1a32] transition">
        Get Your Credit Score
      </Button>
    </motion.section>
  )
}
