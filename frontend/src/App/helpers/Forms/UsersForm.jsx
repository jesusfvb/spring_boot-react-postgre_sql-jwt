import React from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { Name } from '../Balidaciones';

const UsersForms = ({ saveData, update = false, updateData ,onCansel}) => {
    return (
        <Form className="mt-1" autoComplete="of" onSubmit={(e) => { e.preventDefault(); if (!update) { saveData(Array.from(e.target)) } else { updateData(Array.from(e.target)) } }}>
            <Form.Group as={Col}>
                <Form.Label>Nombre</Form.Label>
                <Form.Control name="fromInputs" placeholder="Escriba el Nombre" isInvalid onChange={(e)=>{Name(e.target)}}/>
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Solapin</Form.Label>
                <Form.Control name="fromInputs" placeholder="Escriba el Solpin" isInvalid/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Usuario</Form.Label>
                <Form.Control name="fromInputs" placeholder="Escriba el Usuario" isInvalid/>
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control name="fromInputs" type="password" placeholder="Escriba la Contraseña" isInvalid/>
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Rol</Form.Label>
                <Form.Control name="fromInputs" as="select" custom defaultValue="" isInvalid>
                    <option defaultValue="0">Administrador</option>
                    <option defaultValue="1">DrRecidence</option>
                    <option defaultValue="2">VicDecExtencion</option>
                    <option defaultValue="3">Intructura</option>
                    <option defaultValue="4">Profesor</option>
                    <option defaultValue="5">Estudiante</option>
                    <option defaultValue="6"></option>
                </Form.Control>
            </Form.Group>

            <Col className="text-right">
                {(update) ? <Button className="ml-3" variant="danger" type="reset" onClick={(e)=>{onCansel()}}> Cancelar </Button> : ""}
                <Button className="ml-3" variant="success" type="submit"> Aceptar </Button>
            </Col>
        </Form >
    )
}
export default UsersForms