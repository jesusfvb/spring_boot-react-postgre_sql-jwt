import React from 'react'
import { Col, Form, Nav, Navbar, Dropdown, SplitButton } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Notificacion from './Notificacion'
import logo from '../helpers/Img/logo.png'
const NavBar = () => {
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
                        <Nav.Link as={NavLink} to="/cuarteleria" exact>Cuarteleria</Nav.Link>
                        <Nav.Link as={NavLink} to="/guardia" exact>Guardia</Nav.Link>
                        <Nav.Link as={NavLink} to="/ubicacion" exact>Ubicacion</Nav.Link>
                        <Nav.Link as={NavLink} to="/usuarios" exact>Usuarios</Nav.Link>
                    </Nav>
                    <Form inline className="mr-2">
                        <Notificacion />
                    </Form>
                    <Nav>
                        <SplitButton title="Usuario" alignRight variant="info">
                            <Dropdown.Item eventKey="1">Serrar Secion</Dropdown.Item>
                        </SplitButton>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Col>
    )
}
export default NavBar