import { Button } from "@mui/material"
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/admin/login");
    }

    return (
        <div className="w-screen">
            <Sidebar content={<Button 
                variant="contained" 
                color="primary" 
                onClick={handleLogout}>Logout</Button>}/>
        </div>
    )
}

export default AdminDashboard;