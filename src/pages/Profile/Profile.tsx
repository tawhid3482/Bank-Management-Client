/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useCreateProfileMutation } from "@/redux/features/info/info.api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

// Define a type for our errors object to improve type safety
type Errors = {
  [key: string]: string;
};

export default function Profile() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    income: "",
    landOwned: "",
    electricityBill: "",
    mobileBill: "",
    existingLoan: "",
    loanAmount: "",
    agreeDataShare: false,
  });
  const { data } = useUserInfoQuery("");
  const userId = data?.data;
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Errors>({});
  const [createProfile] = useCreateProfileMutation();
  const validateStep = () => {
    const currentErrors: Errors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) {
        currentErrors.firstName = "First Name is required";
      }
      if (!formData.lastName.trim()) {
        currentErrors.lastName = "Last Name is required";
      }
      if (!formData.dateOfBirth.trim()) {
        currentErrors.dateOfBirth = "Date of Birth is required";
      }
      if (!formData.gender.trim()) {
        currentErrors.gender = "Gender is required";
      }
    }

    if (step === 2) {
      if (!formData.address.trim()) {
        currentErrors.address = "Address is required";
      }
      if (!formData.city.trim()) {
        currentErrors.city = "City is required";
      }
      if (!formData.state.trim()) {
        currentErrors.state = "State is required";
      }
      if (!formData.zipCode.trim()) {
        currentErrors.zipCode = "ZIP code is required";
      }
    }

    if (step === 3) {
      if (!formData.income.trim()) {
        currentErrors.income = "Annual Income is required";
      }
      if (!formData.landOwned.trim()) {
        currentErrors.landOwned = "Value of Land ownership is required";
      }
      if (!formData.electricityBill.trim()) {
        currentErrors.electricityBill = "Electricity bill is required";
      }
      if (!formData.mobileBill.trim()) {
        currentErrors.mobileBill = "Mobile money Balance is required";
      }
      if (!formData.existingLoan.trim()) {
        currentErrors.existingLoan =
          "Please specify if you have existing loans";
      }
      if (formData.existingLoan === "yes" && !formData.loanAmount.trim()) {
        currentErrors.loanAmount = "Loan Amount is required";
      }
      if (!formData.agreeDataShare) {
        currentErrors.agreeDataShare = "You must agree to share your data";
      }
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const next = () => {
    if (validateStep()) {
      setStep((p) => Math.min(p + 1, 3));
      setErrors({}); // Clear errors on successful step transition
    } else {
      toast.error("Please fix the errors before proceeding.");
    }
  };

  const back = () => {
    setErrors({});
    setStep((p) => Math.max(p - 1, 1));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = target.checked;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name];
      return newErrors;
    });
  };

  // Helper to check if error exists for a field
  const hasError = (fieldName: string) => !!errors[fieldName];

  return (
    <div className="max-w-6xl mx-auto mt-10 px-6 py-10 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-[#4B203A] mb-2">
        Complete Your Profile
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Please provide accurate information so we can generate your accurate
        credit profile.
      </p>

      {/* Stepper */}
      <div className="relative flex justify-between items-center mb-10">
        {["Personal", "Contact", "Financial"].map((label, i) => {
          const index = i + 1;
          const isComplete = step > index;
          const isCurrent = step === index;
          return (
            <div
              key={label}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors ${
                  isCurrent || isComplete
                    ? "bg-[#4B203A] text-white border-[#4B203A]"
                    : "bg-gray-200 text-gray-600 border-gray-300"
                }`}
              >
                {isComplete ? "✓" : index}
              </div>
              <span className="text-xs mt-2 text-gray-700">{label}</span>
            </div>
          );
        })}
        <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-300 -z-0">
          <div
            className="h-[2px] bg-[#4B203A] transition-all duration-500"
            style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
          />
        </div>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (validateStep()) {
            const info = {
              userId: userId.id,
              firstName: formData.firstName,
              lastName: formData.lastName,
              dateOfBirth: formData.dateOfBirth,
              gender: formData.gender,
              contact: {
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
              },
              financialInfo: {
                income: Number(formData.income),
                landOwned: Number(formData.landOwned),
                electricityBill: Number(formData.electricityBill),
                mobileBill: Number(formData.mobileBill),
                existingLoan:
                  formData.existingLoan === "yes"
                    ? Number(formData.loanAmount)
                    : 0,
               
                ...(formData.existingLoan === "yes" && {
                  loanAmount: Number(formData.loanAmount),
                }),
              },
            };
console.log(formData.loanAmount)
            const res = await createProfile(info).unwrap();
            if (res.success === true) {
              toast.success("Profile created successfully");
              navigate("/profile");
            }
          } else {
            toast.error("Please fix the errors before submitting.");
          }
        }}
      >
        {/* Step 1 */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full border rounded-md h-10 px-3 text-sm ${
                  hasError("firstName") ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full border rounded-md h-10 px-3 text-sm ${
                  hasError("lastName") ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
            <div>
              <label className="block mb-1">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`w-full border rounded-md h-10 px-3 text-sm ${
                  hasError("dateOfBirth") ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dateOfBirth}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full border rounded-md h-10 px-3 text-sm ${
                  hasError("gender") ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["address", "city", "state", "zipCode"].map((field) => (
              <div key={field}>
                <label className="block mb-1">
                  {field === "zipCode" ? "ZIP code" : field}
                </label>
                <input
                  type="text"
                  name={field}
                  value={(formData as any)[field]}
                  onChange={handleChange}
                  className={`w-full border rounded-md h-10 px-3 text-sm ${
                    hasError(field) ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[field] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Annual Income (FCFA)</label>
              <input
                type="number"
                name="income"
                value={formData.income}
                onChange={handleChange}
                className={`w-full border rounded-md h-10 px-3 text-sm ${
                  hasError("income") ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.income && (
                <p className="text-red-500 text-xs mt-1">{errors.income}</p>
              )}
            </div>
            <div>
              <label className="block mb-1">
                Value of Land ownership (FCFA)
              </label>
              <input
                type="number"
                name="landOwned"
                value={formData.landOwned}
                onChange={handleChange}
                className={`w-full border rounded-md h-10 px-3 text-sm ${
                  hasError("landOwned") ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.landOwned && (
                <p className="text-red-500 text-xs mt-1">{errors.landOwned}</p>
              )}
            </div>
            <div>
              <label className="block mb-1">Electricity bill (FCFA)</label>
              <input
                type="number"
                name="electricityBill"
                value={formData.electricityBill}
                onChange={handleChange}
                className={`w-full border rounded-md h-10 px-3 text-sm ${
                  hasError("electricityBill")
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.electricityBill && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.electricityBill}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1">Mobile money Balance (FCFA)</label>
              <input
                type="number"
                name="mobileBill"
                value={formData.mobileBill}
                onChange={handleChange}
                className={`w-full border rounded-md h-10 px-3 text-sm ${
                  hasError("mobileBill") ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.mobileBill && (
                <p className="text-red-500 text-xs mt-1">{errors.mobileBill}</p>
              )}
            </div>

            <div className="md:col-span-2 mt-4">
              <label className="block mb-1">Existing Loans</label>
              <div className="flex gap-6 mt-2">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="existingLoan"
                    value="yes"
                    checked={formData.existingLoan === "yes"}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Yes
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="existingLoan"
                    value="no"
                    checked={formData.existingLoan === "no"}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  No
                </label>
              </div>
              {errors.existingLoan && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.existingLoan}
                </p>
              )}
            </div>

            {formData.existingLoan === "yes" && (
              <div>
                <label className="block mb-1">Loan Amount (FCFA)</label>
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  className={`w-full border rounded-md h-10 px-3 text-sm ${
                    hasError("loanAmount")
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.loanAmount && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.loanAmount}
                  </p>
                )}
              </div>
            )}

            <div className="md:col-span-2 mt-4 flex items-center gap-3">
              <input
                type="checkbox"
                id="agreeDataShare"
                name="agreeDataShare"
                checked={formData.agreeDataShare}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label htmlFor="agreeDataShare" className="text-sm">
                I agree to share my data with GUEHI AND CO to process my credit score
              </label>
            </div>
            {errors.agreeDataShare && (
              <p className="text-red-500 text-xs mt-1 md:col-span-2">
                {errors.agreeDataShare}
              </p>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-10">
          {step > 1 && (
            <button
              type="button"
              onClick={back}
              className="bg-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-400"
            >
              Back
            </button>
          )}

          <div className="ml-auto">
            {step < 3 && (
              <button
                type="button"
                onClick={next}
                className="bg-[#4B203A] text-white px-4 py-2 rounded-md hover:bg-[#3b172f]"
              >
                Next
              </button>
            )}
            {step === 3 && (
              <button
                type="submit"
                className="bg-[#4B203A] text-white px-4 py-2 rounded-md hover:bg-[#3b172f]"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
