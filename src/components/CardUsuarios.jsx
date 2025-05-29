import { Card } from "antd";
import Image from "next/image";

export default function CardUsuarioImagem({ usuario, onClick }) {
    return (
        <Card
            hoverable
            onClick={onClick}
            style={{ marginBottom: 16 }}
            cover={
                usuario.foto_capa && usuario.foto_capa !== "NULL" && usuario.foto_capa !== "null" && usuario.foto_capa !== "" ? (
                    <Image
                        alt="Capa do usuário"
                        src={usuario.foto_capa}
                        width={500}
                        height={300}
                        style={{ objectFit: 'cover' }}
                    />
                ) : null
            }
        >
            <Card.Meta
                avatar={
                    usuario.foto_capa && usuario.foto_capa !== "NULL" && usuario.foto_capa !== "null" && usuario.foto_capa !== "" ? (
                        <Image
                            src={usuario.foto_capa}
                            alt="Foto de capa"
                            width={40}
                            height={40}
                            style={{ borderRadius: '50%' }}
                        />
                    ) : null
                }
                title={usuario.nome || "Nome não informado"}
                description={
                    <>
                        <div><strong>Username:</strong> {usuario.username}</div>
                        <div><strong>Tipo de Conta:</strong> {usuario.tipo_conta}</div>
                        {usuario.descricao && (
                            <div><strong>Descrição:</strong> {usuario.descricao}</div>
                        )}
                    </>
                }
            />
        </Card>
    );
}