'use client'

import {TextField, styled, InputAdornment, IconButton} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useContext, useState} from "react";
import {useRouter} from "next/navigation";
import {AuthContext} from "../../../utils/auth-context";
import axios from "axios";


const TextInput = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        background: "rgb(232, 241, 250)",
        borderRadius: '10px',
        '& fieldset': {
            borderColor: '#7692B8',
            borderWidth: '4px'
        },
        '&:hover fieldset': {
            borderWidth: '4px',
            borderColor: '#7692B8',
        },
        '&.Mui-focused fieldset': {
            borderWidth: '4px',
            borderColor: '#7692B8',
        },
    },
})

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === "" || password === "") {
            alert("Email dan Password tidak boleh kosong");
            return;
        }

        const user = {
            "email": email,
            "password": password,
        }

        handleLogin(user);
    };

    const handleLogin = async (user) => {
        try {
            const res = await axios.post('https://pemin.aenzt.tech/api/v1/auth/login', user, {
                validateStatus: false,
            });

            if (res.status !== 201) {
                alert(res.data.message);
                return;
            }

            localStorage.setItem('token', JSON.stringify(res.data.data.access_token));
            localStorage.setItem('id', JSON.stringify(res.data.data.id));
            router.push('/dashboard');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen bg-[#10151D]">
            <nav className="flex justify-center pt-5">
                <div className="flex items-center">
                    <h1 className="text-5xl text-yellow-400">
                        si
                        <span className="text-gray-100">.itam</span>
                    </h1>
                    <div className="border-l-2 border-l-gray-100 h-full ml-2 pl-2 flex items-center">
                        <p className="text-yellow-400 text-2xl mt-1 w-36 leading-4">Sistem Informasi
                            Pertambangan.</p>
                    </div>
                </div>
            </nav>
            <div className="text-gray-300 flex justify-center">
                <div className="mt-14 w-1/2 rounded-[3rem] bg-[#161E29] py-5 px-10">
                    <p className="text-3xl">Email</p>
                    <TextInput type="text" color="secondary" id="email" className="w-full"
                               placeholder="" sx={{borderRadius: '10px', input: { color: 'black' }}}
                               value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <p className="text-3xl mt-5">Password</p>
                    <TextInput type={showPassword ? "text" : "password"} color="secondary" id="password" className="w-full"
                               placeholder="" sx={{borderRadius: '10px', input: { color: 'black' }}}
                               value={password} onChange={(e) => setPassword(e.target.value)}

                               InputProps={{
                                   endAdornment: (
                                       <InputAdornment position='end'>
                                           <IconButton onClick={() => setShowPassword(!showPassword)}>
                                               {
                                                   showPassword ? <VisibilityOffIcon sx={{fontSize: 30}}/>
                                                       :  <VisibilityIcon sx={{fontSize: 30}}/>
                                               }
                                           </IconButton>
                                       </InputAdornment>
                                   )
                               }}
                                />
                    <p className="text-3xl hover:cursor-pointer hover:underline mt-5 text-yellow-400 text-end">Forgot password?</p>
                    <button onClick={ handleSubmit } className="mt-10 hover:bg-yellow-400 hover:text-white border-2
                    w-full border-yellow-400 text-3xl px-7 py-1 mb-5 rounded-[2rem]">
                        Login</button>
                </div>
            </div>
        </div>
    )
}