"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "antd";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import CardPostagem from "@/components/CardPostagem";
import Noticias from "@/components/Noticias";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Feed.module.css";

const headers = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Feed() {
  const [data, setData] = useState({
    posts: [],
    filteredPosts: [],
    loading: true,
    current: 1,
    pageSize: 10,
  });
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posts`,
          { headers }
        );
        setData((d) => ({
          ...d,
          posts: response.data,
          filteredPosts: response.data,
          loading: false,
          current: 1,
        }));
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Erro ao carregar os posts.");
        setData((d) => ({ ...d, loading: false }));
      }
    };

    fetchPosts();
  }, []);
  const filtrarPosts = () => {
    const filtroLower = filtro.trim().toLowerCase();

    if (!filtroLower) {
      setData((d) => ({
        ...d,
        filteredPosts: d.posts,
        current: 1,
      }));
      return;
    }

    const filtrados = data.posts.filter((post) =>
      post.conteudo_post?.toLowerCase().includes(filtroLower)
    );

    if (filtrados.length === 0) {
      toast.error("Nenhum resultado encontrado.");
    }

    setData((d) => ({
      ...d,
      filteredPosts: filtrados,
      current: 1,
    }));
  };

  const paginatedPosts = () => {
    const start = (data.current - 1) * data.pageSize;
    return data.filteredPosts.slice(start, start + data.pageSize);
  };

  return (
    <div className={styles.pageContainer}>
      <Navigation />

      <div className={styles.feedColumn}>
        <Header
          filtro={filtro}
          setFiltro={setFiltro}
          onFiltrar={filtrarPosts}
        />
        <ToastContainer />

        <div className={styles.feed}>
          {data.loading ? (
            <Loader />
          ) : (
            <div className="posts-list">
              {paginatedPosts().map((post, idx) => (
                <CardPostagem
                  key={post.id_post ?? idx}
                  post={post}
                  usuario={{
                    username: post.usuario_nome,
                    foto_perfil: `${process.env.NEXT_PUBLIC_IMG_URL}/${post.foto_perfil}`,
                  }}
                />
              ))}
              <Pagination
                className={styles.pagination}
                current={data.current}
                pageSize={data.pageSize}
                total={data.filteredPosts.length}
                onChange={(page, pageSize) =>
                  setData((d) => ({ ...d, current: page, pageSize }))
                }
                showSizeChanger
                pageSizeOptions={[5, 10, 20, 50]}
              />
            </div>
          )}
        </div>
      </div>

      <Noticias />
    </div>
  );
}
