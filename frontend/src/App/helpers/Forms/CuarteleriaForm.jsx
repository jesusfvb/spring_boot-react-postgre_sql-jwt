import React from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { Name, Fecha } from '../Balidaciones';
import InputAutocompletar from '../InputAutocompletar';

const CuarteleriaForm = ({ saveData, update = false, updateData, onCansel }) => {
    return (
        <Form className="mt-1" autoComplete="off" onSubmit={(e) => { e.preventDefault(); if (!update) { saveData(Array.from(e.target)) } else { updateData(Array.from(e.target)) } }}>
            <Form.Group as={Col}>
                <Form.Label>Nombre</Form.Label>
                <InputAutocompletar url="/ubicacion" acceso="user.name" name="fromInputs" placeholder="Escriba el Nombre" isInvalid onChange={(e) => { Name(e.target) }} />
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Fecha</Form.Label>
                <Form.Control name="fromInputs" type="date" placeholder="Escriba la Fecha" isInvalid onChange={(e) => { Fecha(e.target) }} />
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Evaluación</Form.Label>
                <Form.Control name="fromInputs" as="select" custom defaultValue="Pendiente" isValid >
                    <option defaultValue="0">Bien</option>
                    <option defaultValue="1">Regular</option>
                    <option defaultValue="2">Mal</option>
                    <option defaultValue="3">Pendiente</option>
                </Form.Control>
            </Form.Group>

            <Col className="text-right">
                {(update) ? <Button className="ml-3" variant="danger" type="reset" onClick={(e) => { onCansel() }}> Cancelar </Button> : ""}
                <Button className="ml-3" variant="success" type="submit"> Aceptar </Button>
            </Col>
        </Form >
    )
}
export default CuarteleriaForm