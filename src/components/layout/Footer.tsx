import { CiLocationOn } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#4B1E2F] text-white mt-1">
      <div className="mx-auto max-w-screen-xl px-6 pt-12 pb-6 lg:pt-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left: Logo + Text */}
          <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              {/* Logo */}
              <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              Empowering financial decisions through transparent credit scoring{" "}
              <br />
              and connecting borrowers with trusted lenders.
            </p>
          </div>

          <div className="grid grid-cols-2">
            {/* Middle: Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-medium">Quick Links</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href="/" className="hover:text-gray-300 transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-gray-300 transition">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Right: Contact Us */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-medium">Contact Us</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <p className="flex gap-2 items-center ">
                    {" "}
                    <span className="text-xl">
                      <CiLocationOn />
                    </span>{" "}
                    123 Finance Street Douala, <br /> Cameroon
                  </p>
                </li>
                <li>
                  <a
                    href="tel:+237123456789"
                    className="hover:text-gray-300 transition flex gap-2 items-center"
                  >
                    <span className="text-xl">
                      <FaPhoneAlt />
                    </span>{" "}
                    +237 123 456 789
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@creditmatch.com"
                    className="hover:text-gray-300 transition flex gap-2 items-center"
                  >
                    <span className="text-xl">
                      <MdEmail />
                    </span>{" "}
                    info@creditmatch.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-500/30 pt-4 flex flex-col md:flex-row items-center justify-between text-sm">
          <p>© 2025 GUEHI AND CO. All rights reserved.</p>
          <div className="space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-gray-300 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
