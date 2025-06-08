"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "antd";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Navigation from "@/components/Navigation";
import { ToastContainer, toast } from "react-toastify";
import CardDuvida from "@/components/CardDuvidas";
import Noticias from "@/components/Noticias";
import styles from "./Duvidas.module.css";

const headers = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Duvidas() {
  const [duvidas, setDuvidas] = useState([]);
  const [duvidasFiltradas, setDuvidasFiltradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchDuvidas = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/duvidas`,
          { headers }
        );
        setDuvidas(response.data);
        setDuvidasFiltradas(response.data);
      } catch (error) {
        toast.error("Erro ao carregar dúvidas.");
      }
      setLoading(false);
    };
    fetchDuvidas();
  }, []);

  const onFiltrar = () => {
    const filtroLower = filtro.trim().toLowerCase();

    if (!filtroLower) {
      setDuvidasFiltradas(duvidas);
      setCurrent(1);
      return;
    }

    const filtrados = duvidas.filter((d) =>
      d.conteudo_duvida?.toLowerCase().includes(filtroLower)
    );

    if (filtrados.length === 0) {
      toast.error("Nenhum resultado encontrado.");
    }

    setDuvidasFiltradas(filtrados);
    setCurrent(1);
  };

  const paginatedDuvidas = () => {
    const start = (current - 1) * pageSize;
    return duvidasFiltradas.slice(start, start + pageSize);
  };

  return (
    <div className={styles.pageContainer}>
      <Navigation />
      <div className={styles.duvidasColumn}>
        <Header filtro={filtro} setFiltro={setFiltro} onFiltrar={onFiltrar} />
        <ToastContainer />
        <div className={styles.duvidas}>
          {loading ? (
            <Loader />
          ) : (
            <div className="duvidas-list">
              {paginatedDuvidas().map((duvida, idx) => (
                <CardDuvida
                  key={duvida.id_duvida ?? idx}
                  duvida={duvida}
                  usuario={{
                    username: duvida.usuario_nome,
                    foto_perfil: `${process.env.NEXT_PUBLIC_IMG_URL}/${duvida.foto_perfil}`,
                  }}
                />
              ))}

              <Pagination
                className={styles.pagination}
                current={current}
                pageSize={pageSize}
                total={duvidasFiltradas.length}
                onChange={(page, pageSize) => {
                  setCurrent(page);
                  setPageSize(pageSize);
                }}
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
