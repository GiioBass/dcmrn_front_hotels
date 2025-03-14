import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

const RoomCreateRoom = () => {
    const { hotelId } = useParams();
    const navigate = useNavigate();

    // Definición de tipos y sus acomodaciones permitidas
    const roomTypes = ['standard', 'junior_suite', 'suite'];
    const accommodations = {
        'standard': ['sencilla', 'doble'],
        'junior_suite': ['triple', 'cuadruple'],
        'suite': ['sencilla', 'doble', 'triple']
    };

    const [rooms, setRooms] = useState([{ type: '', accommodation: '', qty_rooms: 1 }]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const newRooms = [...rooms];
        newRooms[index][name] = value;

        // Resetear acomodación si cambia el tipo de habitación
        if (name === 'type') {
            newRooms[index].accommodation = '';
        }

        setRooms(newRooms);
    };

    const handleAddRoom = () => {
        setRooms([...rooms, { type: '', accommodation: '', qty_rooms: 1 }]);
    };

    const handleRemoveRoom = (index) => {
        setRooms(rooms.filter((_, i) => i !== index));
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');
    
        // Validar combinaciones antes de enviar
        for (let room of rooms) {
            if (!accommodations[room.type]?.includes(room.accommodation)) {
                setError(`La acomodación '${room.accommodation}' no es válida para la habitación tipo '${room.type}'.`);
                return;
            }
        }
    
        try {
            await axios.post(
                `https://dcmrnbackhotels-production.up.railway.app/api/v1/hotels/${hotelId}/rooms`,
                { hotel_id: hotelId, rooms },
                { headers: { 'Content-Type': 'application/json' } }
            );
    
            setSuccessMessage('Habitaciones creadas con éxito');
    
            // Redireccionar a la vista de listar habitaciones
            navigate(`/hotels/${hotelId}/rooms`);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                const apiErrors = error.response.data.errors;
    
                // Manejar el caso específico de rooms
                if (Array.isArray(apiErrors.rooms)) {
                    setError(apiErrors.rooms.join(' ')); // Unir los mensajes en caso de varios errores
                } else {
                    setError('Hubo un error al crear las habitaciones.');
                }
            } else {
                setError('Hubo un error al crear las habitaciones.');
            }
        }
    };
    
    

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Crear Habitaciones</h1>

            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Form onSubmit={handleSubmit}>
                {rooms.map((room, index) => (
                    <Row key={index} className="mb-4 align-items-end">
                        <Col md={12} lg={4}>
                            <Form.Group controlId={`formType-${index}`}>
                                <Form.Label>Tipo de Habitación</Form.Label>
                                <Form.Select
                                    name="type"
                                    value={room.type}
                                    onChange={(e) => handleInputChange(e, index)}
                                    required
                                >
                                    <option value="">Seleccione un tipo</option>
                                    {roomTypes.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={12} lg={4}>
                            <Form.Group controlId={`formAccommodation-${index}`}>
                                <Form.Label>Tipo de Alojamiento</Form.Label>
                                <Form.Select
                                    name="accommodation"
                                    value={room.accommodation}
                                    onChange={(e) => handleInputChange(e, index)}
                                    disabled={!room.type} // Bloqueado hasta seleccionar tipo
                                    required
                                >
                                    <option value="">Seleccione un alojamiento</option>
                                    {(accommodations[room.type] || []).map((acc) => (
                                        <option key={acc} value={acc}>{acc}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={12} lg={3}>
                            <Form.Group controlId={`formQtyRooms-${index}`}>
                                <Form.Label>Cantidad de Habitaciones</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="qty_rooms"
                                    value={room.qty_rooms}
                                    onChange={(e) => handleInputChange(e, index)}
                                    min="1"
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col md={12} lg={1} className="text-center mt-3">
                            <Button variant="danger" onClick={() => handleRemoveRoom(index)} className="mb-3">
                                Eliminar
                            </Button>
                        </Col>
                    </Row>
                ))}

                <Row className="mt-4">
                    <Col className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <div>
                            <Button variant="primary" onClick={handleAddRoom} className="me-2">
                                Añadir Habitación
                            </Button>
                            <Button variant="success" type="submit">
                                Crear Habitaciones
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default RoomCreateRoom;
