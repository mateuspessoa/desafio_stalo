import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Login.module.css";

import { Context } from "../context/UserContext";

const Login = () => {
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const { login, mensagemErro } = useContext(Context);

  function handleChange(e) {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    login(usuario);
    limpar();
  }

  function limpar() {
    setUsuario({
      email: "",
      password: "",
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.container_form}>
        <div className={styles.content}>
          <div className={styles.titulo}>
            <h1>Bem-vindo(a)!</h1>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="E-mail"
              name="email"
              onChange={handleChange}
              value={usuario.email || ""}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={usuario.password || ""}
            />

            <div className={styles.esqueceu_senha}>
              <h4>Esqueceu sua senha?</h4>
            </div>

            <input className={styles.btn_submit} type="submit" value="Login" />

            <h4 className={styles.erro}>{mensagemErro}</h4>

            <div className={styles.cadastrar}>
              <span>Não tem uma conta?</span>

              <Link className={styles.link} to="/cadastro">
                <h5>Cadastre-se</h5>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
