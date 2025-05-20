"use client";

import styles from "./feed.module.css";
import Navigation from "@/components/Navigation";
import { CardPostagem } from "@/components/CardPostagem"; 
import Noticias from "@/components/Noticias";
import { useEffect, useState } from "react";
import axios from 'axios';
import Loader from "@/components/Loader";
import Header from "@/components/Header";


export default function Feed() {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [allPosts, setAllPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    

    const fetchPosts = async (post_id = "") => {
        setIsLoading(true);
        try{
            const url = post_id
            ? `http://localhost:4000/api/post/${post_id}`
            : "http://localhost:4000/api/post";
            const response = await axios.get(url);
            setPosts(response.data);
            if (!post_id) {
                setAllPosts(response.data);
            }
        } catch (error) {
            console.error("Erro ao carregar posts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
    const fetchComCache = async () => {
        const cacheKey = "postsData";
        const cache = sessionStorage.getItem(cacheKey);

        if (cache) {
            setPosts(JSON.parse(cache));
            setIsLoading(false);
            return;
        }

        try {
            console.log("API Key usada:", apiKey); 
            const response = await axios.get("http://localhost:4000/api/post", {
                headers: {
                    "x-api-key": apiKey 
                }
            });
            setPosts(response.data);
            sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
        } catch (error) {
            console.error("Erro ao carregar os posts:", error);
            alert("Erro ao carregar os posts.");
        } finally {
            setIsLoading(false);
        }
    };

    fetchComCache();
}, []);

    return (
        <div className={styles.pageContainer}>
            <Navigation />
            <div className={styles.mainContent}>
                <div className={styles.feedContent}>
                    {isLoading ? (
                        <Loader />
                    ): (
                        posts.map((post, index) => (
                            <CardPostagem key={post.id || index} usuarios={post.usuarios} posts={post.posts} />  
                        ))
                    )}
                </div>
            </div>
            <Noticias />
        </div>
    );
}