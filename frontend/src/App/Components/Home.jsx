import React from 'react'
import Cuarteleria from '../helpers/Img/cuarteleria.jpg'
import Guardia from '../helpers/Img/guardia.jpg'
import Ubicacion from '../helpers/Img/ubicacion.jpg'
import { Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Home = ({ rol }) => {
    return (
        <>
            <Col>
                <Card as={Link} to={(rol === "ROLE_ADMINISTRADOR" || rol === "ROLE_VICDECEXTENCION" || rol === "ROLE_INTRUCTURA" || rol === "ROLE_ESTUDIANTE") ? "/cuarteleria" : "/"}
                    className={"home " + ((rol === "ROLE_ADMINISTRADOR" || rol === "ROLE_VICDECEXTENCION" || rol === "ROLE_INTRUCTURA" || rol === "ROLE_ESTUDIANTE") ? "" : " homeDisable")}>
                    <Card.Img variant="top" src={Cuarteleria} />
                    <Card.Body>
                        <Card.Text>Cuarteleria</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card as={Link} to={(rol === "ROLE_ADMINISTRADOR" || rol === "ROLE_VICDECEXTENCION" || rol === "ROLE_PROFESOR" || rol === "ROLE_ESTUDIANTE") ? "/guardia" : "/"}
                    className={"home " + ((rol === "ROLE_ADMINISTRADOR" || rol === "ROLE_VICDECEXTENCION" || rol === "ROLE_PROFESOR" || rol === "ROLE_ESTUDIANTE") ? "" : " homeDisable")} >
                    <Card.Img variant="top" src={Guardia} />
                    <Card.Body>
                        <Card.Text>Guardia</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card as={Link} to={(rol === "ROLE_ADMINISTRADOR" || rol === "ROLE_VICDECEXTENCION" || rol === "ROLE_DRRECIDENCE" || rol === "ROLE_ESTUDIANTE") ? "/ubicacion" : "/"}
                    className={"home " + ((rol === "ROLE_ADMINISTRADOR" || rol === "ROLE_VICDECEXTENCION" || rol === "ROLE_DRRECIDENCE" || rol === "ROLE_ESTUDIANTE") ? "" : " homeDisable")} >
                    <Card.Img variant="top" src={Ubicacion} />
                    <Card.Body>
                        <Card.Text>Ubicacion</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}
export default Home