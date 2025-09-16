"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./get.module.css";

export default function GetPage() {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);

  const router = useRouter();

  const buscarComments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      setComments(response.data);
    } catch (error) {
      setError(true);
      console.error("Erro ao buscar comentários:", error);
    } finally {
      setLoading(false);
    }
  };

  const navegarParaComentario = (commentId) => {
    router.push(`/get/${commentId}`);
  };

  useEffect(() => {
    buscarComments();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Comentários</h1>
      <h2 className={styles.subtitle}>Comentários ({comments.length})</h2>
      {loading ? (
        <p>Carregando comentários...</p>
      ) : (
        <ul className={styles.commentList}>
          {comments.map((comment) => (
            <li
              key={comment.id}
              className={styles.commentItem}
              onClick={() => navegarParaComentario(comment.id)}
            >
              <hr className={styles.separator} />
              <p className={styles.commentText}>ID: {comment.id}</p>
              <p className={styles.commentText}>Nome: {comment.name}</p>
              <p className={styles.commentText}>Email: {comment.email}</p>
              <p className={styles.commentFooter}>Comentário: {comment.body}</p>
            </li>
          ))}
        </ul>
      )}
      {error && <p>Erro ao buscar comentários</p>}
    </div>
  );
}