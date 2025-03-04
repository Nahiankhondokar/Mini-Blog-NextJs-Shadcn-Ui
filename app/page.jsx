"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Home = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const route = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        formData,
        { "X-Requested-With": "XMLHttpRequest" }
      );

      localStorage.setItem(
        "authToken",
        JSON.stringify(response.data.data.token)
      );
      route.push("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message);
    }

    setLoading(false);
  };

  return (
    <main className="post-create-area">
      <form
        className="max-w-sm mx-auto bg-sky-200 p-2 my-5 rounded"
        onSubmit={handleSubmit}
      >
        <div className="title-area text-center font-bold font-lg">
          <h4>Login</h4>
          <div className="w-full border-1 border-sky-700 my-5"></div>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="mb-5">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-5">
          <label>Password</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="flex items-center w-full">
          <button
            type="submit"
            disabled={loading}
            className="text-white bg-sky-700 m-auto w-20 font-bold hover:bg-sky-500 py-2 rounded"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default Home;
