"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const PostCreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    desciption: "",
    categories: [],
    image: null,
  });

  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle text input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle category selection (using a Set for better performance)
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => {
      const updatedCategories = new Set(prevState.categories);
      updatedCategories.has(value)
        ? updatedCategories.delete(value)
        : updatedCategories.add(value);

      return { ...prevState, categories: Array.from(updatedCategories) };
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);
      formDataObj.append("desciption", formData.desciption);
      formData.categories.forEach((cat) =>
        formDataObj.append("categories[]", cat)
      );
      if (formData.image) {
        formDataObj.append("image", formData.image);
      }

      const authToken = localStorage.getItem("authToken");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/post",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setSuccess("Post created successfully!");
      setFormData({ title: "", desciption: "", categories: [], image: null });
      route.push("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    }

    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.get("http://127.0.0.1:8000/api/categories", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <main className="post-create-area">
      <form
        className="max-w-sm mx-auto bg-sky-100 p-2 my-5"
        onSubmit={handleSubmit}
      >
        <div className="title-area text-center font-bold font-md">
          <h4>Create Post</h4>
          <div className="w-full border-1 border-gray-300 my-5"></div>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <div className="mb-5">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            placeholder="Enter title"
            required
          />
        </div>

        <div className="mb-5">
          <label>Description</label>
          <textarea
            name="desciption"
            value={formData.desciption}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            placeholder="Enter desciption"
            required
          />
        </div>

        <div className="mb-5">
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full mt-2 border-1 p-2"
          />
        </div>

        <label>Categories</label>
        {categories.length > 0 ? (
          categories.map((category) => (
            <div className="flex items-center mb-2" key={category.id}>
              <input
                id={`category-${category.id}`}
                type="checkbox"
                value={category.id}
                checked={formData.categories.includes(String(category.id))}
                onChange={handleCategoryChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
              />
              <label
                htmlFor={`category-${category.id}`}
                className="ml-2 text-sm text-gray-900"
              >
                {category.name}
              </label>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No categories available.</p>
        )}

        <div className="flex items-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-sky-700 text-white px-4 py-2 rounded"
          >
            {loading ? "Submitting..." : "Create Post"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default PostCreate;
