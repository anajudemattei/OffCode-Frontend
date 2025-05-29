import Image from "next/image";
import styles from "../styles/CardPostagem.module.css";
import { useState } from "react";
import { Skeleton } from "antd";
import axios from "axios";
import { Modal } from "antd";
import { toast } from "react-toastify";

export default function CardPostagem({ post, onClick, usuario }) {
    const headers = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };
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
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${comentario.id_post}`,
        { headers: headers }
      );
      setModalInfo((m) => ({ ...m, comentario, loading: false }));
      console.log("Comentários carregados:", data);
    } catch (error) {
      toast.error("Erro ao carregar os comentários.");
      setModalInfo((m) => ({ ...m, loading: false }));
        console.error("Erro ao carregar os comentários:", error);
    }
  };

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes ? post.likes : 0);

    const handleLike = () => {
        if (!liked) {
            setLiked(true);
            setLikeCount(likeCount + 1);
        } else {
            setLiked(false);
            setLikeCount(likeCount - 1);
        }
    };

    const [saved, setSaved] = useState(false);

    return (
        <>
            <div 
                className={styles.cardContainer}
                style={{marginBottom: "16px", border: "1px solid #ddd", borderRadius: "8px", padding: "16px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
                onClick={() => !isModalOpen && onClick?.()}
            >
                <div className={styles.cardHeader}>
                    {usuario && (
                        <Image
                        alt="Avatar do usuário"
                        src={usuario.foto_perfil || "/images/default-profile.png"}
                        width={40}
                        height={40}
                        className={styles.avatar}
                      />
                    )}
                    <div className={styles.userInfo}>
                        <h2>{usuario.username || "Usuário Desconhecido"}</h2>
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
                    <button
                        className={styles.likeButton}
                        onClick={handleLike}
                        tabIndex={-1}
                        type="button"
                    >
                        <Image
                            alt="Ícone de curtir"
                            src={liked ? "/images/coracao-roxo.png" : "/images/coracao.png"}
                            width={24}
                            height={24}
                            className={styles.likeIcon}
                        />
                        <span className={styles.likeCount}>
                            {likeCount}
                        </span>
                    </button>
                    <button
                        className={styles.commentButton}
                        onClick={() => openModal(post)}
                        tabIndex={-1}
                        type="button"
                    >
                        <Image
                            alt="Ícone de comentário"
                            src="/images/comente.png"
                            width={24}
                            height={24}
                            className={styles.commentIcon}
                        />
                    </button>
                    <button
                        className={styles.saveButton}
                        onClick={() => setSaved((prev) => !prev)}
                        tabIndex={-1}
                        type="button"
                    >
                        <Image
                            alt="Ícone de salvar"
                            src={saved ? "/images/salvar-purple.png" : "/images/salvar.png"}
                            width={24}
                            height={24}
                            className={styles.saveIcon}
                        />
                    </button>
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
                title={`Comentários`}
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
                ) : Array.isArray(modalInfo.comentario) && modalInfo.comentario.length > 0 ? (
                    modalInfo.comentario.map((c, i) => (
                        <div key={i}>
                            <p><strong>Comentário:</strong> {c.conteudo_comentario}</p>
                            <p><strong>Imagem:</strong> {c.anexo}</p>
                        </div>
                    ))
                ) : (
                    <p>Nenhum comentário encontrado.</p>
                )}
            </Modal>
        </>
    );
}
