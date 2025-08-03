import { Alert, Button, Collapse, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";

// Can use this component for tourist login as well
const LoginForm = ({handleLogin, setEmail, setPassword, isLoading, errMsg}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickPassword = () => setShowPassword((show) => !show);

    return (
        <form onSubmit={handleLogin}>
            <div className="w-[350px] sm:w-[400px] grid grid-cols-12 p-6 place-self-center bg-gray-50 border border-gray-300 rounded-md shadow-xl gap-4">

                {/* Email text input */}
                <TextField
                    required
                    className="col-span-12"
                    label="Email"
                    type="email"
                    size="small"
                    onChange={e => setEmail(e.target.value)}
                />

                {/* Password text input */}
                <FormControl className="col-span-12" variant="outlined" size='small' required>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={e => setPassword(e.target.value)}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                    }
                    label="Password"
                />
                </FormControl>
                
                {/* Alert if email or password if wrong */}
                <Collapse in={!!errMsg} className="col-span-12">
                    <Alert className='col-span-12 transition-all' severity="error">{errMsg}</Alert>
                </Collapse>

                {/* Button to submit! */}
                <Button 
                    loading={isLoading}
                    className="col-span-12" 
                    variant="contained" 
                    color="primary"
                    type="submit">
                    Login
                </Button>
            </div>
        </form>
    )
}

export default LoginForm;