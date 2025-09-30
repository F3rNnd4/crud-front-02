"use client";
import { useState } from "react";
import axios from "axios";
import styles from './put.module.css';

export default function PutPage() {
  const [commentID, setCommentID] = useState("");
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const buscarComentario = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://jsonplaceholder.typicode.com/comments/${commentID}`
      );
      setForm({ name: data.name, email: data.email, body: data.body });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const editarComentario = async () => {
    setLoading(true);
    try {
      await axios.put(
        `http://jsonplaceholder.typicode.com/comments/${commentID}`,
        form
      );
      setSuccess(true);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Editar Comentário</h1>

      <div className={styles.searchSection}>
        <input
          className={styles.input}
          type="number"
          value={commentID}
          onChange={(e) => setCommentID(e.target.value)}
          placeholder="ID do comentário"
        />

        <button 
          className={`${styles.button} ${styles.searchButton}`} 
          onClick={buscarComentario} 
          disabled={loading}
        >
          {loading ? "Buscando..." : "Buscar Comentário"}
        </button>
      </div>

      {form.name && (
        <div className={styles.editSection}>
          <h2 className={styles.subtitle}>Editar Detalhes do Comentário</h2>
          <div className={styles.formGroup}>
            <input
              className={styles.input}
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Escreva seu nome"
            />
          </div>
          <div className={styles.formGroup}>
            <input
              className={styles.input}
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Digite seu email"
            />
          </div>
          <div className={styles.formGroup}>
            <textarea
              className={styles.textarea}
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              placeholder="Escreva seu comentário"
              rows={3}
            />
          </div>
          <button
            className={`${styles.button} ${styles.saveButton}`}
            onClick={editarComentario}
            disabled={loading || !form.name?.trim()}
          >
            {loading ? "Editando..." : "Salvar Alterações"}
          </button>
        </div>
      )}

      {error && <p className={styles.errorMessage}>Ocorreu um erro. Tente novamente.</p>}
      {success && <p className={styles.successMessage}>Comentário editado com sucesso!</p>}
    </div>
  );
}
