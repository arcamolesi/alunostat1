import './App.css';
import React, { useState, useEffect}  from 'react';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';


function App() {
  const baseUrl="https://localhost:7220/api/Alunos";
  const [data, setData]=useState([]);

  const alunosGet= async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    alunosGet();
  })

  return (
    <div className="aluno-container">
      <br/>
      <h3>Cadastro de Alunos</h3>
      <table className="table table-bordered">
          <thead>
             <tr>
                 <th>ID</th>
                 <th>Nome</th>
                 <th>E-Mail</th>
                 <th>Idade</th>
             </tr>
          </thead>

          <tbody>
          {data.map(aluno=>(
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.idade}</td>

              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
