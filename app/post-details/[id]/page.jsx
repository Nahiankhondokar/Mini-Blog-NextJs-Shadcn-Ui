"use client"
import AuthGuard from "@/components/ui/AuthGuard/AuthGuard";
import NavBar from "@/components/ui/NavBar/NavBar";
import api from "@/lib/axiosInstance";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PageDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPostDetails = async () => {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.log("No auth token found");
        return;
      }

      try {
        const response = await api.get(`/post/${id}`);
        setPost(response.data.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (id) {
      getPostDetails();
    }
  }, [id]);

  return (
   <>
   <AuthGuard>
    <NavBar />

    <div className="blogs my-10">
      <div className="max-w-sm m-auto rounded overflow-hidden shadow-lg bg-sky-100">
        <div className="px-6 py-4">
          {post?.image ? <img src={imagePath + post.image ?? null} alt="post" /> 
          : 
          <img src='/noimg.png' alt="post" />}
          
          <div className="font-bold text-xl mb-2">{post?.title}</div>
          <p className="text-gray-700 text-base">
          {post?.desciption}
          </p>
        </div>
        <div className="w-full border-1 border-gray-300"></div>
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

      </div>
    </div>
   </AuthGuard>
   </>
  );
};

export default PageDetails;
