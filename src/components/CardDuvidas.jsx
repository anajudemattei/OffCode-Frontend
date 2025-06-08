import Image from "next/image";
import styles from "../styles/CardPostagem.module.css";
import { useState } from "react";
import { Skeleton, Modal } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

export default function CardDuvida({ duvida, onClick }) {
  const headers = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };
  const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(duvida.likes || 0);
  const [saved, setSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    visible: false,
    duvida: null,
    comentario: null,
    loading: false,
  });

  const avatarSrc = duvida.foto_perfil
    ? `${IMG_URL}/${duvida.foto_perfil}`
    : "/images/default-profile.png";

  const handleImageClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openModal = async (duvida) => {
    setModalInfo({ visible: true, duvida, comentario: null, loading: true });
    try {
      const { data: comentarios } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/user/${duvida.id_duvida}`,
        { headers }
      );
      setModalInfo((m) => ({ ...m, comentario: comentarios, loading: false }));
    } catch (error) {
      toast.error("Erro ao carregar os comentários.");
      setModalInfo((m) => ({ ...m, loading: false }));
    }
  };

  return (
    <>
      <div
        className={styles.cardContainer}
        style={{
          marginBottom: "16px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "16px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
        onClick={() => !isModalOpen && onClick?.()}
      >
        <div className={styles.cardHeader}>
          <Image
            alt="Avatar do usuário"
            src={avatarSrc}
            width={40}
            height={40}
            className={styles.avatar}
            onError={(e) => (e.target.src = "/images/default-profile.png")}
          />
          <div className={styles.userInfo}>
            <h2>{duvida.usuario_nome || "Usuário Desconhecido"}</h2>
            <p>
              <strong>Data:</strong>{" "}
              {new Date(duvida.data_publicacao).toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>

        <div className={styles.cardContent}>
          <h3>{duvida.conteudo_duvida || <Skeleton />}</h3>
        </div>

        {duvida.anexo && duvida.anexo.toLowerCase() !== "null" && (
          <Image
            alt="Imagem da dúvida"
            src={duvida.anexo}
            width={500}
            height={300}
            className={styles.duvidaImage}
            onClick={handleImageClick}
            onError={(e) => (e.target.src = "/500x300.svg")}
          />
        )}

        <div className={styles.cardFooter}>
          <button
            className={styles.commentButton}
            onClick={() => openModal(duvida)}
            tabIndex={-1}
          >
            <Image
              alt="Comentar"
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
          >
            <Image
              alt="Salvar"
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
            src={duvida.anexo}
            alt="Imagem ampliada"
            className={styles.expandedImage}
          />
        </div>
      )}

      <Modal
        title="Comentários"
        open={modalInfo.visible}
        onCancel={() =>
          setModalInfo({
            visible: false,
            duvida: null,
            comentario: null,
            loading: false,
          })
        }
        onOk={() =>
          setModalInfo({
            visible: false,
            duvida: null,
            comentario: null,
            loading: false,
          })
        }
        width={800}
      >
        {modalInfo.loading ? (
          <Skeleton active />
        ) : modalInfo.comentario && modalInfo.comentario.length > 0 ? (
          modalInfo.comentario.map((c, i) => (
            <div
              key={i}
              style={{
                marginBottom: "16px",
                borderBottom: "1px solid #eee",
                paddingBottom: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <Image
                  src={
                    c.foto_perfil
                      ? `${IMG_URL}/${c.foto_perfil}`
                      : "/images/default-profile.png"
                  }
                  alt="Foto do autor"
                  width={30}
                  height={30}
                  style={{ borderRadius: "50%", marginRight: "8px" }}
                />
                <strong>{c.username || "Autor desconhecido"}</strong>
              </div>
              <p>{c.conteudo_comentario}</p>
              {c.anexo && (
                <img
                  src={`${IMG_URL}/${c.anexo}`}
                  alt="Anexo"
                  style={{ maxWidth: "100%", marginTop: "8px" }}
                />
              )}
            </div>
          ))
        ) : (
          <p>Essa Postagem ainda não tem comentários.</p>
        )}
      </Modal>
    </>
  );
}
