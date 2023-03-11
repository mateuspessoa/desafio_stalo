import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Cadastro from './Pages/Cadastro';
import Home from './Pages/Home';
import Login from './Pages/Login';
import TarefaDetalhes from './Pages/TarefaDetalhes';

import { UserProvider } from './context/UserContext';
import PrivateRoute from './utils/PrivateRoute';

function App() {

  return (
    <div className="App">
      
      <Router>

        <UserProvider>

            <Routes>

              
              <Route exact path='/' element={<PrivateRoute />}>
                <Route exact path='/' element={<Home />} />
              </Route>

              <Route path='/cadastro' element={<Cadastro />} />
              <Route path='/login' element={<Login />} />
              <Route path='/tarefa/:id' element={<TarefaDetalhes />} />



            </Routes>

        </UserProvider>
        
      </Router>

    </div>
  );
}

export default App;
