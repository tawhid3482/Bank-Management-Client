import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import { ForgetPass } from "@/pages/Credantials/ForgetPass";
import { Login } from "@/pages/Credantials/Login";
import SetPassword from "@/pages/Credantials/SetPassword";
import Settings from "@/pages/admin/Settings";
import SignUp from "@/pages/Credantials/SignUp";
import { Verify } from "@/pages/Credantials/Verify";
import { createBrowserRouter } from "react-router";
import Home from "@/components/layout/Home/Home";
import { Profile } from "@/pages/Profile/Profile";
import UserProfile from "@/pages/Profile/UserProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "create-profile",
        Component: Profile,
      },
      {
        path: "profile",
        Component: UserProfile,
      },
      {
        path: "about",
        Component: About,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "settings",
        Component: Settings,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/sign-up",
    Component: SignUp,
  },
  {
    path: "/forgot-password",
    Component: ForgetPass,
  },
  {
    path: "/verify",
    Component: Verify,
  },
  {
    path: "/setPass",
    Component: SetPassword,
  },
]);
