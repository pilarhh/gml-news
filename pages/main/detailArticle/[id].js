import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsTrash } from "react-icons/Bs";
import {AiOutlineEdit} from "react-icons/ai"
import fetcher from "../../api/fetcher";
import Navbar from "../navbar";

export default function ListNews() {
  const router = useRouter();
  const id = router.query.id;
  const url = `${process.env.NEXT_PUBLIC_URL}/detail_news/${id}`;
  const urlDelete = `${process.env.NEXT_PUBLIC_URL}/delete_news`;
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleDelete = () => {
    const token = localStorage.getItem("token");
    fetcher("POST", urlDelete, {
      data: { idnews: id },
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        alert("Successfully Deleted");
        router.push("/main/homepage");
      })
      .catch((err) => {
        alert("Failed, try again");
        console.log(err.response.data.message);
      });
  };

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      });
  }, []);

  if (!data) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Navbar />
      <div className="text-center p-3">
        <p className="h3 fw-bold mt-2">{data.title}</p>
        <Image
          className="rounded-3 mt-2"
          src={data.image}
          alt="image"
          width={200}
          height={200}
        />
        <p className="mt-4">{data.body}</p>
        <div className="d-flex flex">
          <BsTrash className="h4 pointer" onClick={handleDelete} />
          <p className="ms-2"> ← Delete article</p>
          <AiOutlineEdit className="ms-4 h4 pointer" onClick={()=>router.push(`/main/updateNews/${data.id}`)} />
          <p className="ms-2"> ← Edit article</p>
        </div>
      </div>
    </>
  );
}
