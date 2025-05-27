import Image from "next/image";
import styles from "../styles/CardPostagem.module.css";
import { useState } from "react";
import { Skeleton } from "antd";
import axios from "axios";
import { Modal } from "antd";

export default function CardPostagem({ post, onClick, usuario }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState({
    visible: false,
    post: null,
    comentario: null,
    loading: false,
  });


    const handleImageError = (e) => {
        e.target.src = "/500x300.svg";
    };

    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openModal = async (post) => {
    setModalInfo({
      visible: true,
      post: post,
      comentario: null,
      loading: true,
    });
    try {
      const { data: comentario } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${post.id}`,
        { headers: headers }
      );
      setModalInfo((m) => ({ ...m, comentario, loading: false }));
    } catch (error) {
      toast.error("Erro ao carregar os comentários.");
      setModalInfo((m) => ({ ...m, loading: false }));
    }
  };

    return (
        <>
            <div 
                className={styles.cardContainer}
                style={{ cursor: "pointer", marginBottom: "16px", border: "1px solid #ddd", borderRadius: "8px", padding: "16px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
                onClick={() => !isModalOpen && onClick?.()}
            >
                <div className={styles.cardHeader}>
                    {usuario && (
                        <Image
                            alt="Avatar do usuário"
                            src={usuario.avatar || "/default-profile.png"}
                            width={40}
                            height={40}
                            className={styles.avatar}
                            onError={handleImageError}
                        />
                    )}
                    <div className={styles.userInfo}>
                        <h2>{usuario?.username || "Usuário Desconhecido"}</h2>
                        <p><strong>Data:</strong> {post.data_publicacao}</p>
                    </div>
                </div>

                <div className={styles.cardContent}>
                    <h3>{post.conteudo_post || <Skeleton />}</h3>
                </div>

                {post.anexo && post.anexo !== "NULL" && post.anexo !== "null" && post.anexo !== "" && (
                    <Image
                        alt="Imagem do post"
                        src={post.anexo}
                        width={500}
                        height={300}
                        className={styles.postImage}
                        onClick={handleImageClick}
                        onError={handleImageError}
                    />
                )}

                <div className={styles.cardFooter}>
                    <button className={styles.likeButton}>
                        <Image
                            alt="Ícone de curtir"
                            src="/images/coracao.png"
                            width={24}
                            height={24}
                            className={styles.likeIcon}
                        />
                        <span className={styles.likeCount}>
                            onClick={() => {
                                {post.likes ? post.likes : 0}
                            }
                        </span>
                    </button>
                    <button
    className={styles.commentButton}
    onClick={(e) => {
        e.stopPropagation(); // evita abrir o modal da imagem/card
        openModal(post);
    }}
>
    Comentários
</button>
                    <button className={styles.saveButton}>Save</button>
                </div>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <img
                        src={post.anexo}
                        alt="Imagem ampliada"
                        className={styles.expandedImage}
                    />
                </div>
            )}

            <Modal
        title={`Comentários de ${modalInfo.comentario?.data_publicacao}`}
        open={modalInfo.visible}
        onCancel={() =>
          setModalInfo({
            visible: false,
            post: null,
            comentario: null,
            loading: false,
          })
        }
        onOk={() =>
          setModalInfo({
            visible: false,
            post: null,
            comentario: null,
            loading: false,
          })
        }
        width={800}
      >
        {modalInfo.loading ? (
          <Skeleton active />
        ) : modalInfo.comentario ? (
          <div>
            <p>
              <strong>Comentário:</strong>{" "}
              {modalInfo.comentario.conteudo_comentario}
            </p>
            <p>
              <strong>Imagem:</strong> {modalInfo.comentario.anexo}
            </p>
          </div>
        ) : (
          <p>Nenhum comentário encontrado.</p>
        )}
      </Modal>
        </>
    );
}
