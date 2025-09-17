import { useUserPersonalInfoQuery } from "@/redux/features/info/info.api";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const LoanStats = () => {
  const { data } = useUserPersonalInfoQuery("", {
    refetchOnMountOrArgChange: true,
  });
  const navigate = useNavigate();
  const user = data?.data;
  const status = user?.info?.status;
  const loan = user?.info?.isApproved;
  const rejected = user?.info?.rejectedNotes;

  console.log(loan, rejected, user);

  useEffect(() => {
    if (!status) {
      toast.error("Apply First For Loan");
      navigate("/profile");
    }
  }, [status, navigate]);

  // Rejected condition
  if (rejected)
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <p className="text-2xl text-center font-bold ">
          We’re sorry, your loan was not approved at this time.
        </p>
        <p className="text-center mt-2 text-gray-700">{rejected}</p>

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvIt1L6YSxTbDElN7yP0YZ-L2KNmBo5PVLaA&s"
          alt="Rejected Loan"
          className="w-[355px] h-[337px]"
        />
      </div>
    );

  // Not yet approved
  if (!loan)
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <p className="text-2xl text-center font-bold">
          Your loan has not yet been approved. Please wait for further updates.
        </p>
        <img
          src="https://img.freepik.com/free-vector/estate-planning-abstract-concept-vector-illustration-real-estate-assets-control-keep-documents-order-trust-account-attorney-advise-life-insurance-personal-possession-abstract-metaphor_335657-5752.jpg"
          alt="Pending Loan"
          className="w-[465px] h-[477px]"
        />
      </div>
    );

  // Approved loan
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-md shadow-sm">
      <div>
        <p className="font-medium">Loan Amount</p>
        <p>{loan.loanAmount}</p>
      </div>
      <div>
        <p className="font-medium">Interest Rate</p>
        <p>{loan.interestRate}%</p>
      </div>
      <div>
        <p className="font-medium">Term (months)</p>
        <p>{loan.TermMonth} Month</p>
      </div>
      <div className="flex items-start gap-2">
        <p className="font-medium">**Note:</p>
        <p>{loan.notes}</p>
      </div>
    </div>
  );
};

export default LoanStats;
