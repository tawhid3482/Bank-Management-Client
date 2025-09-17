"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, DollarSign } from "lucide-react";
import ProfileStats from "./ProfileStats";
import ProgressBar from "./ProgressBar";
import { useUserPersonalInfoQuery } from "@/redux/features/info/info.api";

const timeAgo = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  ); // days

  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return `${diff} days ago`;
};

export default function CreditDashboard() {
  const { data } = useUserPersonalInfoQuery("");
  const user = data?.data?.info;
  const info = user?.annualInfo;
  const creditScore = Number(user?.creditScore) || 0;
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const createdAt = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "N/A";

  // Suggested Limit Logic
  let suggestedLimit = 10000;
  if (creditScore >= 80) suggestedLimit = 100000;
  else if (creditScore >= 60) suggestedLimit = 50000;
  else if (creditScore >= 40) suggestedLimit = 30000;
  else suggestedLimit = 10000;

  const [agreed, setAgreed] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Title */}
      <h1 className="text-xl font-semibold text-[#4B203A]">
        {firstName + " " + lastName} – Dashboard
      </h1>

      {/* Dashboard Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left: Credit Score Card */}
        <div className="md:col-span-2 bg-white rounded-xl shadow p-6 space-y-6">
          <div className="border-b bg-gray-200 p-4  flex justify-between items-center">
            <h2 className="text-sm font-medium text-gray-700">
              Your Credit Score
            </h2>
            <p className="text-xs text-gray-400">
              Updated {timeAgo(createdAt)}
            </p>
          </div>
          {/* Gauge Chart */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center bg-white mb-5">
              <ProgressBar value={creditScore} />
            </div>
            {creditScore >= 90 ? (
              <p className="text-sm text-center text-gray-700 mt-4 ">
                Your credit score is in the <b>Excellent</b> range. This
                indicates excellent creditworthiness.
              </p>
            ) : creditScore >= 60 ? (
              <p className="text-sm text-center text-gray-700 mt-4 ">
                Your credit score is <b>Good</b>. You are likely to get a decent
                credit offer.
              </p>
            ) : (
              <p className="text-sm text-center text-gray-700 mt-4 max-w-xs">
                Your credit score is in the <b>Normal</b> range. Work on
                reducing debt and increasing savings.
              </p>
            )}
          </div>
          // Factors Section Update
          <div className="border-t pt-4 space-y-4">
            <h3 className="font-medium text-xl text-center text-gray-700">
              Factors affecting your score
            </h3>

            {[
              {
                label: "Annual Income (FCFA)",
                value: info?.annualIncome || 0,
                maxValue: 500000, // scale
                weight: 30, // max score
                color: "bg-green-600",
              },
              {
                label: "Electricity Bill (Annual FCFA)",
                value: info?.annualElectricityBill || 0,
                maxValue: 4000,
                weight: 30,
                color: "bg-blue-600",
              },
              {
                label: "Mobile Bill (Annual FCFA)",
                value: info?.annualMobileBill || 0,
                maxValue: 3000,
                weight: 30,
                color: "bg-green-600",
              },
            ].map((item, idx) => {
              // কত স্কোর আসবে weight অনুযায়ী
              const rawScore = (item.value / item.maxValue) * item.weight;
              const score = Math.min(Math.round(rawScore), item.weight); // cap at weight
              const percent = (score / item.weight) * 100;

              return (
                <div key={idx}>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{item.label}</span>
                    <span>
                      {score}/{item.weight}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Suggested Credit Limit */}
        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          <p className="text-sm text-gray-600 p-4  bg-gray-200 font-medium">
            Suggested Credit Limit
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <DollarSign className="w-10 h-10 flex items-center justify-center rounded-full bg-[#4B1E2F1A] text-[#4B203A] p-1 text-3xl" />

            <div className="flex flex-wrap items-center justify-center">
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
            <p className="text-gray-800  font-medium">Credit Limit Ranges</p>
            <div className="flex justify-between">
              <span>Excellent (80–100):</span>
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
            <Checkbox
              id="consent"
              onCheckedChange={(val) => setAgreed(val === true)}
            />
            <Label
              htmlFor="consent"
              className="text-xs text-gray-600 leading-tight"
            >
              I agree to share my data with partner financial institutions for
              my credit application
            </Label>
          </div>

          {/* Loan Input */}
          <div>
            <Label htmlFor="loan" className="text-sm text-gray-700">
              Enter Loan Amount
            </Label>
            <Input
              id="loan"
              placeholder="Enter your amount"
              type="number"
              className="mt-1"
            />
          </div>

          <Button
            disabled={!agreed}
            className="w-full bg-[#4B203A] hover:bg-[#3b1a30] transition text-white"
          >
            Submit Application
          </Button>

          {/* Application Status */}
          <div className="border-t pt-4 space-y-2">
            <p className="font-medium bg-gray-200 p-3 rounded-md text-sm text-gray-700">
              Application Status
            </p>
            <div className="flex items-center gap-2 text-sm ">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <div className="">
                <span>Profile Complete</span>
                <p className="text-sm">Your profile information is complete.</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm ">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <div className="">
                <span>Score Generated</span>
                <p>Your credit score has been calculated.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Stats Section */}
      <ProfileStats />
    </div>
  );
}
