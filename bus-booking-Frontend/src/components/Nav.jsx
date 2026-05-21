import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Nav = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const token = useSelector((state) => state.auth.token);

    const isAuthPage = location.pathname === "/auth";

    function logout() {
        dispatch(loginSuccess({
            token: null
        }));
        localStorage.removeItem("token");
        navigate("/auth");
    }
    const [user, setuser] = useState(null);
    useEffect(() => {
        const getUserFromToken = () => {
            const token = localStorage.getItem("token");
            if (!token) return null;
            try {
                return jwtDecode(token);
            }
            catch {
                return null;
            }
        }
        const loggedUser = getUserFromToken();
        // console.log(loggedUser)
        setuser(loggedUser);
    }, [token])
    return (
        <nav className="w-full h-[72px] bg-white shadow-sm flex items-center justify-between px-10 border-b border-gray-200">

            <div className="flex items-center gap-10">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8SGlXH5FzRjSlV7skruWDm4TIjx8KX_kgag&s"
                    alt=""
                    className="w-20"
                />
            </div>

            {!token ? (
                <button
                    className="border-2 border-[#D84E55] text-[#D84E55] hover:bg-[#D84E55] hover:text-white px-6 py-1.5 rounded-lg font-bold transition-all duration-200 active:scale-95 cursor-pointer"
                    onClick={() => navigate(isAuthPage ? "/" : "/auth")}
                >
                    {isAuthPage ? "Home" : "Login"}
                </button>
            ) : (
                <div className="relative">

                    <div
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-2 cursor-pointer text-gray-700"
                    >
                        <i className="ri-user-3-line text-xl"></i>
                        <p className="font-medium">My Account</p>
                        <i className="ri-arrow-down-s-line"></i>
                    </div>

                    {open && (
                        <div className="absolute right-0 top-12 w-48 z-10 bg-white shadow-xl border border-gray-100 rounded-xl overflow-hidden">

                            {["admin", "superadmin"].includes(user?.role) && <div
                                className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                                onClick={() => {
                                    navigate("/admin");
                                    setOpen(false);
                                }}
                            >
                                <i className="ri-dashboard-line"></i>
                                <p>Admin</p>
                            </div>}
                            <div
                                className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                                onClick={() => {
                                    navigate("/");
                                    setOpen(false);
                                }}
                            >
                                <i className="ri-user-line"></i>
                                <p>Home</p>
                            </div>


                            <div
                                className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                                onClick={() => {
                                    navigate("/mybooking");
                                    setOpen(false);
                                }}
                            >
                                <i className="ri-ticket-2-line"></i>
                                <p>My Bookings</p>
                            </div>

                            <div
                                className="px-4 py-3 hover:bg-red-50 text-red-500 cursor-pointer flex items-center gap-3"
                                onClick={() => logout()}
                            >
                                <i className="ri-logout-box-r-line"></i>
                                <p>Logout</p>
                            </div>

                        </div>
                    )}

                </div>
            )}

        </nav>
    );
};

export default Nav;
