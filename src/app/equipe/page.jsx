"use client";

import FlipCard from "@/components/FlipCard";
import styles from "./Equipe.module.css";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

const membros = [
  {
    frontImage: "/images/membro1.png",
    backTitle: "Ana Carolina",
    backText1: "Scrum Master",
    github: "https://github.com/AnaCarolinaFreitas",
    linkedin: "https://linkedin.com/in/",
    email: "mailto:@email.com",
  },
  {
    frontImage: "/images/membro2.png",
    backTitle: "Ana Julia",
    backText1: "Desenvolvedora",
    github: "https://github.com/anajudemattei",
    linkedin: "https://linkedin.com/in/anajudemattei",
    email: "mailto:ana.demattei@aluno.senai.br",
  },
  {
    frontImage: "/images/membro3.png",
    backTitle: "Beatriz",
    backText1: "Desenvolvedora",
    github: "https://github.com/limabea23",
    linkedin: "https://linkedin.com/in/",
    email: "mailto:@email.com",
  },
  {
    frontImage: "/images/membro4.png",
    backTitle: "Bernardo",
    backText1: "Desenvolvedor",
    github: "https://github.com/Bernardo1401",
    linkedin: "https://linkedin.com/in/",
    email: "mailto:@email.com",
  },
  {
    frontImage: "/images/membro5.png",
    backTitle: "Caio",
    backText1: "Product Owner",
    github: "https://github.com/CaioGabDev",
    linkedin: "https://linkedin.com/in/",
    email: "mailto:@email.com",
  },
  {
    frontImage: "/images/membro6.png",
    backTitle: "Luana",
    backText1: "Desenvolvedora",
    github: "https://github.com/domeneghettii",
    linkedin: "https://linkedin.com/in/",
    email: "mailto:@email.com",
  },
];

export default function EquipePage() {
  return (
    <>
  <Header />
  <div className={styles.pageContainer}>
    <Navigation />
    <div className={styles.cardsContainer}>
      {membros.map((membro, index) => (
        <FlipCard key={index} {...membro} />
      ))}
    </div>
  </div>
</>
  );
}