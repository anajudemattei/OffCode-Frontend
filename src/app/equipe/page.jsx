"use client";

import styles from "./equipe.module.css";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import FlipCard from "@/components/FlipCard";

export default function Equipe() {
    const equipe = [
        {
            nome: "Ana Carolina",
            cargo: "Scrum Master",
            imagem: "/images/anaCard.png",
            github: "https://github.com/AnaCarolinaFreitas",
            linkedin: "https://www.linkedin.com/in/ana-carolina-garcia-freitas-4907b52b1/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            email: "mailto:ana.c.freitas35@aluno.senai.br"
        },
        {
            nome: "Ana Julia",
            cargo: "Desenvolvedora",
            imagem: "/images/anajuCard.png",
            github: "https://github.com/anajudemattei",
            linkedin: "https://www.linkedin.com/in/ana-julia-pinheiro-demattei-b40929368/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            email: "mailto:ana.demattei@aluno.senai.br"
        },
        {
            nome: "Bernardo",
            cargo: "Desenvolvedor",
            imagem: "/images/bernardoCard.png",
            github: "https://github.com/Bernardo1401",
            linkedin: "https://www.linkedin.com/in/bernardo-gabriel-de-moraes-marques-146b222b1/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            email: "mailto:bernardo.g.marques@aluno.senai.br"
        },
        {
            nome: "Beatriz",
            cargo: "Desenvolvedora",
            imagem: "/images/biaCard.png",
            github: "https://github.com/beatriz",
            linkedin: "https://www.linkedin.com/in/beatriz-lima-74145430a/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            email: "mailto:beatriz.lima14@aluno.senai.br"
        },
        {
            nome: "Caio",
            cargo: "Desenvolvedor",
            imagem: "/images/caioCard.png",
            github: "https://github.com/CaioGabDev",
            linkedin: "https://www.linkedin.com/in/caio-lacerda-062b222b1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            email: "mailto:caio.g.silva20@aluno.senai.br"
        },
        {
            nome: "Luana",
            cargo: "Desenvolvedora",
            imagem: "/images/luanaCard.png",
            github: "https://github.com/domeneghettii",
            linkedin: "https://www.linkedin.com/in/luana-domeneghetti-827b1b2b1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
            email: "mailto:luana.domeneghetti@aluno.senai.br"
        }
    ];

    return (
        <div className={styles.pageContainer}>
            <div className={styles.navigation}>
                <Navigation />
            </div>
            <div className={styles.mainContent}>
                <div className={styles.headerWrapper}>
                    <Header />
                </div>
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
                            github={membro.github}
                            linkedin={membro.linkedin}
                            email={membro.email}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}