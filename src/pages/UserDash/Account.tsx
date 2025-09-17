import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Shield, FileText, LogOut } from "lucide-react";
import PersonalInfo from "./PersonalInfo";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/redux/hook";
import { useUserPersonalInfoQuery } from "@/redux/features/info/info.api";
import Security from "./Security";
import LoanStats from "./LoanStats";

export function Account() {
  const [activeTab, setActiveTab] = useState("personal"); // state for sidebar navigation
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [logout] = useLogoutMutation();
  const {data}=useUserPersonalInfoQuery('')
  const info = data?.data
   const firstName = info?.info?.firstName || "";
  const lastName = info?.info?.lastName || "";

  const handleLogout = async () => {
    await logout("").unwrap();
    dispatch(authApi.util.resetApiState());
    navigate("/");
  };

  return (
    <div className="bg-gray-50 p-8 font-sans text-gray-800">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-800">Account Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your account preferences and information
        </p>
      </div>

      <div className="flex items-start gap-5">
        {/* Sidebar */}
        <div className="w-1/4 max-w-xs">
          <Card className="h-full rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12 border-2">
                  <AvatarImage src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small_2x/Basic_Ui__28186_29.jpg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{firstName + " " + lastName}</p>
                  <p className="text-sm text-gray-500">
                    {data?.data?.email}
                  </p>
                </div>
              </div>
            </CardContent>

            <nav className="mt-2">
              <button
                onClick={() => setActiveTab("personal")}
                className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === "personal"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <User size={18} />
                <span>Personal Information</span>
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-sm cursor-pointer font-medium transition-colors ${
                  activeTab === "security"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Shield size={18} />
                <span>Security</span>
              </button>
              <button
                onClick={() => setActiveTab("loan")}
                className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 cursor-pointer text-sm font-medium transition-colors ${
                  activeTab === "loan"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FileText size={18} />
                <span>Loan Status</span>
              </button>
            </nav>

            <div className="mt-4 border-t border-gray-200 p-4">
              <button
                onClick={handleLogout}
                className="flex w-full items-center space-x-3 text-sm font-medium text-red-500 transition-colors cursor-pointer hover:text-red-600"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="w-3/4">
          <Card className="rounded-lg ">
            <CardContent className="p-6">
              {activeTab === "personal" && <PersonalInfo />}
              {activeTab === "security" && (
               <Security />
              )}
              {activeTab === "loan" && (
               <LoanStats />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
