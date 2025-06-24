import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/Form.css';

const EditServiceForm = ({ service, onServiceUpdated, onCancel }) => {
    const [formData, setFormData] = useState({ ...service });
    const [error, setError] = useState(null);

    useEffect(() => {
        setFormData({ ...service });
    }, [service]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedService = {
            ...formData,
            price: parseFloat(formData.price)
        };

        try {
            const response = await axios.put(`http://localhost:3001/services/${service.id}`, updatedService);
            onServiceUpdated(response.data);
        } catch (err) {
            setError('Ocorreu um erro ao atualizar o serviço.');
            console.error(err);
        }
    };

    return (
        <div className="form-container">
            <h2>Editar Serviço</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Descrição:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Preço:</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Duração:</label>
                    <input type="text" name="duration" value={formData.duration} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Categoria:</label>
                    <input type="text" name="category" value={formData.category} onChange={handleChange} />
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-button">Salvar Alterações</button>
                    <button type="button" className="cancel-button" onClick={onCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default EditServiceForm; 