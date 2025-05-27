"use client";

import styles from "./equipe.module.css";
import Navigation from "@/components/Navigation";
import Noticias from "@/components/Noticias";
import Image from "next/image";
import FlipCard from "@/components/FlipCard";

export default function Equipe() {
    const equipe = [
        { nome: "Ana Carolina", cargo: "Scrum Master", imagem: "/images/luanaCard.png" },
        { nome: "Ana Julia", cargo: "Desenvolvedora", imagem: "/images/luanaCard.png" },
        { nome: "Bernardo", cargo: "Desenvolvedor", imagem: "/images/luanaCard.png" },
        { nome: "Beatriz", cargo: "Desenvolvedora", imagem: "/images/luanaCard.png" },
        { nome: "Caio", cargo: "Product Owner", imagem: "/images/luanaCard.png" },
        { nome: "Luana", cargo: "Desenvolvedora", imagem: "/images/luanaCard.png" },
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
                        <FlipCard
                            key={index}
                            frontImage={membro.imagem}
                            backTitle={membro.nome}
                            backText1={membro.cargo}
                            backText2="Parte da equipe OffCode"
                        />
                    ))}
                </div>
            </div>
            <Noticias />
        </div>
    );
}