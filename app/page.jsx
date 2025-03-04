import NavBar from "@/components/ui/NavBar/NavBar";
import React, { useState } from 'react'

const Home = () => {

  const form = useState([
    'email'  "",
  ]);

  return (
    <main className="post-create-area">
    <form className="max-w-sm mx-auto bg-sky-200 p-2 my-5 rounded">
      <div className="title-area text-center font-bold font-lg">
        <h4>Login</h4>
        <div className="w-full border-1 border-sky-700 my-5"></div>
      </div>
      <div className="mb-5">
        <label htmlFor="">Email</label>
        <input
          type="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="title"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="">Password</label>
        <input
          type="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="password"
          required
        />
      </div>

      <div className="flex items-center w-full">
        <button
          type="submit"
          className="text-white bg-sky-700 m-auto w-20 font-bold hover:bg-sky-500 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  </main>
  )
}

export default Home;