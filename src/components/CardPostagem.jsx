import Image from "next/image";
import styles from "../styles/CardPostagem.module.css";
import { Input, Skeleton } from "antd";

export default function CardPostagem({ post, onClick, usuario }) {
    return (
        <div 
            className={styles.cardContainer} 
            onClick={onClick} 
            style={{ cursor: "pointer", marginBottom: "16px", border: "1px solid #ddd", borderRadius: "8px", padding: "16px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
        >
            <div className={styles.cardHeader}>
                {usuario && (
                    <Image
                        alt="Avatar do usuário"
                        src={usuario.avatar || "/default-avatar.png"}
                        width={40}
                        height={40}
                        className={styles.avatar}
                    />
                )}
                <div className={styles.userInfo}>
                    <h2>{usuario?.username || "Usuário Desconhecido"}</h2>
                    <p><strong>Data:</strong> {post.data_publicacao}</p>
                </div>
            </div>
            <div className={styles.cardContent}>
                <h3>{post.conteudo_post || <Skeleton />}</h3>
                <p><strong>Conteúdo:</strong> {post.conteudo_post}</p>
            </div>
            {post.anexo && post.anexo !== "NULL" && post.anexo !== "null" && post.anexo !== "" && (
                <Image
                    alt="Imagem do post"
                    src={post.anexo}
                    width={500}
                    height={300}
                    className={styles.postImage}
                />
            )}

<div className={styles.cardFooter}>
                <button className={styles.likeButton} onClick={(e) => { e.stopPropagation(); console.log("Liked!"); }}>
                    <span className={styles.likeCount}>
                        {post.likes?.length || 0} Likes
                    </span>
                </button>
                <button className={styles.commentButton} onClick={(e) => { e.stopPropagation(); console.log("Comment clicked!"); }}>
                    <span className={styles.commentCount}>
                        {post.comentarios?.length || 0} Comentários
                    </span>
                </button>
                <button className={styles.saveButton} onClick={(e) => { e.stopPropagation(); console.log("Saved!"); }}>
                    Save
                </button>   
        </div>
        </div>
    );
}