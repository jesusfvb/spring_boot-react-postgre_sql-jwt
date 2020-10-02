import React from 'react'
import Cuarteleria from '../helpers/Img/cuarteleria.jpg'
import Guardia from '../helpers/Img/guardia.jpg'
import Ubicacion from '../helpers/Img/ubicacion.jpg'
import { Col, Card } from 'react-bootstrap'
const Home = () => {
    return (
        <>
            <Col>
                <Card>
                    <Card.Img variant="top" src={Cuarteleria} />
                    <Card.Body>
                        <Card.Text>Cuarteleria</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Img variant="top" src={Guardia} />
                    <Card.Body>
                        <Card.Text>Guardia</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
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