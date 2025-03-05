"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import axios from "axios";

const NavBar = () => {
  const route = useRouter();
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuth(token); 
  }, [isAuth]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/logout",
        { headers: { "X-Requested-With": "XMLHttpRequest",
           Authorization: `Bearer ${isAuth}` 
         },
       }
      );
      console.log(response)
      localStorage.removeItem('authToken')
      route.push("/");
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }

  return (
    <div className="post-create-btn flex justify-center my-2 gap-2">
      {isAuth !== null ? (
        <>
          <Button>
            <Link href="/dashboard">Home</Link>
          </Button>
          <Button>
            <Link href="/post-create">Create Post</Link>
          </Button>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      ) : null}
    </div>
  );
};

export default NavBar;
