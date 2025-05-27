"use client";


import styles from "./Perfis.module.css";
import Navigation from "@/components/Navigation";
import Noticias from "@/components/Noticias";


export default function Perfis() {
    return (
        <div className={styles.perfisContainer}>
            <Navigation />
            <p style={{ color: "#FFFFFF", padding: "2rem" }}></p>
            <Noticias />
        </div>
    )

}