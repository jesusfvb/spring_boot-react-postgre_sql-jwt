import React from 'react'
import { Col } from 'react-bootstrap'

import  foto1 from './../helpers/Img/foto1.jpg'
import  foto2 from './../helpers/Img/foto2.jpg'
const Error = () => {
    (() => {
        setTimeout(() => {
            document.getElementById('navbar00').remove()
        }, 1)
    })()
    return (
        <Col>
            <div className="text-center">
                <h1>Error 404</h1>
            </div>
            <img src={foto1} width="500" alt=""/>
            <img src={foto2} width="500" alt=""/>
            <img src={foto1} width="500" alt=""/>
            <img src={foto2} width="500" alt=""/>
            <img src={foto1} width="500" alt=""/>
            <img src={foto2} width="500" alt=""/>
        </Col>
    )
}
export default Error 