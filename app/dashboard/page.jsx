"use client";

import { Button } from "@/components/ui/button";
import NavBar from "@/components/ui/NavBar/NavBar";
import userLogout from "@/lib/userLogout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const imagePath = "http://127.0.0.1:8000/storage/";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          setError("No authentication token found.");
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/api/post", {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log(response.data);
        setPosts(response.data.data);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred.");
        console.error(error.response);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <NavBar />

      <div className="blogs my-10">
        {posts.map((post) => (
          <div
            key={post.id}
            className="max-w-sm m-auto rounded overflow-hidden shadow-lg bg-sky-100 my-5"
          >
            <div className="px-6 py-4">
              <Link href="/post-details">
                <img src={imagePath + post.image ?? null} alt="post" />
                <div className="font-bold text-xl my-2">{post.title}</div>
              </Link>
              <p className="text-gray-700 text-base">{post.desciption}</p>
            </div>
            <div className="w-full border-1 border-gray-300"></div>
            <div className="px-6 pt-4 pb-2">
              <div className="comment-area my-3 border-2 border-gray-300 p-2 rounded">
                <div className="author-area flex items-center gap-2">
                  <img
                    className="w-8 h-8"
                    src="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png"
                    alt="author"
                  />
                  <p className="text-black font-bold">Author</p>
                </div>
                <span className="text-black">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Velit non, vel amet quos ad fugiat enim quia beatae aliquam
                  nostrum.
                </span>
              </div>
            </div>

            <div className="px-6 pt-4 pb-2">
              <form className="max-w-sm mx-auto flex item-center justify-between gap-2">
                <div className="w-full">
                  <input
                    type="text"
                    id="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Comment..."
                  />
                </div>
                <button
                  type="submit"
                  className="text-white h-10 bg-sky-700 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-300 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
