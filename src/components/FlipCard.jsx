import React from "react";
import styles from "@/styles/FlipCard.module.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function FlipCard({
  frontImage,
  backTitle,
  backText1,
  backText2,
  github,
  linkedin,
  email,
}) {
  return (
    <div className={styles.flipCard}>
      <div className={styles.flipCardInner}>
        <div className={styles.flipCardFront}>
          <img src={frontImage} alt={backTitle} className={styles.image} />
        </div>

        <div className={styles.flipCardBack}>
          <h3>{backTitle}</h3>
          <p>{backText1}</p>
          <p>{backText2}</p>
          <div className={styles.iconContainer}>
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer">
                <FaGithub className={styles.icon} />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className={styles.icon} />
              </a>
            )}
            {email && (
              <a href={email}>
                <FaEnvelope className={styles.icon} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}