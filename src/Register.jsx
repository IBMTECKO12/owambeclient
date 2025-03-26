import { useState } from "react";
import { Input, Button, Checkbox, Form } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    preferences: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (checkedValues) => {
    setFormData({ ...formData, preferences: checkedValues });
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.phone) {
      alert("All fields are required!");
      return;
    }

    console.log("User Registered:", formData);
    localStorage.setItem("user", JSON.stringify(formData)); // Store user data (mock)
    alert("Registration successful! Redirecting to login...");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Full Name">
            <Input name="fullName" placeholder="Enter your full name" onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Email">
            <Input name="email" type="email" placeholder="Enter your email" onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Password">
            <Input.Password name="password" placeholder="Enter your password" onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Phone Number">
            <Input name="phone" placeholder="Enter your phone number" onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Event Preferences">
            <Checkbox.Group
              options={["Weddings", "Tech Events", "Concerts", "Meetups"]}
              onChange={handleCheckboxChange}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full bg-blue-500 hover:bg-blue-700">
            Register
          </Button>
        </Form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;