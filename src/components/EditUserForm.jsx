import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/Form.css';

const EditUserForm = ({ user, onUserUpdated, onCancel }) => {
    const [formData, setFormData] = useState({ ...user, password: '' });
    const [error, setError] = useState(null);

    useEffect(() => {
        setFormData({ ...user, password: '' });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Constrói o objeto de usuário atualizado
        const updatedUser = {
            name: formData.name,
            email: formData.email,
            role: formData.role,
        };

        // Apenas adiciona a senha ao objeto se ela foi alterada
        if (formData.password) {
            updatedUser.password = formData.password;
        }

        try {
            const response = await axios.patch(`http://localhost:3001/users/${user.id}`, updatedUser);
            onUserUpdated(response.data);
        } catch (err) {
            setError('Ocorreu um erro ao atualizar o usuário.');
            console.error(err);
        }
    };

    return (
        <div className="form-container">
            <h2>Editar Usuário</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Nova Senha:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Deixe em branco para não alterar" />
                </div>
                <div className="form-group">
                    <label>Função:</label>
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="user">Usuário</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-button">Salvar Alterações</button>
                    <button type="button" className="cancel-button" onClick={onCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default EditUserForm; 