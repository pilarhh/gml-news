import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
          height={500}
          width={950}
        />
        <p className="mt-4">{data.body}</p>
        <div className="d-flex flex mt-3 justify-content-center">
          <button
            className="ms-2 bg-pink rounded p-2 text-white"
            onClick={handleDelete}
          >
            Delete article
          </button>
          <button
            className="ms-2 bg-pink rounded p-2 text-white"
            onClick={() => router.push(`/main/updateNews/${data.id}`)}
          >
            Edit article
          </button>
        </div>
      </div>
    </>
  );
}
