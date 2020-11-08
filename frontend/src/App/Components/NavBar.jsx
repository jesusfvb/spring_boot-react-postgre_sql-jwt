import React from 'react'
import { Col, Form, Nav, Navbar, ButtonGroup, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Notificacion from './Notificacion'
import logo from '../helpers/Img/logo.png'
const NavBar = ({ Salir, userName, rol }) => {
    return (
        <Col className="p-0 mb-3">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand as={NavLink} to="/" className="bg-light rounded-pill">
                    <img alt="" src={logo} width="150" height="30" className="d-inline-block align-top" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/cuarteleria" disabled={(rol === "ROLE_ADMINISTRADOR" || rol === "ROLE_VICDECEXTENCION" || rol === "ROLE_INTRUCTURA" || rol === "ROLE_ESTUDIANTE") ? false : true} exact>Cuarteleria</Nav.Link>
                        <Nav.Link as={NavLink} to="/guardia" disabled={(rol === "ROLE_ADMINISTRADOR" || rol === "ROLE_VICDECEXTENCION" || rol === "ROLE_PROFESOR" || rol === "ROLE_ESTUDIANTE") ? false : true} exact>Guardia</Nav.Link>
                        <Nav.Link as={NavLink} to="/ubicacion" disabled={(rol === "ROLE_ADMINISTRADOR" || rol === "ROLE_DRRECIDENCE" || rol === "ROLE_VICDECEXTENCION" || rol === "ROLE_ESTUDIANTE")
                            ? false : true} exact>Ubicacion</Nav.Link>
                        {(rol === "ROLE_ADMINISTRADOR") ? < Nav.Link as={NavLink} to="/usuarios" exact>Usuarios</Nav.Link> : ""}
                    </Nav>
                    <Form inline className="mr-2">
                        <Notificacion />
                    </Form>
                    <Nav>
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="success">{userName}</Button>
                            <Button variant="primary" onClick={() => { Salir() }}>Salir</Button>
                        </ButtonGroup>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Col >
    )
}
export default NavBar