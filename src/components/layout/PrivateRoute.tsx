import { Navigate } from "react-router";
import { ReactNode } from "react";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

type TProtectedRoute = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: TProtectedRoute) => {
  const { data, isLoading, error } = useUserInfoQuery(undefined);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Debugging log (optional)
  console.log("User Info:", data);

  // যদি লগইন না থাকে বা success false হয়
  if (error || !data?.success || !data?.data) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
