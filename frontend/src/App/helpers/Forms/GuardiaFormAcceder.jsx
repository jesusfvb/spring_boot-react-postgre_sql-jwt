import React from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { Name } from '../Balidaciones';
const GuardiaFormAcceder = ({ saveIntegrante, update = false, updateData, onCansel, onAdvertencia, advertencia="" }) => {
    return (
        <>
            <Form className="mt-1" autoComplete="of" onSubmit={(e) => { e.preventDefault(); if (!update) { saveIntegrante(Array.from(e.target)) } else { updateData(Array.from(e.target)) } }}>
                <Form.Group as={Col}>
                    <Form.Label>Integrante</Form.Label>
                    <Form.Control name="fromInputs" placeholder="Escriba el Nombre" isInvalid onChange={(e) => { Name(e.target) }} />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Evaluacion</Form.Label>
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

            <Form className="mt-1" autoComplete="of" onSubmit={(e) => { e.preventDefault(); onAdvertencia(e.target[0]) }}>
                <Form.Group>
                    <Form.Label>Advertencia</Form.Label>
                    <Form.Control as="textarea" rows="5" defaultValue={advertencia}/>
                </Form.Group>
                <Col className="text-right">
                    <Button className="ml-3" variant="success" type="submit"> Aceptar </Button>
                </Col>
            </Form >

        </>
    )
}
export default GuardiaFormAcceder