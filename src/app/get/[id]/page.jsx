"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import styles from "./[id].module.css";

export default function GetByIdPage() {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState([]);
  const [error, setError] = useState(false);

  const params = useParams();
  const commentId = params.id;

  const buscarComment = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments/${commentId}`
      );
      setComment(response.data);
    } catch (error) {
      setError(true);
      console.error("Erro ao buscar comentário:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarComment();
  }, [commentId]);

  if (loading) return <div className={styles.container}>Carregando...</div>;
  if (error) return <div className={styles.container}>Erro ao buscar comentário</div>;
  if (!comment) return <div className={styles.container}>Comentário não encontrado</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comentário #{comment.id}</h1>
      <hr className={styles.separator} />
      <p className={styles.text}>Nome: {comment.name}</p>
      <p className={styles.text}>Email: {comment.email}</p>
      <p className={styles.footer}>Comentário: {comment.body}</p>

      <button className={styles.backButton} onClick={() => window.history.back()}>
        Voltar
      </button>
    </div>
  );
}