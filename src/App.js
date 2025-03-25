import React, { useState, useEffect}  from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import logoCadastro from './assets/cadastro.png';

function App() {

  const baseUrl="https://localhost:7024/api/alunos";
  const [data, setData]=useState([]);

  const [modalEditar, setModalEditar]=useState(false);
  const [modalIncluir, setModalIncluir]=useState(false);
  const [modalExcluir, setModalExcluir]=useState(false);

  const [alunoSelecionado, setAlunoSelecionado]=useState({
    id: '',
    nome: '',
    email: '',
    idade: ''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setAlunoSelecionado({
      ...alunoSelecionado, 
      [name]: value
    });
    console.log(alunoSelecionado);
  }

  //-----modal controle do estado 
  const abrirFecharModalIncluir=()=>{
    setModalIncluir(!modalIncluir);
  }


  const alunoGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const alunoPost=async()=>{
    delete alunoSelecionado.id;
    alunoSelecionado.idade=parseInt(alunoSelecionado.idade);
      await axios.post(baseUrl, alunoSelecionado)
    .then(response=>{
      setData(data.concat(response.data));
      abrirFecharModalIncluir();
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    alunoGet();
  })

  return (
    <div className="aluno-container">
       <br/>
       <h3>Cadastro de Alunos</h3>
      <header>
        <img src={logoCadastro} alt="Cadastro" class="img-fluid"  />
        <button onClick={()=>abrirFecharModalIncluir()} className="btn btn-success">Incluir Novo Aluno</button>
       </header>
      <table className="table table-bordered" >
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map(aluno=>(
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.idade}</td>
              <td>
                  BTN
              </td>
              </tr>
          ))}
        </tbody>
      </table>
      
      <Modal isOpen={modalIncluir}>
      <ModalHeader>Incluir Alunos</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nome: </label>
          <br />
          <input type="text" className="form-control" name="nome"  onChange={handleChange}/>
          <br />
          <label>Email: </label>
          <br />
          <input type="text" className="form-control" name="email" onChange={handleChange}/>
          <br />
          <label>Idade: </label>
          <br />
          <input type="text" className="form-control" name="idade" onChange={handleChange}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>alunoPost()}>Incluir</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirFecharModalIncluir()}>Cancelar</button>
      </ModalFooter>
    </Modal>


    </div>
  );
}

export default App;
