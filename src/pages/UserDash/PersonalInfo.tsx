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

const PersonalInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data } = useUserPersonalInfoQuery("", {
    refetchOnMountOrArgChange: true,
  });
  const personalInfo = data?.data?.info;

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

  // initial data set করা হচ্ছে
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

  // handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {

      const res = await updateProfile(formData).unwrap();
      if (res.success === true) {
        toast.success("Profile Updated successfully");
        setIsEditing(false);
      }
    } catch (err) {
      toast.error((err as any).message);
    }
  };

  return (
    <div>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Personal Information
        </CardTitle>
        <Button
          variant="ghost"
          className="text-sm cursor-pointer"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Update profile"}
        </Button>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        {/* নাম */}
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

        {/* ইমেইল + ফোন */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <Input
              name="email"
              defaultValue={data?.data?.email}
              onChange={handleChange}
              readOnly
            />
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

        {/* জন্ম তারিখ + জেন্ডার */}
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

        {/* ঠিকানা */}
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

export default PersonalInfo;
