import api from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [token] = useState(localStorage.getItem("token") || "");
  const [atualizar, setAtualizar] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}}`;
      setAuthenticated(true);
    }
  }, []);

  async function cadastrar(user) {
    try {
      const dados = await api.post("/users/register", user).then((result) => {
        return result.data;
      });
      await authUser(dados);
    } catch (error) {
      setMensagemErro(error.response.data.message);
      //console.log(mensagemErro)
    }
  }

  async function authUser(data) {
    setAuthenticated(true);
    localStorage.setItem("token", data.token);
    navigate("/");
  }

  async function login(user) {
    try {
      const dados = await api.post("/users/login", user).then((result) => {
        return result.data;
      });

      await authUser(dados);
    } catch (error) {
      const menssagemLogin = error.response.data.message;
      setMensagemErro(menssagemLogin);
      console.log(mensagemErro);
    }
  }

  async function cadastrarTarefa(tarefa) {
    const dados = await api
      .post("/tasks/create", tarefa, {
        Authorization: `Bearer ${JSON.parse(token)}`,
      })
      .then((result) => {
        setAtualizar(result.data);
        return result.data;
      });

    await authUser(dados);
  }

  function logout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    navigate("/login");
  }

  return {
    cadastrar,
    authenticated,
    logout,
    login,
    cadastrarTarefa,
    atualizar,
    token,
    mensagemErro,
  };
}
