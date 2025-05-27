import styles from "../styles/FlipCard.module.css";

export default function FlipCard({ frontImage, backTitle, backText1, backText2 }) {
    return (
        <div className={styles.flipCard}>
            <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront}>
                    <img src={frontImage} alt="Avatar" className={styles.cardImage} />
                </div>
                <div className={styles.flipCardBack}>
                    <h1>{backTitle}</h1>
                    <p>{backText1}</p>
                    <p>{backText2}</p>
                </div>
            </div>
        </div>
    );
}
