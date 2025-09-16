"use client";
import { useState } from "react";
import axios from "axios";
import styles from "./post.module.css";

export default function PostPage() {
  const [loading, setLoading] = useState(false);
  const [addedComment, setAddedComment] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    body: "",
  });
  const [error, setError] = useState(false);

  const criarNovoComment = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/comments",
        {
          name: form.name.trim(),
          email: form.email.trim(),
          body: form.body.trim(),
        }
      );
      setAddedComment([response.data, ...addedComment]);
      setForm({ name: "", email: "", body: "" });
    } catch (error) {
      setError(true);
      console.error("Erro ao criar comentários:", error);
    } finally {
      setLoading(false);
    }
  };

  const atualizarForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Criar Comentários</h1>

      <div className={styles.form}>
        <input
          type="text"
          name="name"
          className={styles.input}
          placeholder="Adicione seu nome"
          value={form.name}
          onChange={atualizarForm}
          required
        />
        <input
          type="email"
          name="email"
          className={styles.input}
          placeholder="Adicione seu email"
          value={form.email}
          onChange={atualizarForm}
        />
        <textarea
          name="body"
          className={styles.textarea}
          placeholder="Digite seu comentário"
          value={form.body}
          onChange={atualizarForm}
          rows={4}
          required
        />
        <button
          className={styles.button}
          onClick={criarNovoComment}
          disabled={!form.name.trim() || loading}
        >
          {loading ? "Enviando..." : "Enviar Comentário"}
        </button>
      </div>

      {error && <p className={styles.error}>Erro ao criar comentário. Tente novamente.</p>}

      <h2 className={styles.subtitle}>Comentários Criados</h2>
      <ul className={styles.commentList}>
        {addedComment.map((comment) => (
          <li key={comment.id} className={styles.commentItem}>
            <hr />
            <p>Nome: {comment.name}</p>
            <p>Email: {comment.email}</p>
            <p>Comentário: {comment.body}</p>
          </li>
        ))}
      </ul>

      <button className={styles.backButton} onClick={() => window.history.back()}>
        Voltar
      </button>
    </div>
  );
}