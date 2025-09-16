import { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "../../assets/image/logo.png";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link, useNavigate } from "react-router";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const { data } = useUserInfoQuery("");
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    await logout("").unwrap();
    dispatch(authApi.util.resetApiState());
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className="border-b px-4 md:px-6 shadow">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side (mobile: menu + logo) */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                {/* Hamburger icon */}
                <svg
                  className="pointer-events-none"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 6H20" />
                  <path d="M4 12H20" />
                  <path d="M4 18H20" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-40 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-1">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink className="block px-2 py-1.5 rounded-md hover:bg-muted">
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Logo */}
          <img
            src={logo}
            alt=""
            className="text-primary hover:text-primary/90 font-bold"
          />
        </div>

        {/* Middle: Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-6">
              {navigationLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    asChild
                    href={link.href}
                    className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                  >
                    <Link to={link.href}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side */}
        <div className="flex items-center relative ">
          {data?.data?.email ? (
            <>
              {/* Profile icon */}
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {data.data.email.charAt(0).toUpperCase()}
              </Button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-36 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 animate-slide-down">
                  <div className="flex flex-col py-2">
                    <Button
                      variant="ghost"
                      className="px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                      onClick={() => {
                        navigate("/dashboard");
                        setDropdownOpen(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h18v18H3V3z"
                        />
                      </svg>
                      Dashboard
                    </Button>
                    <Button
                      variant="ghost"
                      className="px-4 py-2 text-left hover:bg-red-100 flex items-center gap-2 text-red-600"
                      onClick={handleLogout}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7"
                        />
                      </svg>
                      Logout
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Button asChild size="lg" className="text-sm ml-3 bg-[#4B1E2F]">
              <Link to="/sign-up">Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
