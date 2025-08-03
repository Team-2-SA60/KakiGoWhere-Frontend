import Button from '@mui/material/Button'
import { useState } from 'react';

const AdminLogin = () => {

    const [ isLoading, setLoading ] = useState(false);

    function handleLogin(e) {
        setLoading(true);
    }

    return (
            <>
                <div className="grid grid-cols-1 w-full gap-4 p-4">
                    <div className="place-content-center">
                        <img className="w-[300px] md:w-[400px] mx-auto" src="/logo_kaki.png" alt="Logo" />
                    </div>

                    <div className="text-center">
                        <span className="text-md md:text-lg font-bold">Administrative Portal</span>
                    </div>

                    <div className="grid grid-cols-12 p-4 place-self-center border border-gray-300 rounded-md shadow-xl gap-5">
                        <label className="col-span-4 font-bold text-right content-center">Email</label>
                        <input
                            type="text"
                            className="col-span-8 border border-gray-300 rounded px-2 py-1"
                            placeholder="Enter email"
                        />
                        <label className="col-span-4 font-bold text-right content-center">Password</label>
                        <input
                            type="text"
                            className="col-span-8 border border-gray-300 rounded px-2 py-1"
                            placeholder="Enter password"
                        />
                        <Button 
                            loading={isLoading}
                            className="col-span-12" 
                            variant="contained" 
                            color="primary"
                            onClick={e => handleLogin()}
                            >Login</Button>
                    </div>
                </div>
            </>
    )
}

export default AdminLogin;