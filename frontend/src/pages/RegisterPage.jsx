import { useState } from "react";
import {
    Leaf,
    Mail,
    Lock,
    User,
    ArrowRight,
    UserCircle,
    Briefcase,
    ShoppingBag,
    Loader2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../api/auth.api";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "client",
    });

    const { register, loading } = useRegister();
    const navigate = useNavigate();

    const roles = [
        { id: "client", icon: <ShoppingBag size={18} />, desc: "Buy fresh crops", },
        { id: "farmer", icon: <Leaf size={18} />, desc: "Sell your harvest" },
        { id: "broker", icon: <Briefcase size={18} />, desc: "Manage trades" },
        { id: "admin", icon: <UserCircle size={18} />, desc: "System control" },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await register(formData);
        if (data.success) {
            navigate("/login");
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
                <div className="mb-8 text-center">
                    <div className="inline-flex bg-emerald-500 p-2 rounded-xl mb-4">
                        <Leaf className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Create Account
                    </h3>
                    <p className="text-gray-500">
                        Fill in the details to join our community
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 ml-1">
                            Full Name
                        </label>
                        <div className="relative">
                            <User
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Amna Haq"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
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

                    {/* Password */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 ml-1">
                            Password
                        </label>
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

                    {/* Role Selection */}
                    <div className="space-y-3 pt-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">
                            Select Your Role
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {roles.map((role) => (
                                <button
                                    key={role.id}
                                    type="button"
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            role: role.id,
                                        })
                                    }
                                    className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all text-left ${
                                        formData.role === role.id
                                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                            : "border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200"
                                    }`}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        {role.icon}
                                        <span className="font-bold text-sm">
                                            {role.id}
                                        </span>
                                    </div>
                                    <span className="text-[10px] opacity-70">
                                        {role.desc}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 group"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                Create Account
                                <ArrowRight
                                    size={18}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </>
                        )}
                    </button>
                    <Link
                        className="text-blue-500 hover:text-blue-700"
                        to={"/login"}
                    >
                        Already have an account
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
