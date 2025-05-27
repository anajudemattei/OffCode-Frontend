"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination, Modal, Card, Skeleton } from "antd";
import Image from "next/image";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Navigation from "@/components/Navigation";
import { ToastContainer, toast } from "react-toastify";
import CardPostagem from "@/components/CardPostagem";
import Noticias from "@/components/Noticias";
import styles from "./Feed.module.css";

const headers = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Feed() {
  const [data, setData] = useState({
    posts: [],
    loading: true,
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      const cacheKey = "postsData";
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posts`,
          { headers: headers }
        );
        setData({
          posts: response.data,
          loading: false,
          current: 1,
          pageSize: 10,
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Erro ao carregar os posts.");
        setData((d) => ({ ...d, loading: false }));
      }
    };
    fetchPosts();
  }, []);



  const paginatedPosts = () => {
    const start = (data.current - 1) * data.pageSize;
    return data.posts.slice(start, start + data.pageSize);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.navigationColumn}>
        <Navigation />
      </div>

      <div className={styles.feedColumn}>
        <div className={styles.header}>
        <Header />
        <ToastContainer />
        </div>

        <div className={styles.feed}>
        <h1>Feed de Posts</h1>

        <Pagination
          current={data.current}
          pageSize={data.pageSize}
          total={data.posts.length}
          onChange={(page, pageSize) =>
            setData({ ...data, current: page, pageSize })
          }
          showSizeChanger
          pageSizeOptions={[5, 10, 20, 50]}
        />

        {data.loading ? (
          <Loader />
        ) : (
          <div className="posts-list">
            {paginatedPosts().map((post, idx) => (
              <CardPostagem
                key={post.id ?? idx}
                post={post}
              />
            ))}
          </div>
        )}
        </div>
      </div>

      <div className={styles.noticiasColumn}>
        <Noticias />
      </div>
    </div>
  );
}
