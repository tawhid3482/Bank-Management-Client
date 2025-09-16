'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle2, DollarSign } from 'lucide-react'
import ProfileStats from './ProfileStats'

export default function CreditDashboard() {
  const creditScore = 95
  const suggestedLimit = 100000
  const [agreed, setAgreed] = useState(false)

  return (
    
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Title */}
      <h1 className="text-xl font-semibold text-[#4B203A]">M. GUEHI – Dashboard</h1>

      {/* Dashboard Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left: Credit Score Card */}
        <div className="md:col-span-2 bg-white rounded-xl shadow p-6 space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-sm font-medium text-gray-700">Your Credit Score</h2>
            <p className="text-xs text-gray-400">Updated today</p>
          </div>

          {/* Gauge Chart */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-40 h-40"
            >
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="10"
                  strokeDasharray={`${(creditScore / 100) * 283} 283`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full mb-1">
                  Excellent
                </span>
                <span className="text-4xl font-bold text-[#4B203A]">{creditScore}</span>
              </div>
            </motion.div>

            <p className="text-sm text-center text-gray-700 mt-4 max-w-xs">
              Your credit score is in the excellent range. This indicates excellent creditworthiness.
            </p>
          </div>

          {/* Score Factors */}
          <div className="border-t pt-4 space-y-4">
            <h3 className="font-medium text-sm text-gray-700">
              Factors affecting your score
            </h3>

            {[
              { label: 'Annual Income (FCFA)', value: 30 },
              { label: 'Electricity bill (FCFA)', value: 30 },
              { label: 'Mobile money Balance (FCFA)', value: 30 }
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{item.label}</span>
                  <span>{item.value}/30</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                  <div
                    className={`h-full rounded-full ${
                      item.label.includes('Electricity') ? 'bg-blue-600' : 'bg-green-600'
                    }`}
                    style={{ width: `${(item.value / 30) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Suggested Credit Limit */}
        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#4B203A]" />
            <div>
              <p className="text-sm text-gray-600 font-medium">Suggested Credit Limit</p>
              <p className="text-lg font-bold text-[#4B203A]">
                FCFA {suggestedLimit.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                Based on your credit score of {creditScore}/100
              </p>
            </div>
          </div>

          {/* Credit Tiers */}
          <div className="text-sm space-y-1">
            <p className="text-gray-600 font-semibold">Credit Limit Ranges</p>
            <div className="flex justify-between">
              <span>Excellent (80-100):</span>
              <span className="font-medium">FCFA 100,000</span>
            </div>
            <div className="flex justify-between">
              <span>Good (60–79):</span>
              <span className="font-medium">FCFA 50,000</span>
            </div>
            <div className="flex justify-between">
              <span>Fair (40–59):</span>
              <span className="font-medium">FCFA 30,000</span>
            </div>
            <div className="flex justify-between">
              <span>Poor (0–39):</span>
              <span className="font-medium">FCFA 10,000</span>
            </div>
          </div>

          {/* Consent */}
          <div className="flex items-start space-x-2">
            <Checkbox id="consent" onCheckedChange={(val) => setAgreed(val === true)} />
            <Label htmlFor="consent" className="text-xs text-gray-600 leading-tight">
              I agree to share my data with partner financial institutions for my credit application
            </Label>
          </div>

          {/* Loan Input */}
          <div>
            <Label htmlFor="loan" className="text-sm text-gray-700">Enter Loan Amount</Label>
            <Input id="loan" placeholder="Enter your amount" className="mt-1" />
          </div>

          <Button
            disabled={!agreed}
            className="w-full bg-[#4B203A] hover:bg-[#3b1a30] transition text-white"
          >
            Submit Application
          </Button>

          {/* Application Status */}
          <div className="border-t pt-4 space-y-2">
            <p className="font-medium text-sm text-gray-700">Application Status</p>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Profile Complete</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Score Generated</span>
            </div>
          </div>
        </div>
      </div>

      <ProfileStats />
    </div>
  )
}
