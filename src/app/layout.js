import React from "react";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

const font = Roboto ({
  variable: "--font",
  subsets: ["latin"],
});

export const metadata = {
    title: "OffCode",
    icons: {
    icon: "",
  },
    description: "",

};

export default function RootLayout({ children }) {
    return (
        <html>
            <body className={font.variable}>
              <Header />
              <Navigation />
              {children}
              </body>
        </html>
    );
}
