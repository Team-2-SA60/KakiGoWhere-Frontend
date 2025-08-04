import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import Layout from '../components/AdminLayout';

const AdminDashboard = () => {
    return (
        <Layout>
            <h1 className="text-2xl font-bold">Dashboard Page</h1>
            <p>Welcome to the admin dashboard.</p>
        </Layout>
    )
}

export default AdminDashboard;