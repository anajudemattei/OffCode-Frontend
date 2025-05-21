"use client";

import styles from "./feed.module.css";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Pagination, Modal, Skeleton } from "antd"; 
import { ToastContainer, toast } from "react-toastify";
import { getSessionStorage, setSessionStorage } from "../../utils/sessionStorage";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import CardPostagem from "@/components/CardPostagem"; 
import Noticias from "@/components/Noticias";

const Headers = {"x-api-key": process.env.NEXT_PUBLIC_API_KEY};


export default function Feed() {
    const [data, setData] = useState({
        posts:[],
        loading: true,
        current: 1,
        pageSize: 0,
    });

    const[modalInfo, setModalInfo] = useState({
        visible: false,
        post: null,
        loading: false,
    });

    useEffect(() => {
        const fetchPosts = async () => {
            const cached = getSessionStorage("postsData", []);
            if (cached.length > 0) {
                setData({posts: cached, loading: false, current: 1, pageSize: 10});
                return;
            } try {
                const {data : posts} = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/posts`,
                    { headers: Headers }
                );
                setSessionStorage("postsData", posts);
                setData({posts, loading: false, current: 1, pageSize: 5});
                } catch (error) {
                    console.error("Erro ao buscar posts:", error);
                    TurborepoAccessTraceResult.error("Erro ao carregar posts");
                    setData((d) => ({...d, loading: false}));
        }
    };
fetchPosts();
    }, []);

    const openModal = async (post) => {
        setModalInfo({ visible: true, post, loading: true });

        const cacheKey = `post_${post.id}`;
        const cached = getSessionStorage(cacheKey, null);
        if (cached) {
            setModalInfo ((m) => ({...m, post: cached, loading: false}));
            return;
        }

        try {
            const { data: post } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/posts/${post.id}`,
                {
                    headers: Headers,
                }
            );
            setSessionStorage(cacheKey, post);setModalInfo((m) => ({...m, post, loading: false}));
        } catch {
            toast.error("Erro ao carregar post");
            setModalInfo((m) => ({ ...m, loading:false}));
        }
    };
     
    const paginatedPosts = () => {
        const start = (data.current - 1) * data.pageSize;
        return data.posts.slice(start, start + data.pageSize);
    };

    return (
        <div className={styles.pageContainer}>
            <Navigation />
            <Header />

            <Pagination
                current={data.current}
                className={styles.pagination}
                pageSize={data.pageSize}
                total={data.posts.length}
                onChange={(page, size) => {
                    setData((d) => ({ ...d, current: page, pageSize: size }));
                }}
                showSizeChanger
                pageSizeOptions={[5, 10, 20]}
            />

            {data.loading ? (
                <Loader />
            ) : (
                <div className={styles.mainContent}>
                    <div className={styles.feedContent}>
                        {paginatedPosts().map((post) => (
                            <CardPostagem
                                key={post.id}
                                post={post}
                                hoverable
                                onClick={() => openModal(post)}
                            />
                        ))}
                    </div>

                    <Modal
                        title={`Postagem de ${modalInfo.post?.usuario_id.username || ""}`}
                        open={modalInfo.visible}
                        onCancel={() =>
                            setModalInfo({
                                visible: false,
                                post: null,
                                loading: false,
                            })
                        }
                        onOk={() =>
                            setModalInfo({
                                visible: false,
                                post: null,
                                loading: false,
                            })
                        }
                        width={600}
                    >
                        {modalInfo.loading ? (
                            <Skeleton active />
                        ) : modalInfo.post ? (
                            <div className={styles.postInfo}>
                                <CardPostagem post={modalInfo.post} />
                            </div>
                        ) : (
                            <p style={{ textAlign: "center" }}>
                                Nenhum post encontrado
                            </p>
                        )}
                    </Modal>

                    <Noticias />

                       <ToastContainer position="top-right" autoClose={3000} />
                </div>
            )}
        </div>
    );
}