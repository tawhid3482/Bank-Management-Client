/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Calendar,
  CreditCard,
  DollarSign,
  Download,
  Gift,
  LocationEdit,
  Mail,
  Phone,
} from "lucide-react";
import {
  useApprovedLoanMutation,
  useGetPersonalInfoQuery,
  useRejectedLoanMutation,
} from "@/redux/features/info/info.api";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import RightColumn from "./RightColumn";
import { toast } from "sonner";

interface InfoProps {
  infoId: string;
}

interface ApproveForm {
  loanAmount: string;
  interestRate: string;
  termMonth: string;
  notes: string;
}

interface RejectForm {
  rejectReason: string;
  notes: string;
}

const Modal = ({ infoId }: InfoProps) => {
  const [decision, setDecision] = useState<"approve" | "reject" | null>(null);
  const { data, isLoading } = useGetPersonalInfoQuery(infoId, {
    refetchOnMountOrArgChange: true,
  });

  const [approvedLoan] = useApprovedLoanMutation();
  const [rejectedLoan] = useRejectedLoanMutation();

  const {
    register: approveRegister,
    reset: resetApprove,
    getValues: getApproveValues,
  } = useForm<ApproveForm>();

  const {
    register: rejectRegister,
    reset: resetReject,
    getValues: getRejectValues,
  } = useForm<RejectForm>();

  if (isLoading) return <p>Loading...</p>;

  const info = data?.data;

  // Approve submit handler
  const onSubmitApprove: SubmitHandler<ApproveForm> = async (formData) => {
    try {
      const approvedInfo = {
        loanAmount: Number(formData.loanAmount),
        interestRate: Number(formData.interestRate),
        TermMonth: Number(formData.termMonth),
        notes: formData.notes,
      };
      const res = await approvedLoan({
        userInfo: approvedInfo,
        id: infoId,
      }).unwrap();
      if (res.success === true) {
        toast.success("Loan approved successfully");
      }
      resetApprove();
      setDecision(null);
    } catch (error) {
      toast.error((error as any).message);
    }
  };

  // Reject submit handler
  const onSubmitReject: SubmitHandler<RejectForm> = async (formData) => {
    try {
      const rejectedInfo = {
        rejectedNotes: formData.rejectReason,
      };
      const res = await rejectedLoan({
        userInfo: rejectedInfo,
        id: infoId,
      }).unwrap();
      if (res.success === true) {
        toast.success("Loan rejected ");
      }
      resetReject();
      setDecision(null);
    } catch (error) {
      toast.error((error as any).message);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Client Details</h1>
          <button className="flex items-center gap-1 text-md cursor-pointer ">
            <Download />
            <span> Export</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Credit Passport */}
            <div className="bg-gray-50 p-4 rounded-md shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Credit Passport</h2>
              <div className="flex items-center space-x-4">
                <img
                  src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                  alt="User"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="font-bold text-gray-700">
                    {info?.firstName} {info?.lastName}
                  </p>
                  <div className="flex items-center gap-2 my-2">
                    <Mail />
                    <p className="text-sm text-gray-600">{info?.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone />
                    <p className="text-sm text-gray-600">{info?.phone}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 md:ml-28 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar />
                    <p>
                      <strong>Date of Birth:</strong>{" "}
                      {new Date(info?.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <LocationEdit />
                    <p>
                      <strong>Location:</strong> {info?.contact?.state}
                    </p>
                  </div>
                  <p>
                    <strong>Gender:</strong> {info?.gender}
                  </p>
                </div>
              </div>
            </div>

            {/* Financial Info */}
            <div className="bg-gray-50 p-4 rounded-md shadow-sm">
              <h2 className="text-lg font-semibold mb-4">
                Financial Information
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-1">
                  <DollarSign size={16}></DollarSign>
                  <p>
                    <strong>Annual Income (FCFA):</strong>{" "}
                    {info?.annualInfo?.annualIncome}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <CreditCard size={16} />
                  <p>
                    <strong>Existing Loans:</strong>{" "}
                    {info?.financialInfo?.existingLoan > 0 ? "YES" : "NO"}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <Gift size={16} />
                  <p>
                    <strong>Value of Land ownership (FCFA):</strong>{" "}
                    {info?.financialInfo?.landOwned}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <CreditCard size={16} />
                  <p>
                    <strong>Credit Card Debt:</strong> {info?.totalDebt}
                  </p>
                </div>
                <p>
                  <strong>Mobile money Balance (FCFA):</strong>{" "}
                  {info?.financialInfo?.mobileBill}
                </p>
              </div>
            </div>

            {/* Decision */}
            {/* Approve / Reject Section */}
            <div className="bg-gray-50 p-4 rounded-md shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Decision</h2>

              {/* Approve / Reject Buttons */}
              <div className="flex space-x-4 mb-4">
                <button
                  className={`px-4 py-2 rounded-md text-green-600 ${
                    decision === "approve"
                      ? "bg-[#039B06] text-white"
                      : "bg-[#039B061A]  hover:bg-[#039B06]"
                  }`}
                  onClick={() => setDecision("approve")}
                >
                  ✓ Approve
                </button>
                <button
                  className={`px-4 py-2 rounded-md text-red-600 ${
                    decision === "reject"
                      ? "bg-[#D00202] text-white"
                      : "bg-[#D002021A]  hover:bg-red-600"
                  }`}
                  onClick={() => setDecision("reject")}
                >
                  ✕ Reject
                </button>
              </div>

              {/* Approve Section */}
              {decision === "approve" && (
                <div className="p-6 bg-[#039B061A] border border-gray-300 rounded-lg shadow-sm w-full mx-auto font-sans grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Loan Amount ($)
                    </label>
                    <input
                      type="number"
                      {...approveRegister("loanAmount")}
                      className="mt-1 block w-full p-2 border bg-gray-100 border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      {...approveRegister("interestRate")}
                      className="mt-1 block w-full p-2 border bg-gray-100 border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Term (months)
                    </label>
                    <select
                      {...approveRegister("termMonth")}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white"
                    >
                      <option value="">Select a term</option>
                      <option value="1">1</option>
                      <option value="3">3</option>
                      <option value="6">6</option>
                      <option value="8">8</option>
                      <option value="12">12</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Reject Section */}
              {decision === "reject" && (
                <div className="p-4 bg-red-100 border border-red-300 rounded-lg shadow-sm">
                  <textarea
                    {...rejectRegister("rejectReason")}
                    className="w-full p-2 border rounded-md"
                    rows={3}
                    placeholder="Enter reason for rejection..."
                  ></textarea>
                </div>
              )}
              {decision !== "reject" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    {...approveRegister("notes")}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={3}
                    placeholder="Optional notes..."
                  ></textarea>
                </div>
              )}

              {/* Submit button under Notes */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => {
                    const notes = getApproveValues("notes") || "";
                    if (decision === "approve") {
                      onSubmitApprove({ ...getApproveValues(), notes });
                    } else if (decision === "reject") {
                      onSubmitReject({
                        rejectReason: getRejectValues("rejectReason"),
                        notes,
                      });
                    }
                  }}
                  className="px-4 py-2 rounded-md text-white bg-[#4B1E2F]"
                >
                  Submit Decision
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <RightColumn info={info}></RightColumn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
