import { Card, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { FaChartSimple } from "react-icons/fa6";
import {FaRegCalendar, FaRegMap} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logout();
        navigate("/admin/login");
    }

    const sideBarItems = [
        {
            label: "Dashboard",
            icon: <FaChartSimple />,
            path: "/admin/dashboard"
        },
        {
            label: "Manage Places",
            icon: <FaRegMap />,
            path: "/admin/places"
        },
        {
            label: "Events",
            icon: <FaRegCalendar />,
            path: "/admin/events"
        }
    ];

    const ListItems = () => {
        return sideBarItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
                <Link to={item.path} key={item.label}>
                    <ListItem
                        className={`place-content-end mb-4 font-semibold text-brown-900 transition-all duration-300 hover:bg-gray-400
                        ${isActive ? "bg-gradient-to-r from-teal-700 to-cyan-700 text-white" : ""}`}
                    >
                        <span className="mr-2">{item.label}</span>
                        <ListItemPrefix>{item.icon}</ListItemPrefix>
                    </ListItem>
                </Link>
            );
        });
    };

    return (
        <Card className="h-screen w-full max-w-[15rem] absolute left-0 p-1 shadow-xl rounded-none bg-cyan-100 shadow-blue-gray-900/5">
            <div className="mb-4 p-4 place-items-end">
                <img src="/logo_kaki.png" className="w-3/4" alt="KakiGoWhere" />
            </div>
            <ListItems />
            <div className="absolute bottom-10 right-1">
                <ListItem className="transition-all duration-300 hover:bg-gray-300" onClick={handleLogout}>
                    Logout
                    <ListItemPrefix className="ml-2"><MdLogout /></ListItemPrefix>
                </ListItem>
            </div>
        </Card>
    )
};

export default Sidebar;
