
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { loginSuccess } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Register = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [eye, seteye] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const API = import.meta.env.VITE_API_URL;
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const submit = async (data) => {
        if (isLogin) {
            try {
                const login = async () => {
                    const user = await axios.post(`${API}auth/login`, {
                        email: data.email,
                        password: data.password
                    });
                    toast.success("Login Successfull");
                    dispatch(loginSuccess({
                        user: user.email,
                        token: user.data.token
                    }));
                    localStorage.setItem("token", user.data.token);
                }
                await login();
                navigate("/");
            }
            catch (er) {
                toast.error("Error");
            }
        }
        else {
            try {
                console.log(API)
                const user = await axios.post(`${API}auth/register`, {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                });
                toast.success("Register Successfull");
                dispatch(loginSuccess({
                    token: user.data.token
                }));
                localStorage.setItem("token", user.data.token);
                navigate("/");
            } catch (er) {
                toast.error(er.response.data.message)
                // alert(er.response.data.message);
            }

        }
    }

    return (
        <div className='h-[calc(100vh-80px)] w-screen bg-slate-50 flex items-center justify-center font-sans'>
            <form action="" onSubmit={handleSubmit(submit)}>
                <div className='bg-white h-[550px] w-[400px] rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 flex flex-col p-8'>

                    <h2 className='text-3xl font-extrabold text-slate-800 mb-6'>
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <div className='relative flex bg-slate-100 p-1 rounded-xl mb-8 cursor-pointer select-none'>
                        <div
                            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#ff6467] rounded-lg shadow-md transition-all duration-300 ease-out ${isLogin ? 'left-1' : 'left-[calc(50%+2px)]'}`}
                        />
                        <div
                            className={`z-10 w-1/2 py-2.5 text-sm font-semibold text-center transition-colors duration-200 ${isLogin ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </div>
                        <div
                            className={`z-10 w-1/2 py-2.5 text-sm font-semibold text-center transition-colors duration-200 ${!isLogin ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                            onClick={() => setIsLogin(false)}
                        >
                            Register
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {!isLogin && (
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Name</label>
                                <input {...register('name', { 'required': { 'value': true, 'message': 'required' } })} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-[#ff6467] transition-colors" autoComplete="username" placeholder="Raju" />
                            </div>
                        )}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</label>
                            <input {...register('email', { 'required': { 'value': true, 'message': 'required' } })} type='text' className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-[#ff6467] transition-colors" autoComplete="username" placeholder="hello@example.com" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
                            <div className='relative'>
                                <input {...register('password', { 'required': { 'value': true, 'message': 'required' } })} type={`${eye ? "text" : "password"}`} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-[#ff6467] transition-colors" placeholder="••••••••" autoComplete="current-password" />
                                {!eye && <i className="ri-eye-close-line absolute right-4 top-4" onClick={() => seteye(true)} ></i>}
                                {eye && <i className="ri-eye-line absolute right-4 top-4" onClick={() => seteye(false)}></i>}
                            </div>
                        </div>
                        <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg mt-4 hover:bg-slate-800 transition-all active:scale-[0.98] cursor-pointer scale-94">
                            {isLogin ? 'Sign In' : 'Register Now'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;