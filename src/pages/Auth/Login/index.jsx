import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../redux/slices/authSLice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "test@gmail.com",
    password: "testAdmin",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill out both fields.");
      return;
    }

    // Simulated login validation
    if (
      formData.email !== "test@gmail.com" ||
      formData.password !== "testAdmin"
    ) {
      setError("Invalid Email or Password");
      return;
    }

    setIsLoading(true);
    dispatch(setAuth(true)); // Redux state update karega

    setTimeout(() => {
      setError("");
      setIsLoading(false);
      navigate("/home"); // Redirect to home page
    }, 500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white w-full p-8 rounded-xl shadow-lg max-w-md relative m-4">
        <h2 className="text-2xl font-semibold text-center text-orange-700 mb-4">
          Welcome Back!
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-orange-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="relative">
            <label className="text-sm text-orange-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-500"
            />
            <span
              className="absolute right-4 top-10 cursor-pointer text-orange-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 text-white bg-orange-600 hover:bg-orange-700 rounded-md transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Sign In"}
          </button>
        </form>
        <p className="text-center text-sm text-orange-600 mt-4 cursor-pointer">
          Forgot My Password
        </p>
      </div>
    </div>
  );
};

export default Login;
