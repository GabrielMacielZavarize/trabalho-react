import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/Form.css';

const AddUserForm = ({ onUserAdded, onCancel }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = { name, email, password, role };

        try {
            const response = await axios.post('http://localhost:3003/users', newUser);
            onUserAdded(response.data);
        } catch (err) {
            setError('Ocorreu um erro ao adicionar o usuário.');
            console.error(err);
        }
    };

    return (
        <div className="form-container">
            <h2>Adicionar Novo Usuário</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Senha:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Função:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="user">Usuário</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-button">Salvar</button>
                    <button type="button" className="cancel-button" onClick={onCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default AddUserForm; 