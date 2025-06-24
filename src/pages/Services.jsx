import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/Crud.css';
import AddServiceForm from '../components/AddServiceForm';

const Services = () => {
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:3001/services');
                setServices(response.data);
            } catch (err) {
                setError('Não foi possível carregar os serviços.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleServiceAdded = (newService) => {
        setServices([...services, newService]);
        setIsFormVisible(false);
    };

    const handleDelete = async (serviceId) => {
        if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
            try {
                await axios.delete(`http://localhost:3001/services/${serviceId}`);
                setServices(services.filter(service => service.id !== serviceId));
            } catch (err) {
                setError('Ocorreu um erro ao excluir o serviço.');
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
                <h1 className="crud-title">Gerenciamento de Serviços</h1>
                <button className="add-button" onClick={() => setIsFormVisible(true)}>
                    Adicionar Serviço
                </button>
            </div>

            {isFormVisible && (
                <AddServiceForm
                    onServiceAdded={handleServiceAdded}
                    onCancel={() => setIsFormVisible(false)}
                />
            )}

            <table className="crud-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Duração</th>
                        <th>Categoria</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service.id}>
                            <td>{service.name}</td>
                            <td>{service.description}</td>
                            <td>R$ {service.price.toFixed(2)}</td>
                            <td>{service.duration}</td>
                            <td>{service.category}</td>
                            <td className="actions-cell">
                                <button className="edit-button">Editar</button>
                                <button className="delete-button" onClick={() => handleDelete(service.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Services; 