import styles from "../styles/Navigation.module.css";
import NavigationText from "./NavigationText"
import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  return (
    <div className={styles.feedNavigation}>
      <Image 
      className={styles.image} 
      src="/images/LogosOffCode.png" 
      width={50} 
      height={50}
      alt="profile image"
      priority />
      <nav className={styles.navigation}>
        <ul>
         <Link href="/feed"> <NavigationText text="Feed" src="/images/feed-icon.png" /> </Link>
         <Link href="/duvidas"><NavigationText text="Dúvidas" src="/images/duvidas.png"/> </Link>
         <Link href="/perfis"> <NavigationText text="Perfis" src="/images/profiles.png"/> </Link>
         <Link href="/equipe"> <NavigationText text="Equipe" src="/images/equipe.png"/> </Link>
        </ul>
        </nav>
    </div>
  );
}