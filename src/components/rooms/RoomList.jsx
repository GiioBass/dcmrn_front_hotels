import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, Alert } from 'react-bootstrap';

const RoomList = () => {
    const { hotelId } = useParams();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/hotels/${hotelId}/rooms`, {
                    headers: {
                        'Authorization': `Bearer TU_TOKEN`, // Sustituir con el token real
                    }
                });
                setRooms(response.data.data);
            } catch (error) {
                setError(error);
                console.error('Error al obtener las habitaciones:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [hotelId]);

    if (loading) {
        return <div>Cargando habitaciones...</div>;
    }

    if (error) {
        return (
            <div className="container mt-5">
                <Alert variant="danger">
                    Error al cargar las habitaciones: {error.message}
                </Alert>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1>Habitaciones del Hotel</h1>

            <Table striped bordered hover responsive>
                <thead className="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.length > 0 ? (
                        rooms.map(room => (
                            <tr key={room.id}>
                                <td>{room.name}</td>
                                <td>{room.description}</td>
                                <td>{room.price}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">No hay habitaciones disponibles</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default RoomList;
