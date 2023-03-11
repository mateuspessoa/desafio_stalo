/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import styles from "../Styles/TarefaDetalhes.module.css";

import { FiHome } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const TarefaDetalhes = () => {
  const [tarefa, setTarefa] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { id } = useParams();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    buscarTarefa();
  }, []);

  async function buscarTarefa() {
    await axios
      .get(`http://localhost:5000/tasks/${id}`, config)
      .then((result) => {
        setTarefa(result.data);
      });
  }

  const dataCriacao = new Date(tarefa?.task?.createdAt).toLocaleDateString();
  const dataAtualizacao = new Date(
    tarefa?.task?.updatedAt
  ).toLocaleDateString();

  const dia = new Date().toLocaleDateString();

  return (
    <div className={styles.container}>
      <div className={styles.conteudo}>
        <div className={styles.superior}>
          <h3>Filtrar</h3>
          <div className={styles.btns_filtro}>
            <button className={styles.btn_filtro_principal}>Todas</button>
            <button>A fazer</button>
            <button>Feitas</button>
          </div>
        </div>

        <div className={styles.container_hora}>
          <h2>{dia}</h2>
        </div>

        <div className={styles.container_tarefas_geral}>
          <div className={styles.container_tarefas}>
            <div className={styles.item_tarefa}>
              <input type="checkbox" />
              <label>Tarefa 1</label>
            </div>
            <select defaultValue={"DEFAULT"}>
              <option value="DEFAULT" disabled></option>
              <option value="">Info</option>
              <option className={styles.option_editar} value="">
                Editar
              </option>
              <option className={styles.option_concluir} value="">
                Concluir
              </option>
              <option className={styles.option_excluir} value="">
                Excluir
              </option>
            </select>
          </div>

          <div className={styles.container_tarefas}>
            <div className={styles.item_tarefa}>
              <input type="checkbox" />
              <label>Tarefa 2</label>
            </div>
            <select defaultValue={"DEFAULT"}>
              <option value="DEFAULT" disabled></option>
              <option value="">Info</option>
              <option className={styles.option_editar} value="">
                Editar
              </option>
              <option className={styles.option_concluir} value="">
                Concluir
              </option>
              <option className={styles.option_excluir} value="">
                Excluir
              </option>
            </select>
          </div>

          <div className={styles.container_tarefas}>
            <div className={styles.item_tarefa}>
              <input type="checkbox" />
              <label>Tarefa 3</label>
            </div>
            <select defaultValue={"DEFAULT"}>
              <option value="DEFAULT" disabled></option>
              <option value="">Info</option>
              <option className={styles.option_editar} value="">
                Editar
              </option>
              <option className={styles.option_concluir} value="">
                Concluir
              </option>
              <option className={styles.option_excluir} value="">
                Excluir
              </option>
            </select>
          </div>
        </div>

        <div className={styles.total_tarefas}>
          <h2>Total de tarefas: </h2> <span>1/3</span>
        </div>

        <div className={styles.container_menu}>
          <div className={styles.home}>
            <FiHome color="#1FCC79" fontSize={22} />
            <span>Home</span>
          </div>

          <div className={styles.adicionar}>
            <div className={styles.icone_mais}>
              <AiOutlinePlus color="#FFF" fontSize={27} />
            </div>
            <span>Adicionar</span>
          </div>

          <div className={styles.logout}>
            <RxExit color="#9FA5C0" fontSize={22} />
            <span>Logout</span>
          </div>
        </div>

        <div className={styles.container_detalhes}>
          <div className={styles.titulo_desc}>
            <h2>Descrição</h2>
            <h5>{tarefa?.task?.description}</h5>
          </div>
          <div className={styles.titulo_desc}>
            <h2>ID</h2>
            <h5>{tarefa?.task?._id}</h5>
          </div>
          <div className={styles.titulo_desc}>
            <h2>Data de criação</h2>
            <h5>{dataCriacao}</h5>
          </div>
          <div className={styles.titulo_desc}>
            <h2>Última atualização</h2>
            <h5>{dataAtualizacao}</h5>
          </div>
          <div className={styles.titulo_desc}>
            <h2>Status</h2>
            <h5>{tarefa?.task?.status}</h5>
          </div>

          <div className={styles.btn_voltar}>
            <Link to="/">
              <button>Voltar para Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarefaDetalhes;
