import React from 'react'
import { Button, Col, Container, Form, Row, Alert } from 'react-bootstrap'
import { POST } from '../helpers/Axion'

import logo from './../helpers/Img/logo.png'
const Loggin = ({ onAutenticarse }) => {
    function onSubmit(e) {
        e.preventDefault()
        let formInputs = Array.from(e.target)
        POST("/loggin", { userName: formInputs[0].value, password: formInputs[1].value }).then(data => {
            onAutenticarse(data.jwt)
        }).catch(error => Error(error.message))
    }
    function Error(mesnaje) {
        let aleta = document.getElementById("loginAleta")
        aleta.innerText = mesnaje
        aleta.classList.remove("d-none")
        setTimeout(() => {
            aleta.classList.add("d-none")
        }, 3000)
    }
    return (
        <Container>
            <Row className="mt-5">
                <Col className="mt-5"></Col>
                <Col className="mt-5 col-5">
                    <Row>
                        <img src={logo} alt="" />
                    </Row>
                    <Row>
                        <Col>
                            <Form className="mt-5" onSubmit={(e) => { onSubmit(e) }}>
                                <Form.Group>
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control type="text" placeholder="Enter email" required />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Password" autoComplete="off" required />
                                </Form.Group>
                                <Form.Group className="text-center">
                                    <Button variant="primary" type="submit">
                                        Entrar
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Alert variant="danger" className="d-none" id="loginAleta"></Alert>
                        </Col>
                    </Row>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}
export default Loggin