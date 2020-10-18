import React from 'react'
import Cuarteleria from '../helpers/Img/cuarteleria.jpg'
import Guardia from '../helpers/Img/guardia.jpg'
import Ubicacion from '../helpers/Img/ubicacion.jpg'
import { Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <>
        
            <Col>
                <Card as={Link} to="/cuarteleria" style={{textDecoration:"none",color:"black"}}>
                    <Card.Img variant="top" src={Cuarteleria} />
                    <Card.Body>
                        <Card.Text>Cuarteleria</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card as={Link} to="/guardia" style={{textDecoration:"none",color:"black"}}>
                    <Card.Img variant="top" src={Guardia} />
                    <Card.Body>
                        <Card.Text>Guardia</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card as={Link} to="/ubicacion" style={{textDecoration:"none",color:"black"}}>
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