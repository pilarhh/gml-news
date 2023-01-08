import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import fetcher from "../../api/fetcher";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const url = `${process.env.NEXT_PUBLIC_URL}/login`;
  const handleLogin = () => {
    console.log(form);
    fetcher("POST", url, {
      data: form,
    })
      .then((res) => {
        const result = res?.data?.data;
        const token = result.token;
        console.log(result);
        localStorage.setItem("token", token);
        router.push("/main/homepage");
      })
      .catch((err) => {
        alert("Wrong email or password, try again");
      });
  };
  return (
    <main className="d-flex flex-row p-4">
      <div className="text-center col">
        <p className="h1 mt-5">Log in</p>
        <span className="text-secondary">Log in to see the updated news!</span>
        <div className="d-flex flex-column w-100 align-items-center mt-5">
          <input
            className="border border-warning p-3 rounded-6 w-75 my-2"
            type="text"
            name="username"
            onChange={handleChange}
            value={form.username}
            placeholder="Enter your username"
          />
          <input
            className="border border-warning p-3 rounded-6 w-75 my-2"
            type="text"
            name="password"
            onChange={handleChange}
            value={form.password}
            placeholder="Enter your password"
          />
        </div>
        <button className="rounded-3 btn-pink p-2 shadow w-75 mt-5 text-white" onClick={handleLogin}>
          Log in
        </button>
      </div>
      <Image
        alt=""
        src="https://data.whicdn.com/images/250779617/original.png"
        width={400}
        height={650}
        className='mx-5 col'
      />
    </main>
  );
}
