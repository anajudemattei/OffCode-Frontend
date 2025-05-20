import styles from "../styles/NavigationText.module.css";
import Image from "next/image";

export default function NavigationText({text, src}) {
    return (
        <div className={styles.navText}>
            <Image 
            src={src}
            alt="icon"
            className={styles.image}
            width={20} 
            height={20}  
            />
            <p className={styles.text}>{text}</p>
        </div>
    );
}