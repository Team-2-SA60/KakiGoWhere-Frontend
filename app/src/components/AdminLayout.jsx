import { useState } from "react";
import { Drawer, IconButton } from "@material-tailwind/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiXMark } from "react-icons/hi2";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="h-screen w-screen flex">
      {/* Sidebar for desktop */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-[15rem] z-10">
        <Sidebar />
      </div>

      {/* Drawer for mobile */}
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} className="w-[12rem] md:hidden">
        <Sidebar />
      </Drawer>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 md:ml-[15rem] w-full h-full overflow-auto relative place-items-center">
        {/* Top bar - hidden for desktop */}
        <div className="absolute top-10 left-[1rem] md:hidden z-20">
          <IconButton variant="text" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
            {isDrawerOpen ? <HiXMark className="w-8 h-8" /> : <GiHamburgerMenu className="w-8 h-8" />}
          </IconButton>
        </div>

        {/* Content */}
        <div className="p-4 h-full w-full max-w-[1200px] place-items-center">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
