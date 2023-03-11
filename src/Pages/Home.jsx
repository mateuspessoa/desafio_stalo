/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../Styles/Home.module.css";

import { FiHome } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { Context } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { logout } = useContext(Context);
  const navigate = useNavigate();

  const dia = new Date().toLocaleDateString();

  const container_adicionar = useRef();
  const container_superior = useRef();
  const container_hora = useRef();
  const container_tarefas = useRef();

  function abrir() {
    container_adicionar.current.style.display = "flex";
    container_superior.current.style.filter = "alpha(opacity=10)";
    container_superior.current.style.opacity = "0.1";
    container_hora.current.style.filter = "alpha(opacity=10)";
    container_hora.current.style.opacity = "0.1";
    container_tarefas.current.style.filter = "alpha(opacity=10)";
    container_tarefas.current.style.opacity = "0.1";
  }

  function fechar() {
    container_adicionar.current.style.display = "none";
    container_superior.current.style.filter = "alpha(opacity=0)";
    container_superior.current.style.opacity = "1";
    container_hora.current.style.filter = "alpha(opacity=0)";
    container_hora.current.style.opacity = "1";
    container_tarefas.current.style.filter = "alpha(opacity=0)";
    container_tarefas.current.style.opacity = "1";
    setTarefa({
      description: "",
    });
  }

  const [tarefas, setTarefas] = useState([]);
  const [atualizar, setAtualizar] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [idTarefa, setIdTarefa] = useState("");
  const [tarefa, setTarefa] = useState({
    description: "",
  });

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    axios
      .get("http://localhost:5000/tasks/minhastarefas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTarefas(response.data.tasks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, atualizar]);

  useEffect(() => {
    const newToken = localStorage.getItem("token");
    if (newToken !== token) {
      setToken(newToken);
    }
  }, []);

  async function buscarTodas() {
    await axios
      .get("http://localhost:5000/tasks/minhastarefas", config)
      .then((result) => {
        setTarefas(result.data.tasks);
      });
  }

  async function buscarFinalizadas() {
    axios
      .get("http://localhost:5000/tasks/finalizadas", config)
      .then((result) => {
        setTarefas(result.data.tarefas);
      });
  }

  async function buscarAbertas() {
    axios.get("http://localhost:5000/tasks/abertas", config).then((result) => {
      setTarefas(result.data.tarefas);
    });
  }

  function handleChange(e) {
    setTarefa({ ...tarefa, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    axios
      .post("http://localhost:5000/tasks/create", tarefa, config)
      .then((result) => {
        setAtualizar(result.data);
      });
    fechar();
    setTarefa({
      description: "",
    });
  }

  function excluir(id) {
    axios.delete(`http://localhost:5000/tasks/${id}`, config).then((result) => {
      setAtualizar(result.data);
    });
  }

  function finalizar(id) {
    axios
      .post(`http://localhost:5000/tasks/concluirtarefa/${id}`, config)
      .then((result) => {
        setAtualizar(result.data);
      });
  }

  function editar(dados, idtarefa) {
    setTarefa(dados);
    setIdTarefa(idtarefa);
    abrir();
  }

  async function editarTarefa() {
    await axios
      .post(`http://localhost:5000/tasks/atualizar/${idTarefa}`, tarefa, config)
      .then((result) => {
        setAtualizar(result.data);
        fechar();
      });
  }

  function detalhes(id) {
    navigate(`/tarefa/${id}`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.conteudo}>
        <div ref={container_superior} className={styles.superior}>
          <h3>Filtrar</h3>
          <div className={styles.btns_filtro}>
            <button
              onClick={buscarTodas}
              className={styles.btn_filtro_principal}
            >
              Todas
            </button>
            <button onClick={buscarAbertas}>A fazer</button>
            <button onClick={buscarFinalizadas}>Feitas</button>
          </div>
        </div>

        <div ref={container_hora} className={styles.container_hora}>
          <h2>{dia}</h2>
        </div>

        <div ref={container_tarefas} className={styles.container_tarefas_geral}>
          {tarefas?.map((tarefass) => (
            <div key={tarefass._id} className={styles.container_tarefas}>
              <div className={styles.item_tarefa}>
                {tarefass.status === "Finalizada" && (
                  <>
                    <input type="checkbox" />
                    <label className={styles.nome_tarefa}>
                      {tarefass.description}
                    </label>
                  </>
                )}
                {tarefass.status === "A fazer" && (
                  <>
                    <input type="checkbox" />
                    <label>{tarefass.description}</label>
                  </>
                )}
              </div>

              <select
                defaultValue={"DEFAULT"}
                onChange={(e) => {
                  if (e.target.value === "excluir") {
                    excluir(tarefass._id);
                  }
                  if (e.target.value === "editar") {
                    editar(tarefass, tarefass._id);
                  }
                  if (e.target.value === "finalizar") {
                    finalizar(tarefass._id);
                  }
                  if (e.target.value === "info") {
                    detalhes(tarefass._id);
                  }
                }}
              >
                {tarefass.status === "Finalizada" && (
                  <>
                    <option value="DEFAULT" disabled></option>
                    <option value="info">Info</option>
                    <option className={styles.option_excluir} value="excluir">
                      Excluir
                    </option>
                  </>
                )}
                {tarefass.status === "A fazer" && (
                  <>
                    <option value="DEFAULT" disabled></option>
                    <option value="info">Info</option>
                    <option className={styles.option_editar} value="editar">
                      Editar
                    </option>
                    <option
                      className={styles.option_concluir}
                      value="finalizar"
                    >
                      Finalizar
                    </option>
                    <option className={styles.option_excluir} value="excluir">
                      Excluir
                    </option>
                  </>
                )}
              </select>
            </div>
          ))}
        </div>

        <div className={styles.total_tarefas}>
          <h2>Total de tarefas: </h2> <span>{tarefas.length}</span>
        </div>

        <div className={styles.container_menu}>
          <div className={styles.home}>
            <FiHome color="#1FCC79" fontSize={22} />
            <span>Home</span>
          </div>

          <div className={styles.adicionar}>
            <div onClick={() => abrir()} className={styles.icone_mais}>
              <AiOutlinePlus color="#FFF" fontSize={27} />
            </div>
            <span>Adicionar</span>
          </div>

          <div onClick={logout} className={styles.logout}>
            <RxExit color="#9FA5C0" fontSize={22} />
            <span>Logout</span>
          </div>
        </div>

        {/* Container Dinâmico*/}
        <div ref={container_adicionar} className={styles.container_adicionar}>
          {tarefa._id && <h2>Editar tarefa</h2>}
          {tarefa._id === undefined && <h2>Criar nova tarefa</h2>}

          <input
            type="text"
            placeholder="Descrição"
            name="description"
            onChange={handleChange}
            value={tarefa.description || ""}
          />

          <div className={styles.btns_add}>
            <button onClick={() => fechar()} className={styles.cancelar}>
              Cancelar
            </button>
            {tarefa._id && (
              <button onClick={() => editarTarefa()}>Editar</button>
            )}
            {tarefa._id === undefined && (
              <button onClick={() => handleSubmit()}>Criar</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
