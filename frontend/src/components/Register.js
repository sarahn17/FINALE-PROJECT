// src/components/Register.js
import { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/patients";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    phone: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/register`, formData);
      setMessage(res.data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        phone: "",
      });
    } catch (err) {
      if (err.response) setMessage(err.response.data.message);
      else setMessage("Server error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          placeholder="Age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
