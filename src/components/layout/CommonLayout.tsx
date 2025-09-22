import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface IProps {
  children: ReactNode;
}
const CommonLayout = ({ children }: IProps) => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-screen container mx-auto">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default CommonLayout;
