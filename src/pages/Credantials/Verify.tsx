/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router";
import { useOtpVerifyMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

export function Verify() {
  const location = useLocation();
  const [email] = useState(location.state);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { handleSubmit } = useForm();
  const navigate = useNavigate();
  const [otpVerify] = useOtpVerifyMutation();

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email]);

  // OTP change handler
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return; // only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus(); // next box auto focus
    }
  };

  // Backspace handle
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = async () => {
    const finalOtp = otp.join("");
    const otpInfo = {
      email: email,
      otp: finalOtp,
    };
    if (finalOtp.length === 6) {
      const result = await otpVerify(otpInfo).unwrap();
      if (result.success === true) {
        toast.success("OTP Verified Successfully");
      }
      navigate("/setPass", {state:email})
    } else {
      toast.error("Enter Valid OTP ");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-gray-800">
            Reset password
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <label className="text-gray-700 font-medium">Enter OTP</label>
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 border-2 rounded-md text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#4B1E2F]"
                />
              ))}
            </div>

            <Button
              type="submit"
              className="cursor-pointer w-full bg-[#4B1E2F] hover:bg-[#3a1725]"
            >
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
