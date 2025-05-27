import styles from '../styles/Noticias.module.css';

const Noticias = () => {
    const noticias = [
        {
            img: '/images/tecnologiaQuantica.jpg',
            texto: 'Tecnologia quântica é inovadora, mas os benefícios ainda são modestos'
        },
        {
            img: '/images/inteligenciaArtificial.jpg',
            texto: 'Avanços em inteligência artificial prometem transformar a indústria'
        },
        {
            img: '/images/entrevistaEmprego.jpg',
            texto: 'Como se preparar para entrevistas técnicas em grandes empresas'
        }
    ];

    return (
    <div className={styles.sidebar}>
        <h2>NOTÍCIAS</h2>
        <div className={styles.newsContainer}>
            {noticias.map((noticia, index) => (
                <div key={index} className={styles.newsCard}>
                    <img src={noticia.img} alt="Notícia" className={styles.newsImage} />
                    <p>{noticia.texto}</p>
                </div>
            ))}
        </div>
    </div>
);

};

export default Noticias;