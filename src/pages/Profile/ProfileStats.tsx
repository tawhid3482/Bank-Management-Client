import { FaDollarSign, FaLandmark, FaEye } from "react-icons/fa";
import { MdCreditScore } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi2";
import { useUserPersonalInfoQuery } from "@/redux/features/info/info.api";

// timeAgo helper function
const timeAgo = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)); // days

  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return `${diff} days ago`;
};

export default function ProfileStats() {
  const { data } = useUserPersonalInfoQuery("");
  const user = data?.data?.info;

  const annualIncome = user?.annualInfo?.annualIncome || 0;
  const landOwned = user?.financialInfo?.landOwned || 0;

  const financialSummary = [
    {
      label: "Annual Income",
      value: annualIncome,
      icon: <FaDollarSign className="text-green-600" />,
      bg: "bg-green-100",
    },
    {
      label: "Value of Land ownership",
      value: landOwned,
      icon: <FaLandmark className="text-purple-600" />,
      bg: "bg-purple-100",
    },
    {
      label: "Debt-to-Income Ratio",
      value: "17/17",
      icon: <MdCreditScore className="text-yellow-600" />,
      bg: "bg-yellow-100",
    },
  ];

  const recentActivity = [
    {
      label: "Credit score calculated",
      icon: <MdCreditScore className="text-yellow-600" />,
      bg: "bg-yellow-100",
      createdAt: user?.createdAt || new Date().toISOString(),
    },
    {
      label: "Profile information submitted",
      icon: <HiUserCircle className="text-purple-600" />,
      bg: "bg-purple-100",
      createdAt: user?.updatedAt || new Date().toISOString(),
    },
    {
      label: "Account created",
      icon: <FaEye className="text-gray-600" />,
      bg: "bg-gray-200",
      createdAt: user?.createdAt || new Date().toISOString(),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Financial Summary */}
      <div className="space-y-2">
        <h2 className="text-md font-semibold text-gray-800">
          Financial Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {financialSummary.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-4 rounded-lg border bg-white shadow-sm"
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${item.bg}`}
              >
                {item.icon}
              </div>
              <div>
                <div className="text-sm text-gray-500">{item.label}</div>
                <div className="text-md font-medium text-gray-900">
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-2">
        <h2 className="text-md font-semibold text-gray-800">Recent Activity</h2>
        <div className="space-y-2">
          {recentActivity.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 rounded-lg border bg-white shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${item.bg}`}
                >
                  {item.icon}
                </div>
                <div className="text-gray-z800 text-sm font-medium">
                  {item.label}
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {timeAgo(item.createdAt)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
