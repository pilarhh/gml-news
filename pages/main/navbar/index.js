import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function Navbar() {
  const router = useRouter()
  return (
    <div className="bg-pink p-3 d-flex justify-content-center">
        <p className="fw-bold fs-3 text-white mx-5">GML News</p>
      <div className="d-flex justify-content-center text-white mt-2 mx-5 text-decoration-none">
        <Link href="/main/homepage" passHref>
          <span className="pointer text-white">Home</span>
        </Link>
        <Link href="/main/addNews" passHref>
          <span className="pointer mx-5 text-white">Add new article</span>
        </Link>
        <Link href="" passHref>
          <span className="pointer text-white" onClick={()=>router.push('/', localStorage.removeItem('token'))}>Log out</span>
        </Link>
      </div>
    </div>
  );
}
