/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useCreateProfileMutation } from "@/redux/features/info/info.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useNavigate } from "react-router";

// Contact schema
const TContact = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
});

// Financial Info schema with conditional validation
const TFinancialInfo = z
  .object({
    income: z.string().min(1, "Annual income required"),
    landOwned: z.string().min(1, "LandOwned amount required"),
    electricityBill: z.string().min(1, "ElectricityBill required"),
    mobileBill: z.string().min(1, "MobileBill required"),
    existingLoan: z.string(),
    existingLoanAmount: z.string().optional(),
  })
  .refine(
    (data) =>
      data.existingLoan !== "yes" || (data.existingLoan === "yes" && data.existingLoanAmount && data.existingLoanAmount.trim() !== ""),
    {
      message: "Loan amount is required when Yes is selected",
      path: ["existingLoanAmount"],
    }
  );

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  contact: TContact,
  financialInfo: TFinancialInfo,
});

type ProfileForm = z.infer<typeof profileSchema>;

export function Profile() {
  const navigator = useNavigate();
  const [createProfile] = useCreateProfileMutation();
  const { data } = useUserInfoQuery("");
  const id = data?.data?.id;
  const [step, setStep] = useState(1);

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      contact: { address: "", city: "", state: "", zipCode: "" },
      financialInfo: {
        income: "",
        landOwned: "",
        electricityBill: "",
        mobileBill: "",
        existingLoan: "",
        existingLoanAmount: "",
      },
    },
    mode: "onChange",
  });

  const next = async () => {
    const valid = await form.trigger(
      step === 1
        ? ["firstName", "lastName", "dateOfBirth", "gender"]
        : step === 2
        ? ["contact.address", "contact.city", "contact.state", "contact.zipCode"]
        : []
    );
    if (valid) setStep((p) => Math.min(p + 1, 3));
  };

  const back = () => setStep((p) => Math.max(p - 1, 1));

  const onSubmit = async (data: ProfileForm) => {
    const info = {
      userId: id,
      ...data,
      financialInfo: {
        income: Number(data.financialInfo.income),
        landOwned: Number(data.financialInfo.landOwned),
        electricityBill: Number(data.financialInfo.electricityBill),
        mobileBill: Number(data.financialInfo.mobileBill),
        existingLoan: data.financialInfo.existingLoanAmount
          ? Number(data.financialInfo.existingLoanAmount)
          : 0,
      },
    };
    console.log(info);
    try {
      const result = await createProfile(info).unwrap();
      console.log(result);
      if (result.success === true) {
        toast.success("Profile submitted successfully!");
        navigator("/profile");
      }
    } catch (err) {
      toast.error((err as any).data.message);
    }
  };

  // Watch existingLoan to conditionally show Loan Amount input
  const existingLoanValue = form.watch("financialInfo.existingLoan");

  return (
    <div className="max-w-6xl mx-auto mt-10 px-6 py-10 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-[#4B203A] mb-2">Complete Your Profile</h2>
      <p className="text-sm text-gray-600 mb-6">
        Please provide accurate information so we can generate your accurate credit profile.
      </p>

      {/* Stepper */}
      <div className="relative flex justify-between items-center mb-10">
        {["Personal", "Contact", "Financial"].map((label, i) => {
          const index = i + 1;
          return (
            <div key={label} className="flex flex-col items-center relative z-10">
              <div
                className={classNames(
                  "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors",
                  {
                    "bg-[#4B203A] text-white border-[#4B203A]": step >= index,
                    "bg-gray-200 text-gray-600 border-gray-300": step < index,
                  }
                )}
              >
                {index}
              </div>
              <span className="text-xs mt-2 text-gray-700">{label}</span>
            </div>
          );
        })}
        <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-300 -z-0">
          <div
            className="h-[2px] bg-[#4B203A] transition-all duration-500"
            style={{
              width: step === 1 ? "0%" : step === 2 ? "50%" : "100%",
            }}
          ></div>
        </div>
      </div>

      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1 */}
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["firstName", "lastName", "dateOfBirth"].map((field) => (
                    <FormField
                      key={field}
                      control={form.control}
                      name={field as keyof ProfileForm}
                      render={({ field: f }) => (
                        <FormItem>
                          <FormLabel className="capitalize">{field}</FormLabel>
                          <FormControl>
                            <Input
                              type={field === "dateOfBirth" ? "date" : "text"}
                              value={typeof f.value === "string" ? f.value : ""}
                              onChange={f.onChange}
                              onBlur={f.onBlur}
                              name={f.name}
                              ref={f.ref}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  {/* Gender */}
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full border rounded-md h-10 px-3 text-sm text-gray-700"
                          >
                            <option value="">Select</option>
                            <option value={"male"}>male</option>
                            <option value={"female"}>female</option>
                            <option value={"other"}>other</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(["address", "city", "state", "zipCode"] as const).map((field) => (
                    <FormField
                      key={field}
                      control={form.control}
                      name={`contact.${field}` as const}
                      render={({ field: f }) => (
                        <FormItem>
                          <FormLabel className="capitalize">{field === "zipCode" ? "ZIP code" : field}</FormLabel>
                          <FormControl>
                            <Input {...f} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(["income", "landOwned", "electricityBill", "mobileBill"] as const).map((field) => (
                    <FormField
                      key={field}
                      control={form.control}
                      name={`financialInfo.${field}` as const}
                      render={({ field: f }) => (
                        <FormItem>
                          <FormLabel className="capitalize">
                            {field === "income"
                              ? "Annual Income (FCFA)"
                              : field === "landOwned"
                              ? "Value of Land ownership (FCFA)"
                              : field === "electricityBill"
                              ? "Electricity bill (FCFA)"
                              : "Mobile money Balance (FCFA)"}
                          </FormLabel>
                          <FormControl>
                            <Input {...f} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}

                  {/* Existing Loans */}
                  <FormField
                    control={form.control}
                    name="financialInfo.existingLoan"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2 mt-4">
                        <FormLabel>Existing Loans</FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="mt-2 flex gap-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="r1" />
                              <Label htmlFor="r1">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="r2" />
                              <Label htmlFor="r2">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />

                        {/* Loan Amount Input */}
                        {existingLoanValue === "yes" && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4"
                          >
                            <FormField
                              control={form.control}
                              name="financialInfo.existingLoanAmount"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Enter Loan Amount (FCFA)</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="Enter loan amount" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}

                        <div className="flex items-center gap-2 mt-4">
                          <input type="checkbox" id="agree-share-data" />
                          <label
                            htmlFor="agree-share-data"
                            className="text-xs cursor-pointer text-gray-500"
                          >
                            I agree to share my data with GUEHI AND CO to process my credit score
                          </label>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </motion.div>

            {/* Buttons */}
            <div className="mt-8 flex justify-between">
              {step > 1 ? (
                <Button variant="outline" type="button" onClick={back}>
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <Button type="button" onClick={next}>
                  Next
                </Button>
              ) : (
                <Button className="cursor-pointer" type="submit">
                  Submit Application
                </Button>
              )}
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
}
