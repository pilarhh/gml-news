import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import fetcher from "../../api/fetcher";
import Navbar from "../navbar";

export default function AddNews() {
  const router = useRouter();
  const [pic, setPic] = useState(null);
  const [form, setForm] = useState({
    title: "",
    body: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const url = `${process.env.NEXT_PUBLIC_URL}/add_news`;
  const handleAdd = () => {
    const PPData = new FormData();
    PPData.append("pic", pic);
    PPData.append("title", form.title);
    PPData.append("body", form.body);
    const token = localStorage.getItem("token");
    fetcher("POST", url, {
      data: PPData,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        alert("Successfully Submitted");
        router.push("/main/homepage");
      })
      .catch((err) => {
        alert("Failed, try again");
        console.log(err.response.data.message);
      });
  };
  const handlePic = (e) => {
    e.preventDefault();
    setPic(e.target.files[0]);
  };
  return (
    <>
    <Navbar/>
    <div className="p-3 mx-5 text-center">
      <p className="h2 mt-3 fw-bold">Add New Article</p>
      <div>
        {pic ? (
          <Image
            alt=""
            src={URL.createObjectURL(pic)}
            height={500}
            width={950}
            className="rounded-2 mt-4"
          />
        ) : (
          ''
          )}
      </div>
      <form encType="multipart/form-data" className="">
        <input className="pp-input" type="file" onChange={handlePic} />
      </form>
      <div className="d-flex flex-column w-100 align-items-center mt-3">
        <input
          className="w-100 p-2 my-3 rounded-4 border-warning text-center"
          type="text"
          name="title"
          onChange={handleChange}
          value={form.title}
          placeholder="Enter title"
        />
        <input
          className="p-5 w-100 rounded-4 border-warning text-center"
          type="text"
          name="body"
          onChange={handleChange}
          value={form.body}
          placeholder="Enter body"
          />
      </div>
      <button className="rounded-3 btn-pink p-2 shadow w-25 mt-3 text-white align-items-right float-end" onClick={handleAdd}>
        Confirm
      </button>
    </div>
          </>
  );
}
