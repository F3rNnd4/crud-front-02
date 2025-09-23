"use client";

import axios from "axios";
import { useState } from "react";
import styles from "./delete.module.css"; // Importando o CSS Module

export default function DeletePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [comment, setComment] = useState(null);
  const [commentId, setCommentId] = useState("");

  const buscarComentario = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${commentId}`
      );
      setComment(response.data);
      setError(false);
    } catch (error) {
      setError(true);
      console.error("Erro ao buscar comentário:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletarComentario = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${commentId}`
      );
      setSuccess(true);
      setComment(null);
      setCommentId("");
      setError(false);
    } catch (error) {
      setError(true);
      console.error("Erro ao deletar comentário:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Deletar Comentário</h1>

      <div>
        <input
          type="text"
          value={commentId}
          onChange={(e) => setCommentId(e.target.value)}
          placeholder="ID do comentário"
          className={styles.input}
        />

        <button
          onClick={buscarComentario}
          disabled={loading || !commentId}
          className={styles.button}
        >
          {loading ? "Buscando..." : "Buscar Comentário"}
        </button>
      </div>

      {comment && (
        <div className={styles.comment}>
          <h2>Comentário Encontrado: {comment.id}</h2>
          <p>Nome: {comment.name}</p>
          <p>Email: {comment.email}</p>
          <p>Comentário: {comment.body}</p>

          <button
            onClick={deletarComentario}
            disabled={loading}
            className={styles.button}
          >
            {loading ? "Deletando..." : "Deletar Comentário"}
          </button>
        </div>
      )}

      {error && (
        <p className={styles.errorMessage}>Ocorreu um erro. Tente novamente.</p>
      )}
      {success && (
        <p className={styles.successMessage}>
          Comentário deletado com sucesso!
        </p>
      )}
    </div>
  );
}
