"use client";

import { useState } from "react";
import styles from "../styles/Header.module.css";
import Image from "next/image";

export default function Header() {
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [showSavedDropdown, setShowSavedDropdown] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("Todos");

    const filters = ["Todos", "Frontend", "Backend", "Mobile", "Fullstack"];
    const savedSearches = ["Busca Ana", "Busca CSS", "Busca JavaScript"];

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
                <div className={styles.dropdown}>
                    <button onClick={() => setShowFilterDropdown(!showFilterDropdown)} className={styles.filterButton}>
                        {selectedFilter} ▼
                    </button>
                    {showFilterDropdown && (
                        <div className={styles.dropdownContent}>
                            {filters.map((filter, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setSelectedFilter(filter);
                                        setShowFilterDropdown(false);
                                    }}
                                >
                                    {filter}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.dropdown}>
                    <button onClick={() => setShowSavedDropdown(!showSavedDropdown)} className={styles.filterButton}>
                        ⋮
                    </button>
                    {showSavedDropdown && (
                        <div className={styles.dropdownContent}>
                            <strong>Buscas Salvas</strong>
                            {savedSearches.map((search, index) => (
                                <div key={index}>{search}</div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.searchContainer}>
                <input type="text" placeholder="Pesquisar" className={styles.searchInput} />
            </div>
        </div>
    );
}
