"use client";

import styles from "./equipe.module.css";
import Navigation from "@/components/Navigation";
import Noticias from "@/components/Noticias";
import Image from "next/image";

export default function Equipe() {
    const equipe = [
        { nome: "Ana Carolina", cargo: "Scrum Master", imagem: "/images/user-icon.png" },
        { nome: "Ana Julia", cargo: "Desenvolvedora", imagem: "/images/user-icon.png" },
        { nome: "Bernardo", cargo: "Desenvolvedor", imagem: "/images/user-icon.png" },
        { nome: "Beatriz", cargo: "Desenvolvedora", imagem: "/images/user-icon.png" },
        { nome: "Caio", cargo: "Product Owner", imagem: "/images/user-icon.png" },
        { nome: "Luana", cargo: "Desenvolvedora", imagem: "/images/user-icon.png" },
    ];

    return (
        <div className={styles.pageContainer}>
            <Navigation />
            <div className={styles.equipeContainer}>
                <div className={styles.headerSection}>
                    <h1>Conheça Quem Está por Trás do Código</h1>
                    <p>
                        Nosso time de desenvolvedores une talento e inovação para transformar ideias em soluções digitais eficientes.
                    </p>
                </div>
                <div className={styles.cardsContainer}>
                    {equipe.map((membro, index) => (
                        <div className={styles.card} key={index}>
                            <Image
                                src={membro.imagem}
                                alt={membro.nome}
                                width={150}
                                height={150}
                                className={styles.cardImage}
                            />
                            <div className={styles.cardInfo}>
                                <h2>{membro.nome}</h2>
                                <p>{membro.cargo}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Noticias />
        </div>
    );
}