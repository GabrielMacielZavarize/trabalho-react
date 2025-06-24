import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/Crud.css';
import AddUserForm from '../components/AddUserForm';
import EditUserForm from '../components/EditUserForm';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users');
                setUsers(response.data);
            } catch (err) {
                setError('Não foi possível carregar os usuários.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleUserAdded = (newUser) => {
        setUsers([...users, newUser]);
        setIsFormVisible(false);
    };

    const handleUserUpdated = (updatedUser) => {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        setEditingUser(null);
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                await axios.delete(`http://localhost:3001/users/${userId}`);
                setUsers(users.filter(user => user.id !== userId));
            } catch (err) {
                setError('Ocorreu um erro ao excluir o usuário.');
                console.error(err);
            }
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="crud-container">
            <div className="crud-header">
                <h1 className="crud-title">Gerenciamento de Usuários</h1>
                <button className="add-button" onClick={() => { setEditingUser(null); setIsFormVisible(true); }}>
                    Adicionar Usuário
                </button>
            </div>

            {isFormVisible && !editingUser && (
                <AddUserForm
                    onUserAdded={handleUserAdded}
                    onCancel={() => setIsFormVisible(false)}
                />
            )}

            {editingUser && (
                <EditUserForm
                    user={editingUser}
                    onUserUpdated={handleUserUpdated}
                    onCancel={() => setEditingUser(null)}
                />
            )}

            <table className="crud-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Função</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td className="actions-cell">
                                <button className="edit-button" onClick={() => setEditingUser(user)}>Editar</button>
                                <button className="delete-button" onClick={() => handleDelete(user.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users; 