"use client"
import AuthGuard from '@/components/ui/AuthGuard/AuthGuard'
import NavBar from '@/components/ui/NavBar/NavBar'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const PostEdit = () => {
    const {id} = useParams();
    const route = useRouter();
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        desciption: "",
        image: null,
        categories: [],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
       try {
            const formDataObj = new FormData();
            formDataObj.append("title", formData.title);
            formDataObj.append("desciption", formData.desciption);
            formData.categories.forEach((category) => {
                formDataObj.append("categories[]", category);
              });
              formDataObj.append("_method", "PATCH");

            if (formData.image) {
                formDataObj.append("image", formData.image);
            }

            const authToken = localStorage.getItem("authToken");
            await axios.post(
                `http://127.0.0.1:8000/api/post/${id}`,
                formDataObj,
                {
                    headers: {
                    "Content-Type": "multipart/form-data",
                    "X-Requested-With": "XMLHttpRequest",
                    Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            setSuccess("Post updated successfully!");
            setFormData({ title: "", desciption: "", categories: [], image: null });
            route.push("/dashboard");
  
        } catch (error) {
            setLoading(false)
            setError(error.response?.data?.message || "Something went wrong.");
       }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
      };

    const fetchEditPost = async () => {
        const authToken = localStorage.getItem('authToken')
        await axios.get(`http://127.0.0.1:8000/api/post/${id}`, {
        headers : {
            Authorization: `Bearer ${authToken}`,
        }
       })
        .then((response) => {
            let arrCat = [];
            response.data.data.categories.map((cat) => {
                arrCat.push(String(cat.id));
            });

            setFormData({
                title: response.data.data?.title,
                desciption: response.data.data?.desciption,
                image: response.data.data?.image,
                categories : arrCat
            });
        })
        .catch((error) => {
            console.log(error)
        });
    }

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
        fetchEditPost();
    }, [id]);
  return (
    <>
    <AuthGuard>
        <NavBar />
        <main className="post-create-area ">
          <form
            className="max-w-sm mx-auto bg-sky-100 p-2 my-5 shadow-lg rounded"
            onSubmit={handleSubmit}
          >
            <div className="title-area text-center font-bold font-md">
              <h4>Update Post</h4>
              <div className="w-full border-1 border-gray-300 my-5"></div>
            </div>

            {error && <p className="text-red-500 text-center bg-gray-900">{error}</p>}
            {success && <p className="text-green-500 text-center bg-gray-900">{success}</p>}

            <div className="mb-5">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full bg-gray-100  border-gray-900 "
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
                className="border rounded-lg p-2 w-full bg-gray-100 border-gray-900 "
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
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
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
                className="bg-sky-700 text-white px-4 py-2 rounded w-full"
              >
                {loading ? "Submitting..." : "Update Post"}
              </button>
            </div>
          </form>
        </main>
    </AuthGuard>
    </>
  )
}

export default PostEdit