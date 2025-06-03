"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination, Modal, Card, Skeleton } from "antd";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Navigation from "@/components/Navigation";
import { ToastContainer, toast } from "react-toastify";
import CardDuvidas from "@/components/CardDuvidas";
import ButtonTop from "@/components/ButtonTop";
import Noticias from "@/components/Noticias";
import styles from "./Duvidas.module.css";

const headers = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Duvidas() {
  const [data, setData] = useState({
    duvidas: [],
    loading: true,
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchDuvidas = async () => {
      const cacheKey = "duvidasData";
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/duvidas`,
          { headers: headers }
        );
        setData({
          duvidas: response.data,
          loading: false,
          current: 1,
          pageSize: 10,
        });
      } catch (error) {
        console.error("Error fetching duvidas:", error);
        toast.error("Erro ao carregar os duvidas.");
        setData((d) => ({ ...d, loading: false }));
      }
    };
    fetchDuvidas();
  }, []);



  const paginatedDuvidas = () => {
    const start = (data.current - 1) * data.pageSize;
    return data.duvidas.slice(start, start + data.pageSize);
  };

  return (
    <div className={styles.pageContainer}>
      <Navigation />

      <div className={styles.duvidasColumn}>
      <Header />
      <ToastContainer />

      <div className={styles.duvidas}>
        <h1>Duvidas</h1>

{data.loading ? (
            <Loader />
          ) : (
            
<div className="duvidas-list">
              {paginatedDuvidas().map((duvida, idx) => (
                <CardDuvidas
                  key={duvida.id_post ?? idx}
                  duvida={duvida}
                  usuario={{
                    username: duvida.usuario_nome,
                    foto_perfil: `${process.env.NEXT_PUBLIC_IMG_URL}/${duvida.foto_perfil}`,
                  }}
                />
              ))}
              <Pagination
          className={styles.pagination}
          current={data.current}
          pageSize={data.pageSize}
          total={data.duvidas.length}
          onChange={(page, pageSize) =>
            setData({ ...data, current: page, pageSize })
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