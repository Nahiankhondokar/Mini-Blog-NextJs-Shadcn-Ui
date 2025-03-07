"use client";
import AuthGuard from "@/components/ui/AuthGuard/AuthGuard";
import NavBar from "@/components/ui/NavBar/NavBar";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

const Dashboard = () => {
  const route = useRouter();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({});
  const imagePath = "http://127.0.0.1:8000/storage/";

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
    
      setPosts(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
      
    }
  };

  const handleChange = (e, postId) => {
    setFormData({[postId]: e.target.value});
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");

    const formDataObj = new FormData();
    formDataObj.append("comment", formData[postId]);
    formDataObj.append("post_id", postId);

    await axios.post("http://127.0.0.1:8000/api/comment-store", formDataObj, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    });

    setFormData({ [postId]: "" });
    setSuccess("Comment stored successfully");
    route.push("/dashboard");
  };

  const handlePostDelete = async (id) => {
    const authToken = localStorage.getItem("authToken");
    await axios.delete("http://127.0.0.1:8000/api/post/"+id, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    setSuccess("Comment deleted successfully");
  }

  useEffect(() => {
    fetchPosts();
  }, [success]);

  return (
    <>
      <AuthGuard>
        <NavBar />

        <div className="blogs my-10">
          
          {success && <p className="text-green-500 text-center text-lg font-medium">{success}</p>}
          {posts.length > 0 ? posts.map((post) => (
            
            <div
              key={post.id}
              className="max-w-sm m-auto rounded overflow-hidden shadow-lg bg-sky-100 my-5 border-2 border-blue-300"
            >
              <div className="action-btns flex gap-2 justify-end p-1">
                <Link href={`/post-edit/${post.id}`} className="text-white p-1 rounded bg-blue-500"><FaRegEdit /></Link>
                <button className="text-white p-1 cursor-pointer rounded bg-red-500" onClick={()=>handlePostDelete(post.id)}><FaRegTrashAlt /></button>
              </div>
              <div className="px-6 py-4">
                <Link href={`/post-details/${post.id}`}>
                   {post?.image ? <img src={imagePath + post.image ?? null} alt="post" /> 
                   : 
                   <img className="text-center" src="/noimg.png" alt="post" />}
                            
                  <div className="font-bold text-xl my-2">{post.title}</div>
                </Link>
                <p className="text-gray-700 text-base">{post.desciption}</p>
              </div>
              <div className="w-full border-1 border-blue-300"></div>

              <div className="px-6 pt-4 pb-2">
                {post?.comments.length > 0
                  ? post?.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="comment-area my-3 border-2 border-gray-300 p-2 rounded"
                      >
                        <div className="author-area flex items-center gap-2">
                          <img
                            className="w-8 h-8"
                            src="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png"
                            alt="author"
                          />
                          <p className="text-black font-bold">
                            {comment?.user?.name}
                          </p>
                        </div>
                        <span className="text-black">{comment.comment}</span>
                      </div>
                    ))
                  : "No comments."}
              </div>

              <div className="px-6 pt-4 pb-2">
                <form
                  className="max-w-sm mx-auto flex item-center justify-between gap-2"
                  onSubmit={(e) => handleCommentSubmit(e, post.id)}
                >
                  <div className="w-full">
                    <input
                      type="text"
                      id="text"
                      name={post.id}
                      value={formData[post.id]}
                      onChange={(e) => handleChange(e, post.id)}
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
          )) 
          :
          <div
            
              className="max-w-sm m-auto rounded overflow-hidden shadow-lg bg-sky-100 my-5 border-2 border-red-500 text-center p-5 font-bold"
            >
             No Blog Found
            </div>
          }
        </div>
      </AuthGuard>
    </>
  );
};

export default Dashboard;
