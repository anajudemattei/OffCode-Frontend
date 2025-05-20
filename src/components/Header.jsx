import styles from "../styles/Header.module.css";
import Image from "next/image";

export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.logoContainer}>
                <Image src="/LogosOffCode.png" alt="OffCode Logo" width={40} height={40} />
                <div className={styles.logoText}>
                    <h1>OFF CODE</h1>
                    <p>A melhor rede para suas dúvidas e posts de código</p>
                </div>
            </div>

            <div className={styles.filters}>
                <button className={styles.filterButton}>Filtrar</button>
                <div className={styles.filtersActive}>
                    <span>Nome: Ana Luíza ✖️</span>
                    <span>Linguagens: CSS ✖️</span>
                </div>
            </div>

            <div className={styles.searchContainer}>
                <input type="text" placeholder="Pesquisar" className={styles.searchInput} />
            </div>
        </div>
    );
}