import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "../styles/Header.module.css";
import { toast } from "react-toastify";

export default function Header() {
    const [data, setData] = useState({
        posts: [],
        loading: true,
        current: 1,
        pageSize: 10
    });

    const [filtro, setFiltro] = useState("");
    const [resultado, setResultado] = useState([]);
    const [mensagem, setMensagem] = useState("");

    const headers = {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/posts`,
                    { headers }
                );
                setData({
                    posts: response.data,
                    loading: false,
                    current: 1,
                    pageSize: 10
                });
            } catch (error) {
                console.error("Erro ao buscar posts:", error);
                toast.error("Erro ao carregar os posts.");
                setData((d) => ({ ...d, loading: false }));
            }
        };

        fetchPosts();
    }, []);

    const handleFiltrar = () => {
        if (!filtro.trim()) {
            setResultado([]);
            setMensagem("");
            return;
        }

        const filtrados = data.posts.filter(post => {
            const filtroLower = filtro.toLowerCase();
            return (
                post.nome?.toLowerCase().includes(filtroLower) ||
                post.linguagem?.toLowerCase().includes(filtroLower)
            );
        });

        setResultado(filtrados);

        if (filtrados.length === 0) {
            const msg = "Nenhum resultado encontrado.";
            setMensagem(msg);
            toast.error(msg); 
        } else {
            setMensagem("");
        }
    };

    return (
        <div className={styles.header}>
            <div className={styles.logoContainer}>
                <Image 
                    src="/images/OffCode2.png" 
                    alt="OffCode Logo" 
                    width={300} 
                    height={100} 
                    priority 
                />
            </div>

            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Filtre por nome ou linguagem 🔎"
                    className={styles.searchInput}
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
                <button className={styles.filterButton} onClick={handleFiltrar}>
                    Filtrar
                </button>

                <div className={styles.filtersActive}>
                    {mensagem && (
                        <span style={{ color: " #8C52FF", fontWeight: "bold" }}>
                            {mensagem}
                        </span>
                    )}

                    {resultado.map((item, index) => (
                        <span key={index}>
                            Nome: {item.nome}, Linguagem: {item.linguagem} ✖️
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
