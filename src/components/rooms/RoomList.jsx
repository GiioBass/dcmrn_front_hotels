import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';

const RoomList = () => {
    const { hotelId } = useParams();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchRooms();
    }, [hotelId]);

    const fetchRooms = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/hotels/${hotelId}/rooms`);
            setRooms(response.data.data);
        } catch (error) {
            setError('Error al obtener las habitaciones.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteRoom = async (roomId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/v1/hotels/${hotelId}/rooms/${roomId}`, {
                headers: { 'Accept': 'application/json' }
            });
            setRooms(rooms.filter(room => room.id !== roomId)); // Elimina localmente la habitación
            setSuccessMessage('Habitación eliminada correctamente.');
        } catch (error) {
            setError('Error al eliminar la habitación.');
        }
    };

    const handleCreateRoom = () => {
        navigate(`/hotels/${hotelId}/create-room`); // Redirige al formulario de creación de habitaciones
    };

    const handleGoBack = () => {
        navigate(`/`); // Redirige a la lista de hoteles
    };

    if (loading) {
        return <div>Cargando habitaciones...</div>;
    }

    return (
        <div className="container mt-5">
            <h1>Habitaciones del Hotel</h1>

            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <div className="d-flex justify-content-between mb-3">
                <Button variant="secondary" onClick={handleGoBack}>
                    Volver a Hoteles
                </Button>
                <Button variant="success" onClick={handleCreateRoom}>
                    Crear Habitación
                </Button>
            </div>

            <Table striped bordered hover responsive>
                <thead className="thead-dark">
                    <tr>
                        <th>Tipo</th>
                        <th>Alojamiento</th>
                        <th>Cantidad de Habitaciones</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.length > 0 ? (
                        rooms.map(room => (
                            <tr key={room.id}>
                                <td>{room.type}</td>
                                <td>{room.accommodation}</td>
                                <td>{room.qty_rooms}</td>
                                <td className="text-center">
                                    <Button variant="danger" onClick={() => handleDeleteRoom(room.id)}>
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No hay habitaciones disponibles</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default RoomList;
