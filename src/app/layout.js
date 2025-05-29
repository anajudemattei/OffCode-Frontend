import React from "react";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "700"], 
  subsets: ["latin"],
  variable: "--font",
});

export const metadata = {
  title: "OffCode",
  description: "A solução para suas dúvidas de programação",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head />
      <body className={roboto.variable}>
        {children}
      </body>
    </html>
  );
}
