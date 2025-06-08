"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination, Modal, Skeleton } from "antd";
import Image from "next/image";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Navigation from "@/components/Navigation";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Perfis.module.css";
import CardUsuario from "@/components/CardUsuarios";

const headers = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function FeedUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filtro, setFiltro] = useState("");

  const [modalInfo, setModalInfo] = useState({
    visible: false,
    usuario: null,
    loading: false,
  });

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users`,
          { headers }
        );
        setUsuarios(response.data);
        setUsuariosFiltrados(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        toast.error("Erro ao carregar os usuários.");
      }
      setLoading(false);
    };
    fetchUsuarios();
  }, []);

  const onFiltrar = () => {
    const filtroLower = filtro.trim().toLowerCase();
    if (!filtroLower) {
      setUsuariosFiltrados(usuarios);
      setCurrent(1);
      return;
    }
    const filtrados = usuarios.filter(
      (u) =>
        u.nome?.toLowerCase().includes(filtroLower) ||
        u.username?.toLowerCase().includes(filtroLower)
    );
    if (filtrados.length === 0) {
      toast.error("Nenhum usuário encontrado.");
    }
    setUsuariosFiltrados(filtrados);
    setCurrent(1);
  };

  const openModal = (usuario) => {
    setModalInfo({
      visible: true,
      usuario,
      loading: false,
    });
  };

  const paginatedUsuarios = () => {
    const start = (current - 1) * pageSize;
    return usuariosFiltrados.slice(start, start + pageSize);
  };

  return (
    <div className={styles.pageContainer}>
      <Navigation />
      <div className={styles.container}>
        <Header filtro={filtro} setFiltro={setFiltro} onFiltrar={onFiltrar} />
        <ToastContainer />
        <div className={styles.usuariosContainer}>
          {loading ? (
            <Loader />
          ) : (
            <div className={styles.usuariosGrid}>
              {paginatedUsuarios().map((usuario, idx) => (
                <div
                  className={styles.usuarioWrapper}
                  key={usuario.id_usuario ?? idx}
                >
                  <CardUsuario
                    usuario={usuario}
                    onClick={() => openModal(usuario)}
                  />
                </div>
              ))}
            </div>
          )}
          <Pagination
            className={styles.pagination}
            current={current}
            pageSize={pageSize}
            total={usuariosFiltrados.length}
            onChange={(page, pageSize) => {
              setCurrent(page);
              setPageSize(pageSize);
            }}
            showSizeChanger
            pageSizeOptions={[5, 10, 20, 50]}
          />
        </div>
        <Modal
          title={`Perfil de ${modalInfo.usuario?.nome}`}
          open={modalInfo.visible}
          onCancel={() =>
            setModalInfo({ visible: false, usuario: null, loading: false })
          }
          onOk={() =>
            setModalInfo({ visible: false, usuario: null, loading: false })
          }
          width={800}
        >
          {modalInfo.loading ? (
            <Skeleton active />
          ) : modalInfo.usuario ? (
            <div>
              <p>
                <strong>Username:</strong> {modalInfo.usuario.username}
              </p>
              <p>
                <strong>Email:</strong> {modalInfo.usuario.email}
              </p>
              <p>
                <strong>Tipo de Conta:</strong> {modalInfo.usuario.tipo_conta}
              </p>
              <p>
                <strong>Descrição:</strong> {modalInfo.usuario.descricao}
              </p>
              <p>
                <strong>Especializações:</strong>{" "}
                {modalInfo.usuario.especializacoes}
              </p>
              <p>
                <strong>Foto de Perfil:</strong>
              </p>
              <div style={{ marginTop: "1rem" }}>
                {modalInfo.usuario.foto_perfil ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/${modalInfo.usuario.foto_perfil}`}
                    alt="Foto de Perfil"
                    width={120}
                    height={120}
                  />
                ) : (
                  <p style={{ color: "#999" }}>Não tem foto</p>
                )}
              </div>
            </div>
          ) : (
            <p>Usuário não encontrado.</p>
          )}
        </Modal>
      </div>
    </div>
  );
}
