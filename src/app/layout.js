import React from "react";
import { Roboto } from "next/font/google";
import "./globals.css";

const font = Roboto ({
  variable: "--font",
  subsets: ["latin"],
});

export const metadata = {
    title: "<escreva o nome para aparecer na aba do navegador>",
    icons: {
    icon: "/icons/favicon.ico",
  },
    description: "Projeto pra mostrar tudo que eu sei",

};

export default function RootLayout({ children }) {
    return (
        <html>
            <body className={font.variable}>{children}</body>
        </html>
    );
}
