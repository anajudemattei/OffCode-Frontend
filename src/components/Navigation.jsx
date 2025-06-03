"use client";
import styles from "../styles/Navigation.module.css";
import NavigationText from "./NavigationText";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Ícone do menu hambúrguer */}
      <div className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      {/* Menu lateral */}
      <div className={`${styles.feedNavigation} ${menuOpen ? styles.showMenu : ""}`}>
        <Image
          className={styles.image}
          src="/images/LogosOffCode.png"
          width={50}
          height={50}
          alt="profile image"
          priority
        />
        <nav className={styles.navigation}>
          <ul>
            <Link href="/feed"><NavigationText text="Feed" src="/images/feed-icon.png" /></Link>
            <Link href="/duvidas"><NavigationText text="Dúvidas" src="/images/duvidas.png" /></Link>
            <Link href="/perfis"><NavigationText text="Perfis" src="/images/profiles.png" /></Link>
            <Link href="/equipe"><NavigationText text="Equipe" src="/images/equipe.png" /></Link>
          </ul>
        </nav>
      </div>
    </>
  );
}
