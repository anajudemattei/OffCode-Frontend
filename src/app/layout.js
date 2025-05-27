import React from "react";
import { Roboto } from "next/font/google";
import "./globals.css";

const font = Roboto ({
  variable: "--font",
  subsets: ["latin"],
});

export const metadata = {
    title: "OffCode",
    icons: {
    icon: "/images/favicon.png",
  },
    description: "A solução para suas dúvidas de programação",

};

export default function RootLayout({ children }) {
    return (
        <html>
            <body className={font.variable}>
              {children}
              </body>
        </html>
    );
}
