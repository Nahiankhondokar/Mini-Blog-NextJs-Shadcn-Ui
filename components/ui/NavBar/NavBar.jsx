"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../button";

const NavBar = () => {
  return (
    <div className="post-create-btn flex justify-center my-2 gap-2">
      <Button>
        <Link href="/dashboard">Home</Link>
      </Button>
      <Button>
        <Link href="/post-create">Create Post</Link>
      </Button>
    </div>
  );
};

export default NavBar;
