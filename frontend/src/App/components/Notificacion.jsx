import React from 'react'
import { Button, Col, FormControl, InputGroup, Modal, Row } from 'react-bootstrap'
import NotificacionTable from '../helpers/Tables/NotificacionTable'
import NotificacionForm from '../helpers/Forms/NotificacionForm'
import { DELETE, GET, PUT } from '../helpers/Axion'
import { Balidador, Balidar } from '../helpers/Balidaciones'

export default class Notificacion extends React.Component {
    constructor(prosp) {
        super(prosp)
        this.state = {
            url: "/notificacion",
            opcion: "destinatario",
            id: 86,
            show: false,
            datos: [],
        }
        this.setShow = this.setShow.bind(this)
        this.loadData = this.loadData.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.saveData = this.saveData.bind(this)
        this.resetForm = this.resetForm.bind(this)
    }
    setShow() {
        this.setState({ show: !this.state.show })
    }
    componentDidMount() {
        this.loadData()
    }
    loadData(resetForm = true, menssge = true, opcion = "destinatario") {
        GET(this.state.url + "/" + opcion + "/" + this.state.id).then(resul => { this.setState({ datos: resul, opcion: opcion }); if (resetForm) { this.resetForm() } }).catch(error => { console.error(error) })
    }
    deleteData(ids = []) {
        let resetChecboxs = false
        if (ids.length === 0) {
            ids = Array.from(document.getElementsByName("checkboxsN")).filter(dato => dato.checked).map(dato => dato.id)
            resetChecboxs = true
        }
        if (ids.length === 0) {
            console.error("Seleccione Alguno")
        } else {
            if (resetChecboxs) {
                Array.from(document.getElementsByName("checkboxsN")).forEach(checkbox => { checkbox.checked = false })
            }
            DELETE(this.state.url + "/" + this.state.id, ids).then((mensaje) => { this.loadData(false); console.info(mensaje) }).catch(error => { console.error(error.message) })
        }
    }
    saveData(trarges = []) {
        if (Balidador(trarges)) {
            PUT(this.state.url, {
                remitente: { id: this.state.id },
                destinatario: { id: trarges[0].id },
                mensaje: trarges[1].value,
            }).then((mensaje) => { this.loadData(true, false); console.info(mensaje) }).catch(error => { console.error(error.message) })
        } else {
            console.error("Faltan datos por rellenar")
        }
    }
    resetForm() {
        let form = document.getElementsByTagName("form")
        if (form.length > 1) {
            form = form[1]
        } else {
            form = form[0]
        }
        let fromInputs = Array.from(document.getElementsByName("fromInputsN"))
        if (fromInputs.length !== 0) {
            Balidar([fromInputs[0]], false);
            fromInputs[0].id = ""
            form.reset()
        }
    }
    render() {
        return (
            <>
                <Button variant="outline-secondary" onClick={() => { this.setShow() }}>
                    No
                </Button>
                <Modal show={this.state.show} onHide={() => { this.setShow() }} animation={false} size="lg" backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Notificaciones
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col xs="5" className="border-right">
                                <h3>Notificación <Button className="float-right mt-2" size="sm" variant="danger" onClick={() => { this.resetForm() }}>RESET</Button></h3>
                                <NotificacionForm saveData={this.saveData} update={this.state.update} updateData={this.updateData} onCansel={this.canselUpdate} />
                            </Col>
                            <Col >
                                <InputGroup className="mb-3 mt-2">
                                    <FormControl placeholder={(this.state.opcion !== "remitente") ? "Recividas" : "Enviadas"} disabled />
                                    <InputGroup.Append>
                                        <Button onClick={(e) => { if (this.state.opcion === "destinatario") { this.loadData(true, true, "remitente") } else { this.loadData() } }}>Cambiar</Button>
                                    </InputGroup.Append>
                                    <InputGroup.Append>
                                        <Button variant="danger" onClick={(e) => { this.deleteData([]) }}>Borrar</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <NotificacionTable datos={this.state.datos} onDelete={this.deleteData} onUpdate={this.getDataForUpdate} opcion={this.state.opcion} />
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}