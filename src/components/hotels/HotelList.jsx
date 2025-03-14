// src/componentes/hotels/HotelList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const HotelList = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const navigate = useNavigate(); // Inicializa el hook useNavigate

    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/hotels');
                setHotels(response.data.data);
            } catch (error) {
                setError(error);
                console.error('Error al obtener los hoteles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    const handleHotelCreated = (newHotel) => {
        setHotels([...hotels, newHotel]);
        setShowCreateForm(false);
    };

    const handleOpenCreateForm = () => {
        navigate('/create'); 
    };

    const handleCloseCreateForm = () => {
        setShowCreateForm(false);
    };

    const handleViewRooms = (hotelId) => {
        navigate(`/hotels/${hotelId}/rooms`); // Redirige al componente de habitaciones del hotel
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <Alert variant="danger">
                    Error al cargar los hoteles: {error.message}
                </Alert>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Lista de Hoteles</h1>
            <div className="text-center mb-4">
                <Button variant="primary" onClick={handleOpenCreateForm}>
                    Agregar Hotel
                </Button>
            </div>

            <div className="table-responsive">
                <Table striped bordered hover responsive className="table table-striped table-hover table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>NIT</th>
                            <th>Ciudad</th>
                            <th>Dirección</th>
                            <th>Cantidad de Habitaciones</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels.length > 0 ? (
                            hotels.map(hotel => (
                                <tr key={hotel.id}>
                                    <td>{hotel.name}</td>
                                    <td>{hotel.nit}</td>
                                    <td>{hotel.city}</td>
                                    <td>{hotel.address}</td>
                                    <td>{hotel.qty_rooms}</td>
                                    <td>
                                    <Button
                                        variant="info"
                                        onClick={() => handleViewRooms(hotel.id)}
                                    >
                                        Ver Habitaciones
                                    </Button>
                                </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No hay hoteles disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {showCreateForm && (
                <HotelCreateForm onCreate={handleHotelCreated} onClose={handleCloseCreateForm} />
            )}
        </div>
    );
};

export default HotelList;
