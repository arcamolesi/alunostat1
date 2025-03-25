import './App.css';
import React, { useState, useEffect}  from 'react';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const baseUrl="https://localhost:7024/api/Alunos";
  const [data, setData]=useState([]);

  const [modalIncluir, setModalIncluir]=useState(false);

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

  const alunosGet= async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const pedidoPost=async()=>{
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
    alunosGet();
  })

  return (
    <div className="aluno-container">
      <br/>
      <h3>Cadastro de Alunos</h3>

      <header>
     
        <button onClick={()=>abrirFecharModalIncluir()} className="btn btn-success">Incluir Novo Aluno</button>
       </header>

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


      <Modal isOpen={modalIncluir}>
      <ModalHeader>Incluir Alunos</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nome: </label>
          <br />
          <input type="text" className="form-control" nname="nome"  onChange={handleChange}/>
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
        <button className="btn btn-primary" onClick={()=>pedidoPost()}>Incluir</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirFecharModalIncluir()}>Cancelar</button>
      </ModalFooter>
    </Modal>


    </div>
  );
}

export default App;
