import { Button } from '@material-tailwind/react';
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
        <div className="w-screen">
            <Button onClick={handleLogout}/>
        </div>
    )
}

export default AdminDashboard;