import styles from "../styles/Header.module.css";

export default function Header({ filtro, setFiltro, onFiltrar }) {
  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <img
          src="/images/OffCode2.png"
          alt="OffCode Logo"
          width={300}
          height={100}
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="🔎     Pesquisar"
          className={styles.searchInput}
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onFiltrar();
          }}
        />
        <button className={styles.filterButton} onClick={onFiltrar}>
          Filtrar
        </button>
      </div>
    </div>
  );
}
