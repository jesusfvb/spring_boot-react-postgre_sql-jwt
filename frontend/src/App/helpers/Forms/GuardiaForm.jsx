import React from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { Name, Fecha } from '../Balidaciones';
const GuardiaForm = ({ saveData, update = false, updateData, onCansel }) => {
    return (
        <Form className="mt-1" autoComplete="of" onSubmit={(e) => { e.preventDefault(); if (!update) { saveData(Array.from(e.target)) } else { updateData(Array.from(e.target)) } }}>
            <Form.Group as={Col}>
                <Form.Label>Representante</Form.Label>
                <Form.Control name="fromInputs" placeholder="Escriba el Nombre" isInvalid onChange={(e) => { Name(e.target) }} />
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Ubicacion</Form.Label>
                <Form.Control name="fromInputs" as="select" custom defaultValue="Pendiente" isValid >
                    <option defaultValue="0">Residencia</option>
                    <option defaultValue="1">Docente</option>
                </Form.Control>
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Fecha</Form.Label>
                <Form.Control name="fromInputs" type="date" placeholder="Escriba la Fecha" isInvalid onChange={(e) => { Fecha(e.target) }} />
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Inicio</Form.Label>
                <Form.Control name="fromInputs" type="time" placeholder="Escriba el Solpin" isInvalid onChange={(e) => { Fecha(e.target) }} />
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Fin</Form.Label>
                <Form.Control name="fromInputs" type="time" placeholder="Escriba la Fecha" isInvalid onChange={(e) => { Fecha(e.target) }} />
            </Form.Group>

            <Col className="text-right">
                {(update) ? <Button className="ml-3" variant="danger" type="reset" onClick={(e) => { onCansel() }}> Cancelar </Button> : ""}
                <Button className="ml-3" variant="success" type="submit"> Aceptar </Button>
            </Col>
        </Form >
    )
}
export default GuardiaForm