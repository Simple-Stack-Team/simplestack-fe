"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { CiMenuBurger } from "react-icons/ci";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMenuItems, setShowMenuItems] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClick = () => {
    if (!isMobile) {
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 780; // Adjust the width as needed
      setIsMobile(newIsMobile);
    };

    // Initial check on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sidebarStyle = isMobile ? "ml-[0] w-[100%]" : "ml-[250px]";

  return (
    <div className="relative flex bg-[#fafafa]">
      <div className="relative flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`${sidebarStyle}`}>
          {/* Navbar */}
          <div className={`${isMobile ? "flex justify-between" : ""}`}>
            {isMobile && (
              <CiMenuBurger
                className=":hidden h-6 w-6 cursor-pointer "
                onClick={toggleSidebar}
              />
            )}
          </div>
          {/* Content */}
          <div
            className={`relative z-10 min-h-screen rounded-xl border-2 border-[#eee] bg-white p-4 ${
              isSidebarOpen ? "ml-0" : "m-2"
            } transition-all duration-300 ease-in-out`}
            style={{
              position: isSidebarOpen && isMobile ? "absolute" : "relative",
              left: isSidebarOpen && isMobile ? "100%" : "0",
            }}
          >
            {/* Pass the handleClick function to Sidebar */}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
