'use client'

import { motion } from 'framer-motion'
import {
  CheckCircle,
  UserPlus,
  FileText,
  BarChart2,
  ShieldCheck,
  XCircle,
} from 'lucide-react'

const tiers = [
  {
    level: 'Poor',
    range: '0-39',
    amount: '10,000 FCFA',
    desc: 'Basic credit limit with opportunities to improve your score',
    points: [
      { text: 'Limited borrowing capacity', icon: <XCircle className="text-red-500 w-4 h-4" /> },
      { text: 'Higher interest rates', icon: <XCircle className="text-red-500 w-4 h-4" /> },
    ],
    color: 'from-red-100 to-red-50',
    badge: 'bg-red-100 text-red-600',
  },
  {
    level: 'Fair',
    range: '40-59',
    amount: '30,000 FCFA',
    desc: 'Moderate credit limit with standard terms',
    points: [
      { text: 'Reasonable borrowing capacity', icon: <CheckCircle className="text-orange-500 w-4 h-4" /> },
      { text: 'Standard interest rates', icon: <CheckCircle className="text-orange-500 w-4 h-4" /> },
    ],
    color: 'from-orange-100 to-orange-50',
    badge: 'bg-orange-100 text-orange-600',
  },
  {
    level: 'Good',
    range: '60-79',
    amount: '50,000 FCFA',
    desc: 'Enhanced credit limit with preferential terms',
    points: [
      { text: 'Good borrowing capacity', icon: <CheckCircle className="text-yellow-500 w-4 h-4" /> },
      { text: 'Competitive interest rates', icon: <CheckCircle className="text-yellow-500 w-4 h-4" /> },
    ],
    color: 'from-yellow-100 to-yellow-50',
    badge: 'bg-yellow-100 text-yellow-600',
  },
  {
    level: 'Excellent',
    range: '80-100',
    amount: '100,000 FCFA',
    desc: 'Maximum credit limit with premium benefits',
    points: [
      { text: 'Maximum borrowing capacity', icon: <CheckCircle className="text-green-500 w-4 h-4" /> },
      { text: 'Lowest interest rates', icon: <CheckCircle className="text-green-500 w-4 h-4" /> },
    ],
    color: 'from-green-100 to-green-50',
    badge: 'bg-green-100 text-green-600',
  },
]

const steps = [
  {
    icon: <UserPlus className="w-6 h-6 text-[#4B203A]" />,
    title: 'Create Account',
    desc: 'Sign up with your basic information to get started on your credit journey.',
  },
  {
    icon: <FileText className="w-6 h-6 text-[#4B203A]" />,
    title: 'Fill Data Form',
    desc: 'Provide your financial information securely to calculate your credit score.',
  },
  {
    icon: <BarChart2 className="w-6 h-6 text-[#4B203A]" />,
    title: 'Get Score & Limit',
    desc: 'Receive your credit score and suggested credit limit instantly.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#4B203A]" />,
    title: 'Connect with Lenders',
    desc: 'Consent to share your score with trusted lenders to receive loan offers.',
  },
]

export default function CreditLimitAndHowItWorks() {
  return (
    <section className="bg-white py-20 px-6 md:px-20 text-[#4B203A]">
      {/* Credit Limit Tiers */}
      <div className="max-w-7xl mx-auto mb-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Credit Limit Tiers
          </h2>
          <p className="text-gray-600">
            Our system suggests credit limits based on your credit score range
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              className={`bg-gradient-to-br ${tier.color} p-6 rounded-lg border shadow-sm`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{tier.level}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${tier.badge}`}>
                  {tier.range}
                </span>
              </div>
              <div className="text-xl font-bold mb-2">{tier.amount}</div>
              <p className="text-sm text-gray-700 mb-4">{tier.desc}</p>
              <ul className="text-sm space-y-2">
                {tier.points.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    {point.icon}
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">How It Works</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Get your credit score and suggested credit limit in just four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.5, duration: 0.4 }}
              className="bg-white border p-6 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4">{step.icon}</div>
              <h4 className="font-semibold mb-1">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
