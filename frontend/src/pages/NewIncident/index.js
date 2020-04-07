import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function NewIncident() {
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = { title, description, value };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      });

      history.push('/profile');
    } catch (err) {
      alert('Erro a cadastrar caso. Tente novamente');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero"></img>
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhada para encontrar um herói para resolver isso.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"></FiArrowLeft>
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input type="text" placeholder="Título do Caso" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input type="text" placeholder="Valor em reais" value={value} onChange={e => setValue(e.target.value)} />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
