import { useState } from "react";
import { Drawer, IconButton } from "@material-tailwind/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiXMark } from "react-icons/hi2";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar for desktop */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-[15rem] z-10">
        <Sidebar />
      </div>

      {/* Drawer for mobile */}
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} className="w-[12rem] md:hidden">
        <Sidebar />
      </Drawer>

      {/* Main Content Area */}
      <div className="flex-1 ml-0 md:ml-[12rem] h-full overflow-auto relative">
        {/* Top bar - hidden for desktop */}
        <div className="absolute top-4 left-3 md:hidden p-2 z-20">
          <IconButton variant="text" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
            {isDrawerOpen ? <HiXMark className="w-8 h-8" /> : <GiHamburgerMenu className="w-8 h-8" />}
          </IconButton>
        </div>

        {/* Content */}
        <div className="p-4 h-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
