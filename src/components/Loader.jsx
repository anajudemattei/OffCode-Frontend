import Image from "next/image";
import styles from "../styles/Loader.module.css";

export default function Loader() {
    return (
        <div className={styles.container}>
            <Image src="/loading.gif" alt="Loading..." width={300} height={300} priority unoptimized className={styles.image} />
            <h1 className={styles.message}>Loading ...</h1>
        </div>
    );
}