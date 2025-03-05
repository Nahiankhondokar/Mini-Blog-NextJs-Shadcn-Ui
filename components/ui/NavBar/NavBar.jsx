"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import axios from "axios";
import userLogout from "@/lib/userLogout";

const NavBar = () => {
  const route = useRouter();
  const handleLogout = async () => {
    const logoutResponse = await userLogout();
    if(logoutResponse){
      route.push("/")
    }
  }

  return (
    <div className="post-create-btn flex justify-center my-2 gap-2">
        <>
          <Button>
            <Link href="/dashboard">Home</Link>
          </Button>
          <Button>
            <Link href="/post-create">Create Post</Link>
          </Button>
          <Button onClick={handleLogout}>Logout</Button>
        </>
    </div>
  );
};

export default NavBar;
