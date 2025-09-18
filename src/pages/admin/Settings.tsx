/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useUpdateProfileMutation,
  useUserPersonalInfoQuery,
} from "@/redux/features/info/info.api";
import { toast } from "sonner";
import {  X, Eye, EyeOff } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { authApi, useChangePasswordMutation, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { useNavigate } from "react-router";

interface PasswordFormValues {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { data } = useUserPersonalInfoQuery("", {
    refetchOnMountOrArgChange: true,
  });
  const personalInfo = data?.data?.info;
  const [changePassword]=useChangePasswordMutation()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
    phone: "",
    dateOfBirth: "",
    gender: "",
  });

  const [updateProfile] = useUpdateProfileMutation();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // Initialize data
  useEffect(() => {
    if (personalInfo && data?.data) {
      setFormData({
        firstName: personalInfo.firstName || "",
        lastName: personalInfo.lastName || "",
        phone: data.data.phone || "",
        dateOfBirth: personalInfo.dateOfBirth || "",
        gender: personalInfo.gender || "",
        contact: {
          address: personalInfo.contact?.address || "",
          city: personalInfo.contact?.city || "",
          state: personalInfo.contact?.state || "",
          zipCode: personalInfo.contact?.zipCode || "",
        },
      });
    }
  }, [personalInfo, data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // For contact fields
    if (["address", "city", "state", "zipCode"].includes(name)) {
      setFormData({
        ...formData,
        contact: { ...formData.contact, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await updateProfile(formData).unwrap();
      if (res.success) {
        toast.success("Profile Updated successfully");
        setIsEditing(false);
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // React Hook Form for password
  const form = useForm<PasswordFormValues>({
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<PasswordFormValues> =async (values) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const info = {
          oldPassword: values.oldPassword,
          newPassword: values.password,
        };
        try {
          console.log(info);
          const res = await changePassword(info).unwrap();
          if (res.success === true) {
            toast.success("Password change successfully! Please Login again");
            await logout("").unwrap();
            dispatch(authApi.util.resetApiState());
            navigate("/login");
          }
        } catch (err) {
          toast.error((err as any).message);
        }

    closeModal();
  };

  return (
    <div>
      <h2 className="text-4xl font-medium my-5">Settings</h2>

      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-200 p-2 rounded gap-2">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Personal Information
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="ghost" className="text-sm" onClick={openModal}>
            Change Password
          </Button>

          <Button
            variant="ghost"
            className="text-sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Update profile"}
          </Button>
        </div>
      </CardHeader>

      {/* Password Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6">
            <button
              className="md:text-white absolute top-4 right-4 md:-top-8 md:-right-12  "
              onClick={closeModal}
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold mb-4">Change Password</h2>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Old Password */}
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your old password"
                  className=" pr-10"
                  {...form.register("oldPassword", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* New Password */}
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="pr-10"
                  {...form.register("password", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="pr-10"
                  {...form.register("confirmPassword", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <Button
              
                type="submit"
                className="w-1/3 mx-auto bg-[#4B1E2F] hover:bg-[#3a1725] text-white"
              >
                Save Changes 
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Profile Form */}
      <CardContent className="space-y-6 p-6">
        {/* Name */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700">
              First Name
            </label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Last Name
            </label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <Input name="email" defaultValue={data?.data?.email} readOnly />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <Input
              name="phone"
              type="number"
              value={formData.phone}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
        </div>

        {/* Date of Birth + Gender */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <Input
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Gender</label>
            <Input
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Street Address
          </label>
          <Input
            name="address"
            value={formData.contact.address}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <label className="text-sm font-medium text-gray-700">City</label>
            <Input
              name="city"
              value={formData.contact.city}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">State</label>
            <Input
              name="state"
              value={formData.contact.state}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              ZIP Code
            </label>
            <Input
              name="zipCode"
              value={formData.contact.zipCode}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-center mt-8">
            <Button
              className="bg-[#4B1E2F] text-white cursor-pointer"
              onClick={handleSubmit}
            >
              Update Now
            </Button>
          </div>
        )}
      </CardContent>
    </div>
  );
};

export default Settings;
