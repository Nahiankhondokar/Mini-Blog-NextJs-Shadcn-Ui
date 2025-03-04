"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../button";

const NavBar = () => {
  const isAuth = localStorage.getItem("authToken");
  console.log(isAuth);
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
        </>
      ) : null}
    </div>
  );
};

export default NavBar;
