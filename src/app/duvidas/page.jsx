"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, Modal, Card, Skeleton} from "antd";
import Image from "next/image";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Navigation from '@/components/Navigation';
import { ToastContainer, toast } from "react-toastify";
import CardDuvidas from "@/components/CardDuvidas";

const headers = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY};

export default function Feed() {
    const [data, setData] = useState({
        duvidas: [],
        loading: true,
        current: 1,
        pageSize: 10,
    });

    const [modalInfo, setModalInfo] = useState({
        visible: false,
        duvida: null,
        comentarios: null,
        loading: false,
    });

    useEffect(() => {
        const fetchduvidas = async () => {
            const cacheKey = "duvidasData";
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/duvidas`,
                    { headers : headers }
                );
                setData({ duvidas: response.data, loading: false, current: 1, pageSize: 10 });
            } catch (error) {
                console.error("Error fetching duvidas:", error);
                toast.error("Erro ao carregar os duvidas.");
                setData((d) => ({ ...d, loading: false }));
            }
        }
        fetchduvidas();
    }, []);

    const openModal = async (duvida) => {
        setModalInfo({
            visible: true,
            duvida: duvida,
            comentario: null,
            loading: true, 
        });
        try {
            const { data: comentario } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/comments/${duvida.id}`,
                { headers: headers }
            );
            setModalInfo((m) => ({ ...m, comentario, loading: false }));
        } catch (error) {
            toast.error("Erro ao carregar os comentários.");
            setModalInfo((m) => ({ ...m, loading: false }));
        }
    };

const paginatedduvidas = () => {
    const start = (data.current - 1) * data.pageSize;
    return data.duvidas.slice(start, start + data.pageSize);
};

return (
    <div className="feed-container">
        <Header />
        <Navigation />

        <ToastContainer />
        <h1>Feed de duvidas</h1>

        <Pagination
            current={data.current}
            pageSize={data.pageSize}
            total={data.duvidas.length}
            onChange={(page, pageSize) => setData({ ...data, current: page, pageSize })}
            showSizeChanger
            pageSizeOptions={[5, 10, 20, 50]}
            />

            {data.loading ? (
    <Loader />
) : (
    <div className="duvidas-list">
        {paginatedduvidas().map((duvida, idx) => (
            <CardDuvidas
                key={duvida.id ?? idx}
                duvida={duvida}
                onClick={() => openModal(duvida)}
            />
        ))}
    </div>
)}
        
        <Modal
            title={`Comentários de ${modalInfo.comentarios?.data_publicacao }`}
            open={modalInfo.visible}
            onCancel={() => setModalInfo({
                visible: false,
                duvida: null,
                comentario: null,
                loading: false,
            })}

            onOk={() => setModalInfo({
                visible: false,
                duvida: null,
                comentario: null,
                loading: false,
            })}
            width={800}
        >
            {modalInfo.loading ? (
                <Skeleton active />
            ) : (
                modalInfo.comentarios ? (
                    <div>
                        <p><strong>Comentário:</strong> {modalInfo.comentarios.conteudo_comentario}</p>
                        <p><strong>Imagem:</strong> {modalInfo.comentarios.anexo}</p>
                    </div>

                ) : (
                    <p>Nenhum comentário encontrado.</p>
                )
            )}
        </Modal>
    </div>
);
}