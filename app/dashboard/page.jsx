"use client";

import { Button } from "@/components/ui/button";
import NavBar from "@/components/ui/NavBar/NavBar";
import userLogout from "@/lib/userLogout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Dashboard = () => {

  return (
    <>
      <NavBar />

    <div className="blogs my-10">
        <div className="max-w-sm m-auto rounded overflow-hidden shadow-lg bg-sky-100">
          <div className="px-6 py-4">
            <Link href="/post-details">
              <img
                src="https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg"
                alt="post"
              />
              <div className="font-bold text-xl my-2">The Coldest Sunset</div>
            </Link>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
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
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit
                non, vel amet quos ad fugiat enim quia beatae aliquam nostrum.
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
      </div>
    </>
  )
}

export default Dashboard