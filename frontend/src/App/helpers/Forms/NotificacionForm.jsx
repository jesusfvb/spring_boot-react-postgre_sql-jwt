import React from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { Name} from '../Balidaciones';
import InputAutocompletar from '../InputAutocompletar';

const NotificacionForm = ({ saveData, update = false, updateData, onCansel }) => {
    return (
        <Form id="notificacionForm" className="mt-1" autoComplete="off" onSubmit={(e) => { e.preventDefault(); if (!update) { saveData(Array.from(e.target)) } else { updateData(Array.from(e.target)) } }}>
            <Form.Group as={Col}>
                <Form.Label>Nombre</Form.Label>
                <InputAutocompletar ponerDatos="notificacionInput" url="/users" acceso="name" name="fromInputsN" placeholder="Escriba el Nombre" isInvalid onChange={(e) => { Name(e.target) }} />
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Mensaje</Form.Label>
                <Form.Control  name="fromInputsN" as="textarea" rows="1" style={{resize:"none"}}/>
            </Form.Group>

            <Col className="text-right">
                {(update) ? <Button className="ml-3" variant="danger" type="reset" onClick={(e) => { onCansel() }}> Cancelar </Button> : ""}
                <Button className="ml-3" variant="success" type="submit"> Aceptar </Button>
            </Col>
        </Form >
    )
}
export default NotificacionForm