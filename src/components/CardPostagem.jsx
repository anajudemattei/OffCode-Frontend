import { useState } from "react";
import Image from "next/image";
import styles from "../styles/CardPostagem.module.css";

export function CardPostagem({ usuarios, posts, onClick }) {
    const [likeIcon, setLikeIcon] = useState("/coracao.png");

    return (
        <div className={styles.cardPostagem} onClick={onClick}>
            <div className={styles.cardHeader}>
                {usuarios && usuarios.foto_perfil ? (
                    <Image
                        className={styles.image}
                        src={usuarios.foto_perfil}
                        width={50}
                        height={50}
                        alt="profile image"
                        priority
                    />
                ) : (
                    <p>Usuário desconhecido</p>
                )}
                <h2>{usuarios?.id_usuario || "ID não disponível"}</h2>
            </div>
            <div className={styles.cardContent}>
                {posts?.conteudo_post || "Conteúdo não disponível"}
                {posts?.anexo && (
                    <Image
                        className={styles.imagePost}
                        src={posts.anexo}
                        width={500}
                        height={500}
                        alt="post image"
                        priority
                    />
                )}
            </div>

            <div className={styles.line}></div>
            <div className={styles.cardFooter}>
                <button
                    className={styles.button}
                    onClick={() =>
                        setLikeIcon((prevIcon) =>
                            prevIcon === "/coracao.png" ? "/coracao-roxo.png" : "/coracao.png"
                        )
                    }
                >
                    <Image
                        className={styles.icon}
                        src={likeIcon}
                        width={20}
                        height={20}
                        alt="like icon"
                    />
                </button>
                <button className={styles.button}>
                    <Image
                        className={styles.icon}
                        src="/comente.png"
                        width={20}
                        height={20}
                        alt="comment icon"
                    />
                </button>
                <button className={styles.buttonSave}>
                    <Image
                        className={styles.icon}
                        src="/salvar.png"
                        width={20}
                        height={20}
                        alt="save icon"
                    />
                </button>
            </div>
        </div>
    );
}