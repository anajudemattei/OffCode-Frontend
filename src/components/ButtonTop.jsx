import { useEffect, useState } from "react";
import styles from "../styles/ButtonTop.module.css";

export default function ButtonTop({ onClick }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 100; 
      setVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      className={styles.button}
      aria-label="Subir ao topo"
      title="Subir ao topo"
      role="button"
      tabIndex={0}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}