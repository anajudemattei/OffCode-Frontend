import styles from '../styles/Noticias.module.css';

const Noticias = () => {

  const noticias = [
    {
      img: '/images/RealidadeAumentada.png',
      texto: 'Realidade aumentada e virtual: O futuro do brincar',
      link: 'https://weco.org.br/p/realidade-aumentada-e-virtual-o-futuro-do-brincar'
    },
    {
      img: '/images/Futuro.png',
      texto: 'Tendências e o que esperar para o futuro',
      link: 'https://www.cnnbrasil.com.br/tecnologia/novas-tecnologias/'
    },
    {
      img: '/images/IA.png',
      texto: 'Como a IA está transformando o desenvolvimento de software e auxiliando programadores',
      link: 'https://g1.globo.com/pb/paraiba/especial-publicitario/hostdime/noticia/2025/05/21/como-a-ia-esta-transformando-o-desenvolvimento-de-software-e-auxiliando-programadores.ghtml'
    },
    {
      img: '/images/NovaIA.png',
      texto: 'Nova IA busca otimizar TI e o desenvolvimento de software',
      link: 'https://www.terra.com.br/noticias/nova-ia-busca-otimizar-ti-e-o-desenvolvimento-de-software,b9ccf6b5b0bee392313d91e3d8f49007r8o2afoj.html?utm_source=clipboard'
    },
    {
      img: '/images/estudar.png',
      texto: 'Ainda vale a pena estudar Análise e Desenvolvimento de Sistemas em 2025?',
      link: 'https://g1.globo.com/pr/parana/especial-publicitario/uniopet/opet-inovacao-em-rede/noticia/2025/02/17/ainda-vale-a-pena-estudar-analise-e-desenvolvimento-de-sistemas-em-2025.ghtml'
    },
    {
      img: '/images/software.png',
      texto: 'O impacto da inteligência artificial na carreira de engenheiros de software',
      link: 'https://g1.globo.com/pr/parana/especial-publicitario/uniopet/opet-inovacao-em-rede/noticia/2024/10/04/o-impacto-da-inteligencia-artificial-na-carreira-de-engenheiros-de-software.ghtml'
    },
    {
      img: '/images/copilot.png',
      texto: 'HP adota GitHub Copilot e aumenta a inovação e a velocidade do software',
      link: 'https://news.microsoft.com/pt-br/hp-adota-github-copilot-e-aumenta-a-inovacao-e-a-velocidade-do-software/'
    },
    {
      img: '/images/brasil.png',
      texto: 'Brasil se destaca no mercado de desenvolvimento de software',
      link: 'https://www.terra.com.br/noticias/brasil-se-destaca-no-mercado-de-desenvolvimento-de-software,c071b83faf4a81ff09e7e1bfeba0b77fvevr8if4.html?utm_source=clipboard'
    },
    {
      img: '/images/projeto.png',
      texto: 'Projeto regulamenta uso da inteligência artificial no Brasil',
      link: 'https://www.camara.leg.br/noticias/1159193-projeto-regulamenta-uso-da-inteligencia-artificial-no-brasil/'
    }
  ];


  return (
    <div className={styles.sidebar}>
      <h2>NOTÍCIAS</h2>
      <div className={styles.newsContainer}>
        {noticias.map((noticia, index) => (
          <div key={index} className={styles.newsCard}>
            <img src={noticia.img} alt="Notícia" className={styles.newsImage} />
            <p>
              <a href={noticia.link} target="_blank" rel="noopener noreferrer" className={styles.newsLink}>
                {noticia.texto}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Noticias;
