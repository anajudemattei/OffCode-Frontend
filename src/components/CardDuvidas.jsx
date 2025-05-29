import { Card } from "antd";
import Image from "next/image";
import styles from "../styles/CardDuvidas.module.css"

export default function Cardduvidaagem({ duvida, onClick }) {
    return (
        <div className={styles.cardContainer}>
        <Card
            hoverable
            onClick={onClick}
            style={{ marginBottom: 16 }}
            cover={
                duvida.anexo && duvida.anexo !== "NULL" && duvida.anexo !== "null" && duvida.anexo !== "" ? (
                    <Image
                        alt="Imagem do duvida"
                        src={duvida.anexo}
                        width={500}
                        height={300}
                        className="duvida-image"
                    />
                ) : null
            }
        >
            <Card.Meta
                title={duvida.conteudo_duvida || "Sem título"}
                description={
                    <>
                        <div><strong>Data:</strong> {duvida.data_publicacao}</div>
                        <div><strong>Conteúdo:</strong> {duvida.conteudo_duvida}</div>
                    </>
                }
            />
        </Card>
        </div>
    )
}