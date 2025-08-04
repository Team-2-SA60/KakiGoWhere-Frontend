import { Alert, Button, Input } from "@material-tailwind/react"
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// Can use this component for tourist login as well
const LoginForm = (props) => {
    const {handleLogin, setEmail, setPassword, loading, errMsg} = props;
    const [showPassword, setShowPassword] = useState(false);

    const handleClickPassword = () => setShowPassword((show) => !show);

    return (
        <form onSubmit={handleLogin}>
            <div className="w-[350px] sm:w-[400px] grid grid-cols-12 p-6 place-self-center bg-gray-50 border border-gray-300 rounded-md shadow-xl gap-4">
                {/* Login text label */}
                <div className="col-span-12">
                    <span className="w-full items-start font-bold text-lg">Login</span>
                </div>
                
                {/* Email text input */}
                <div className="col-span-12">
                    <Input className="col-span-12" type="text" label="Email" required onChange={e => setEmail(e.target.value)}/>
                </div>

                {/* Password text input */}
                <div className="relative col-span-12">
                    <Input className="w-full" type={showPassword ? "text" : "password"} label="Password" required onChange={e => setPassword(e.target.value)}/>
                    <button className="absolute right-3 top-0 bottom-0" type="button" onClick={handleClickPassword}>
                        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                </div>
                
                {/* Alert if email or password if wrong */}
                <div className={`col-span-12 transition-all duration-100 ${errMsg ? "" : "hidden"}`}>
                    <Alert className="p-2 shadow-md" open={errMsg != null} variant="ghost" color="red">
                        {errMsg}
                    </Alert>
                </div>

                {/* Button to submit! */}
                <div className="col-span-12 items-center">
                    <Button loading={loading} className="w-full text-md place-content-center" color="light-blue" type="submit">LOGIN</Button>
                </div>
            </div>
        </form>
    )
}

export default LoginForm;