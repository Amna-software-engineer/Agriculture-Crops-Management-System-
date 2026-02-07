import { useState } from "react";
import { Mail, Lock, ArrowRight, Loader2, Leaf } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../api/auth.api";
import { useDispatch } from "react-redux";
import { setAuth } from "../features/auth.slice";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { login, loading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await login(formData);
        
        if (data) {
            dispatch(setAuth(data.user));

            if (data.user.role === "client") {
                navigate("/dashboard/client");
            }
            if (data.user.role === "former") {
                navigate("/dashboard/former");
            }
            if (data.user.role === "broker") {
                navigate("/dashboard/broker");
            }
            if (data.user.role === "admin") {
                navigate("/dashboard/admin");
            }
            
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
                <div className="mb-10 text-center">
                    <div className="inline-flex bg-emerald-500 p-2 rounded-xl mb-4">
                        <Leaf className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Welcome Back
                    </h3>
                    <p className="text-gray-500">
                        Enter your credentials to access your dashboard
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="name@example.com"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <a
                                href="#"
                                className="text-xs text-emerald-600 font-bold hover:underline"
                            >
                                Forgot?
                            </a>
                        </div>
                        <div className="relative">
                            <Lock
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 group"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                Sign In
                                <ArrowRight
                                    size={18}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </>
                        )}
                    </button>
                    <Link to={"/register"}>Does'nt have any account</Link>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
