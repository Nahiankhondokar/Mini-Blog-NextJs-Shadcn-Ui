"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import axios from "axios";
import userLogout from "@/lib/userLogout";

const NavBar = () => {
  const route = useRouter();
  const [isAuth, setIsAuth] = useState();

  const handleLogout = async () => {
    const logoutResponse = await userLogout();
    if(logoutResponse){
      route.push("/")
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuth(token); 
  }, []);

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
