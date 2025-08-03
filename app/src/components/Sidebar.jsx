import { useState } from "react";
import EqualizerIcon from '@mui/icons-material/Equalizer';

const Sidebar = ({ content }) => {
  const [open, setOpen] = useState(true);

  const navItems = [
    { label: "Dashboard", icon: <EqualizerIcon /> },
    { label: "Users", icon: "👥" },
    { label: "Settings", icon: "⚙️" },
    { label: "Logout", icon: "🚪" },
  ];

  return (
    <div className="flex h-screen">
        {/* Sidebar */}
        <div
            className={`${
            open ? "w-64" : "w-16"
            } bg-gray-800 text-white transition-all duration-300 p-4`}
        >
            <button
                onClick={() => setOpen(!open)}
                className="mb-6 text-xl"
            >
            {open ? "◀" : "▶"}
            </button>
            <ul className="space-y-4">
                {navItems.map((item) => (
                    <li key={item.label} className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
                    <span className="text-xl">{item.icon}</span>
                    {open && <span>{item.label}</span>}
                    </li>
                ))}
            </ul>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-8">
            <h1 className="text-2xl font-bold">Hello from Main Content</h1>
            {content}
        </div>
    </div>
  );
};

export default Sidebar;
