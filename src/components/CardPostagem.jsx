import { Card } from "antd";
import Image from "next/image";

export default function CardPostagem({ post, onClick }) {
    return (
        <Card
            hoverable
            onClick={onClick}
            style={{ marginBottom: 16 }}
            cover={
                post.anexo && post.anexo !== "NULL" && post.anexo !== "null" && post.anexo !== "" ? (
                    <Image
                        alt="Imagem do post"
                        src={post.anexo}
                        width={500}
                        height={300}
                        className="post-image"
                    />
                ) : null
            }
        >
            <Card.Meta
                title={post.conteudo_post || "Sem título"}
                description={
                    <>
                        <div><strong>Data:</strong> {post.data_publicacao}</div>
                        <div><strong>Conteúdo:</strong> {post.conteudo_post}</div>
                    </>
                }
            />
        </Card>
    )
}