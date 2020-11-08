import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { POST } from '../helpers/Axion'
const Loggin = ({ onAutenticarse }) => {
    function onSubmit(e) {
        e.preventDefault()
        let formInputs = Array.from(e.target)
        POST("/loggin", { userName: formInputs[0].value, password: formInputs[1].value }).then(data => {
            onAutenticarse(data.jwt)
        }).catch(error => console.error(error))
    }
    return (
        <Container>
            <Row className="mt-5">
                <Col className="mt-5"></Col>
                <Col className="mt-5 col-5">
                    <Form className="mt-5" onSubmit={(e) => { onSubmit(e) }}>
                        <Form.Group>
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Password" autoComplete="off"/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Entrar
                        </Button>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}
export default Loggin