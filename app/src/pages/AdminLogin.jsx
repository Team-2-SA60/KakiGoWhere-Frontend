import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';

const AdminLogin = () => {
    const { loginAdmin, admin, checkAdmin } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(null);

    useEffect(() => {
        if (!admin) {
            checkAdmin();
        } else {
            navigate('/admin/dashboard');
        }
        // eslint-disable-next-line
    }, [admin])

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrMsg(null);
        try {
            await loginAdmin(email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            let errorMessage;
            if (err.response) {
                // status code >= 400
                errorMessage = err.response.data || `Error ${err.response.status}`;
            } else if (err.request) {
                // no response from server
                errorMessage = "No response from server";
            } else {
                // others
                errorMessage = err.message;
            }
            setErrMsg(errorMessage);
            console.log("Login error:", errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="grid grid-cols-1 w-full gap-4 p-4">
            <div className="place-content-center">
                <img className="w-[300px] md:w-[400px] mx-auto" src="/logo_kaki.png" alt="Logo" />
            </div>

            <div className="text-center">
                <span className="text-md md:text-lg font-bold">Administrative Portal</span>
            </div>
            <LoginForm handleLogin={handleLogin} setEmail={setEmail} setPassword={setPassword} loading={loading} errMsg={errMsg} />
        </div>
    )
}

export default AdminLogin;