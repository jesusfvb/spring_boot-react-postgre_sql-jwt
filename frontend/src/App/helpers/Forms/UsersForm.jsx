import React from 'react'
import { Form, Col, Button } from 'react-bootstrap'

const UsersForms = () => {
    return (
        <Form className="mt-1">
            <Form.Group as={Col}>
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="email" placeholder="Escriba el Nombre" />
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Solapin</Form.Label>
                <Form.Control type="password" placeholder="Escriba el Solpin" />
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Usuario</Form.Label>
                <Form.Control placeholder="Escriba el Usuario" />
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control placeholder="Escriba la Contraseña" />
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Rol</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>
            
            <Col className="text-right">
                <Button className="ml-3" variant="primary" type="submit"> Añadir </Button>
            </Col>
        </Form>
    )
}
export default UsersForms