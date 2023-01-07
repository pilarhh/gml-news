import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsClock } from "react-icons/Bs";

export default function ListNews() {
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_URL}/list_news`;
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (!data) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div className="mx-5 mt-3 text-center d-flex flex-column">
        {data?.data?.map((item) => {
          return (
            <>
              <div className="d-flex my-4 w-100 p-2 text-center">
                <div className="d-flex flex-column">
                  <Image
                    className="rounded-3"
                    src={item.image}
                    alt="image"
                    width={200}
                    height={200}
                  />
                  <p className="mt-2 fs-4 fw-bold">{item.title}</p>
                  <div className="d-flex">
                    <BsClock className="mt-1" />
                    <p className="ms-2">{item.timecreated}</p>
                  </div>
                  <div className="d-flex">
                  <button
                    className="rounded-3 btn-pink p-1 shadow text-white w-100"
                    onClick={() =>
                      router.push(`/main/detailArticle/${item.id}`)
                    }
                  >
                    Read Now
                  </button>
                  </div>
                </div>
              </div>
              <div className="border-bottom"></div>
            </>
          );
        })}
      </div>
    </>
  );
}
