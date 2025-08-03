import { Button } from "@mui/material"
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/admin/login");
    }

    return (
        <>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleLogout}>Logout</Button>
        </>
    )
}

export default AdminDashboard;