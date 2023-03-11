import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const Context = createContext();

function UserProvider({ children }) {
  const {
    authenticated,
    cadastrar,
    logout,
    login,
    cadastrarTarefa,
    atualizar,
    token,
    mensagemErro,
  } = useAuth();

  return (
    <Context.Provider
      value={{
        authenticated,
        cadastrar,
        logout,
        login,
        cadastrarTarefa,
        atualizar,
        token,
        mensagemErro,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };
