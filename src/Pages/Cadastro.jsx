import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Cadastro.module.css";

import { Context } from "../context/UserContext";

const Cadastro = () => {
  const [usuario, setUsuario] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { cadastrar } = useContext(Context);
  const erro = useRef();
  const erroNome = useRef();
  const erroSenha = useRef();

  function handleChange(e) {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!usuario.name) {
      erroNome.current.style.display = "block";
      setTimeout(() => {
        erroNome.current.style.display = "none";
      }, 3000);
      return;
    } else if (!usuario.email.includes("@") || !usuario.email.includes(".")) {
      erro.current.style.display = "block";
      setTimeout(() => {
        erro.current.style.display = "none";
      }, 3000);
      return;
    } else if (usuario.password.length < 8) {
      erroSenha.current.style.display = "block";
      setTimeout(() => {
        erroSenha.current.style.display = "none";
      }, 3000);
      return;
    } else {
      cadastrar(usuario);
      limpar();
    }

    try {
      cadastrar(usuario);
      limpar();
    } catch (error) {
      const mensagem = error.response.error;
      console.log(mensagem);
    }
  }

  function limpar() {
    setUsuario({
      name: "",
      email: "",
      password: "",
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.container_form}>
        <div className={styles.content}>
          <div className={styles.titulo}>
            <h1>Cadastre sua conta.</h1>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nome"
              name="name"
              onChange={handleChange}
              value={usuario.name || ""}
            />

            <input
              type="text"
              placeholder="E-mail"
              name="email"
              onChange={handleChange}
              value={usuario.email || ""}
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={usuario.password}
            />

            <span ref={erro} className={styles.erro}>
              Digite um email válido
            </span>
            <span ref={erroNome} className={styles.erroNome}>
              O nome é obrigatório
            </span>
            <span ref={erroSenha} className={styles.erroSenha}>
              A senha precisa ter pelo menos 8 dígitos
            </span>

            <input
              className={styles.btn_submit}
              type="submit"
              value="Sign Up"
            />

            <Link to="/login" className={styles.link}>
              <p>Voltar para login</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
