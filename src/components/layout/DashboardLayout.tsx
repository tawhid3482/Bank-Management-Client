"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Settings, LogOut, Menu, X } from "lucide-react";
import logo from "../../assets/image/logo.png";
import { NavLink, Outlet, useNavigate } from "react-router";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    await logout("").unwrap();
    dispatch(authApi.util.resetApiState());
    navigate("/");
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#2C0A2D] text-white shadow-lg rounded-r-3xl transform transition-transform duration-300 
        lg:static lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Content */}
        <div className="flex flex-1 flex-col p-6 overflow-y-auto">
          {/* Logo */}
          <div className="mb-10 flex items-center justify-center">
            <div className="flex h-16 w-32 items-center justify-center rounded-lg bg-white p-2">
              <img
                src={logo}
                alt="Company Logo"
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            <NavLink
              to={"/admin/dashboard"}
              className={({ isActive }) =>
                `flex w-full items-center justify-start space-x-3 px-4 py-6 text-lg font-medium ${
                  isActive
                    ? "text-white bg-opacity-20"
                    : "text-gray-400"
                } rounded-lg`
              }
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to={"/admin/settings"}
              className={({ isActive }) =>
                `flex w-full items-center justify-start space-x-3 px-4 py-6 text-lg font-medium ${
                  isActive
                    ? "text-white  bg-opacity-20"
                    : "text-gray-400"
                } rounded-lg`
              }
            >
              <Settings size={20} />
              <span>Settings</span>
            </NavLink>
          </nav>

          {/* Log Out - always bottom */}
          <div className="mt-auto">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="flex w-full items-center justify-start space-x-3 px-4 py-3 text-sm font-medium text-red-400"
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile Topbar */}
        <header className="flex items-center text-white justify-between bg-[#4B1E2F] px-4 py-3 shadow-md lg:hidden">
          <Button
            variant="ghost"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          <h1 className="text-lg  font-semibold text-white">Dashboard</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
