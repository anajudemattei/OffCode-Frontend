"use client";

import styles from "./Duvidas.module.css";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import CardDuvidas from "@/components/CardDuvidas";

export default function Duvidas() {
    return (
        <div className={styles.duvidasContainer}>
            <Navigation />
            <div className={styles.duvidasContent}>
                <h1>Dúvidas</h1>
                <div className={styles.duvidasList}>
                    <CardDuvidas  username="User1" content="<div><h1>Hello World<h1></div>"  />
                    <CardDuvidas  username="User2" content="<div><h1>Hello World<h1></div>" />
                    <CardDuvidas  username="User3" content="<div><h1>Hello World<h1></div>"/>
                    <CardDuvidas  username="User4" content="<div><h1>Hello World<h1></div>"/>
                    <CardDuvidas  username="User5" content="<div><h1>Hello World<h1></div>"/>
                </div>
            </div> 
        </div>
    );

}