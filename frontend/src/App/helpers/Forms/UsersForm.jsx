import React from 'react'
import { Form, Col, Button } from 'react-bootstrap'

const UsersForms = ({saveData,update=false}) => {
    return (
        <Form className="mt-1" autoComplete="of" onSubmit={(e)=>{e.preventDefault(); if(!update) {saveData(Array.from(e.target))}}}>
            <Form.Group as={Col}>
                <Form.Label>Nombre</Form.Label>
                <Form.Control placeholder="Escriba el Nombre" />
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Solapin</Form.Label>
                <Form.Control  placeholder="Escriba el Solpin" />
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Usuario</Form.Label>
                <Form.Control placeholder="Escriba el Usuario" />
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Escriba la Contraseña" />
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Rol</Form.Label>
                <Form.Control as="select" custom defaultValue="No Tiene Rol Seleccionado">
                    <option defaultValue="0">Administrador</option>
                    <option defaultValue="1">DrRecidence</option>
                    <option defaultValue="2">VicDecExtencion</option>
                    <option defaultValue="3">Intructura</option>
                    <option defaultValue="4">Profesor</option>
                    <option defaultValue="5">Estudiante</option>
                    <option defaultValue="6">No Tiene Rol Seleccionado</option>
                </Form.Control>
            </Form.Group>

            <Col className="text-right">
                <Button className="ml-3" variant="primary" type="submit"> Añadir </Button>
            </Col>
        </Form>
    )
}
export default UsersForms