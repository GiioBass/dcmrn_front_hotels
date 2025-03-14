// src/componentes/hotels/HotelCreateForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate

const HotelCreateForm = ({ onCreate, onClose }) => {
    const [hotel, setHotel] = useState({
        name: '',
        address: '',
        city: '',
        nit: '',
        qty_rooms: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Hook para navegar a otra vista

    const handleChange = (e) => {
        setHotel({ ...hotel, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Limpiar errores previos
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/hotels', hotel);
            if (response.data.success) {
                alert(response.data.message);
                onCreate(response.data.data);
                setTimeout(() => {
                    navigate('/'); 
                }, 500); 
            } else {
                alert('Hubo un problema al crear el hotel.');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error creando hotel:', error);
            }
        }
    };

    const handleCancelCreateForm = () => {
        navigate('/'); 
    };

    return (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Crear Hotel</h5>
                        {/* Eliminar el botón de cierre con la "X" */}
                    </div>
                    <div className="modal-body">
                        {errors.general && (
                            <div className="alert alert-danger" role="alert">
                                {errors.general}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Nombre</label>
                                <input
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Nombre"
                                    value={hotel.name}
                                    onChange={handleChange}
                                />
                                {errors.name && <small className="text-danger">{errors.name[0]}</small>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Dirección</label>
                                <input
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    type="text"
                                    placeholder="Dirección"
                                    value={hotel.address}
                                    onChange={handleChange}
                                />
                                {errors.address && <small className="text-danger">{errors.address[0]}</small>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">Ciudad</label>
                                <input
                                    className="form-control"
                                    id="city"
                                    name="city"
                                    type="text"
                                    placeholder="Ciudad"
                                    value={hotel.city}
                                    onChange={handleChange}
                                />
                                {errors.city && <small className="text-danger">{errors.city[0]}</small>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="nit">NIT</label>
                                <input
                                    className="form-control"
                                    id="nit"
                                    name="nit"
                                    type="text"
                                    placeholder="NIT"
                                    value={hotel.nit}
                                    onChange={handleChange}
                                />
                                {errors.nit && <small className="text-danger">{errors.nit[0]}</small>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="qty_rooms">Cantidad de Habitaciones</label>
                                <input
                                    className="form-control"
                                    id="qty_rooms"
                                    name="qty_rooms"
                                    type="number"
                                    placeholder="Cantidad de Habitaciones"
                                    value={hotel.qty_rooms}
                                    onChange={handleChange}
                                />
                                {errors.qty_rooms && <small className="text-danger">{errors.qty_rooms[0]}</small>}
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-primary"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Crear
                        </button>
                        {/* Cambiar el botón "Cancelar" */}
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={handleCancelCreateForm}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelCreateForm;
