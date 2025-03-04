"use client";
import AuthGuard from "@/components/ui/AuthGuard/AuthGuard";
import React from "react";

const PostCreate = () => {
  return (
    <AuthGuard>
      <main className="post-create-area">
        <form className="max-w-sm mx-auto bg-sky-100 p-2 my-5">
          <div className="title-area text-center font-bold font-md">
            <h4>Post Create</h4>
            <div className="w-full border-1 border-gray-300 my-5"></div>
          </div>
          <div className="mb-5">
            <label htmlFor="">Title</label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="title"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="">Descrption</label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="desciption"
              required
            />
          </div>

          <label>Categories</label>
          <br />
          <div className="flex items-center mb-4">
            <input
              id="one"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="one"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              One
            </label>
          </div>

          <div className="flex items-center mb-5 w-full">
            <button
              type="submit"
              className="text-white w-100 bg-sky-700 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-sky-300 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </AuthGuard>
  );
};

export default PostCreate;
