"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, Modal, Card, Skeleton } from "antd";
import Image from "next/image";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Navigation from '@/components/Navigation';
import { ToastContainer, toast } from "react-toastify";
import styles from "./Perfis.module.css"; 
import Noticias from "@/components/Noticias";
import ButtonTop from "@/components/ButtonTop";
import CardUsuario from "@/components/CardUsuarios";

const headers = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function FeedUsuarios() {
    const [data, setData] = useState({
        usuarios: [],
        loading: true,
        current: 1,
        pageSize: 10,
    });

    const [modalInfo, setModalInfo] = useState({
        visible: false,
        usuario: null,
        loading: false,
    });

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/users`,
                    { headers }
                );
                setData({ usuarios: response.data, loading: false, current: 1, pageSize: 10 });
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
                toast.error("Erro ao carregar os usuários.");
                setData((d) => ({ ...d, loading: false }));
            }
        };
        fetchUsuarios();
    }, []);

    const openModal = (usuario) => {
        setModalInfo({
            visible: true,
            usuario,
            loading: false,
        });
    };

    const paginatedUsuarios = () => {
        const start = (data.current - 1) * data.pageSize;
        return data.usuarios.slice(start, start + data.pageSize);
    };

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <Navigation />
                <ToastContainer />

                <div className={styles.usuariosContainer}>
                    {data.loading ? (
                        <Loader />
                    ) : (
                        <div className={styles.usuariosGrid}>
                            {paginatedUsuarios().map((usuario, idx) => (
                                <div className={styles.usuarioWrapper} key={usuario.id_usuario ?? idx}>
                                    <CardUsuario usuario={usuario} onClick={() => openModal(usuario)} />
                                </div>
                            ))}
                        </div>
                    )}
                    <Pagination
                        className={styles.pagination}
                        current={data.current}
                        pageSize={data.pageSize}
                        total={data.usuarios.length}
                        onChange={(page, pageSize) => setData({ ...data, current: page, pageSize })}
                        showSizeChanger
                        pageSizeOptions={[5, 10, 20, 50]}
                    />
                </div>
                
                <Modal
                    title={`Perfil de ${modalInfo.usuario?.nome}`}
                    open={modalInfo.visible}
                    onCancel={() => setModalInfo({ visible: false, usuario: null, loading: false })}
                    onOk={() => setModalInfo({ visible: false, usuario: null, loading: false })}
                    width={800}
                >
                    {modalInfo.loading ? (
                        <Skeleton active />
                    ) : modalInfo.usuario ? (
                        <div>
                            <p><strong>Username:</strong> {modalInfo.usuario.username}</p>
                            <p><strong>Email:</strong> {modalInfo.usuario.email}</p>
                            <p><strong>Tipo de Conta:</strong> {modalInfo.usuario.tipo_conta}</p>
                            <p><strong>Descrição:</strong> {modalInfo.usuario.descricao}</p>
                            <p><strong>Especializações:</strong> {modalInfo.usuario.especializacoes}</p>
                            {modalInfo.usuario.foto_perfil && (
                                <p><strong>Foto Perfil:</strong> <Image src={modalInfo.usuario.foto_capa} alt="Foto Perfil" width={100} height={100} /></p>
                            )}
                        </div>
                    ) : (
                        <p>Usuário não encontrado.</p>
                    )}
                </Modal>
            </div>
        </div>
    );
}