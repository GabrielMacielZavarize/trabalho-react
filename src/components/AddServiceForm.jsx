import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/Form.css';

const AddServiceForm = ({ onServiceAdded, onCancel }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newService = {
            name,
            description,
            price: parseFloat(price),
            duration,
            category,
        };

        try {
            const response = await axios.post('http://localhost:3002/services', newService);
            onServiceAdded(response.data); 
        } catch (err) {
            setError('Ocorreu um erro ao adicionar o serviço.');
            console.error(err);
        }
    };

    return (
        <div className="form-container">
            <h2>Adicionar Novo Serviço</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Descrição:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Preço:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Duração:</label>
                    <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Categoria:</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-button">Salvar</button>
                    <button type="button" className="cancel-button" onClick={onCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default AddServiceForm; 