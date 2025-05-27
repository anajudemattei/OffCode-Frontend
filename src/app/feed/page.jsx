"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, Modal, Card, Skeleton} from "antd";
import Image from "next/image";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Navigation from '@/components/Navigation';
import { ToastContainer, toast } from "react-toastify";
import CardPostagem from "@/components/CardPostagem";

const headers = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY};

export default function Feed() {
    const [data, setData] = useState({
        posts: [],
        loading: true,
        current: 1,
        pageSize: 10,
    });

    const [modalInfo, setModalInfo] = useState({
        visible: false,
        post: null,
        comentario: null,
        loading: false,
    });

    useEffect(() => {
        const fetchPosts = async () => {
            const cacheKey = "postsData";
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/posts`,
                    { headers : headers }
                );
                setData({ posts: response.data, loading: false, current: 1, pageSize: 10 });
            } catch (error) {
                console.error("Error fetching posts:", error);
                toast.error("Erro ao carregar os posts.");
                setData((d) => ({ ...d, loading: false }));
            }
        }
        fetchPosts();
    }, []);

    const openModal = async (post) => {
        setModalInfo({
            visible: true,
            post: post,
            comentario: null,
            loading: true, 
        });
        try {
            const { data: comentario } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/comments/${post.id}`,
                { headers: headers }
            );
            setModalInfo((m) => ({ ...m, comentario, loading: false }));
        } catch (error) {
            toast.error("Erro ao carregar os comentários.");
            setModalInfo((m) => ({ ...m, loading: false }));
        }
    };

const paginatedPosts = () => {
    const start = (data.current - 1) * data.pageSize;
    return data.posts.slice(start, start + data.pageSize);
};

return (
    <div className="feed-container">
        <Header />
        <Navigation />

        <ToastContainer />
        <h1>Feed de Posts</h1>

        <Pagination
            current={data.current}
            pageSize={data.pageSize}
            total={data.posts.length}
            onChange={(page, pageSize) => setData({ ...data, current: page, pageSize })}
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
                onClick={() => openModal(post)}
            />
        ))}
    </div>
)}
        
        <Modal
            title={`Comentários de ${modalInfo.comentario?.data_publicacao }`}
            open={modalInfo.visible}
            onCancel={() => setModalInfo({
                visible: false,
                post: null,
                comentario: null,
                loading: false,
            })}

            onOk={() => setModalInfo({
                visible: false,
                post: null,
                comentario: null,
                loading: false,
            })}
            width={800}
        >
            {modalInfo.loading ? (
                <Skeleton active />
            ) : (
                modalInfo.comentario ? (
                    <div>
                        <p><strong>Comentário:</strong> {modalInfo.comentario.conteudo_comentario}</p>
                        <p><strong>Imagem:</strong> {modalInfo.comentario.anexo}</p>
                    </div>

                ) : (
                    <p>Nenhum comentário encontrado.</p>
                )
            )}
        </Modal>
    </div>
);
}