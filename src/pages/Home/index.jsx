import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/red-trash.svg";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");

    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await api.post("/usuarios", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });

    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);

    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input
          placeholder="Nome"
          name="nome"
          type="text"
          ref={inputName}
          required
        />
        <input
          placeholder="Idade"
          name="idade"
          type="text"
          ref={inputAge}
          required
        />
        <input
          placeholder="E-mail"
          name="email"
          type="email"
          ref={inputEmail}
          required
        />
        <button type="button" onClick={createUsers}>
          Cadastrar
        </button>
      </form>

      {users.map((user) => (
        <div className="card" key={user.id}>
          <div>
            <p>
              Nome: <spam>{user.name}</spam>
            </p>
            <p>
              Idade: <spam>{user.age}</spam>
            </p>
            <p>
              Email: <spam>{user.email}</spam>
            </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
