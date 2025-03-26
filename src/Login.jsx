import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "antd";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // For navigation

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Login Attempted");

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // Fake authentication (Replace with API call)
    if (email === "admin@example.com" && password === "123456") {
      console.log("Login Successful");

      localStorage.setItem("token", "fake-jwt-token"); // Store token in localStorage
      console.log("Token stored in localStorage");

      navigate("/dashboard"); // Redirect to Dashboard
      console.log("Redirecting to Dashboard...");
    } else {
      alert("Invalid email or password!");
      console.log("Login Failed");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-gray-900 text-white flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <img src="./src/assets/owambe logo.png" alt="Login Background" className="w-100 h-100" />
          <h1 className="text-4xl font-bold text-orange-500">OWAMBE-EVENTS</h1>
          <p className="mt-2 text-gray-300">
            Where Every Celebration Becomes Unforgettable
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-gray-100 p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 w-96">
          <h2 className="text-xl font-semibold text-center mb-4">Login to your account</h2>

          <form onSubmit={handleLogin}>
            <label className="block text-gray-700 font-medium">Email</label>
            <Input
              className="mb-3"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="block text-gray-700 font-medium">Password</label>
            <Input.Password
              className="mb-3"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="primary" htmlType="submit" className="w-full bg-black hover:bg-gray-800">
              Login
            </Button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Don't have an account? <a href="/register" className="text-blue-500">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;