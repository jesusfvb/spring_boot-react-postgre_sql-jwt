import React from 'react'
import { Col, InputGroup, FormControl, Button, Alert } from 'react-bootstrap'
import { DELETE, GET, PUT, POST, PATCH } from '../helpers/Axion'
import { Balidador, Balidar } from '../helpers/Balidaciones'
import UsersForm from '../helpers/Forms/UsersForm'
import UsersTable from '../helpers/Tables/UsersTable'
export default class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            url: "/users",
            update: false,
            idForUpdate: -1,
            dataForUpdate: null,
            datos: [],
        }
        this.loadData = this.loadData.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.saveData = this.saveData.bind(this)
        this.getDataForUpdate = this.getDataForUpdate.bind(this)
        this.updateData = this.updateData.bind(this)
        this.canselUpdate = this.canselUpdate.bind(this)
        this.resetForm = this.resetForm.bind(this)
        this.searchData = this.searchData.bind(this)
    }
    componentDidMount() {
        this.loadData()
    }
    loadData(resetForm = true, menssge = true) {
        GET(this.state.url).then(resul => { this.setState({ datos: resul }); if (resetForm) { this.resetForm("Datos Cargados", menssge) } }).catch(error => { this.props.Error(error.message) })
    }
    deleteData(ids = []) {
        let resetChecboxs = false
        if (ids.length === 0) {
            ids = Array.from(document.getElementsByName("checkboxs")).filter(dato => dato.checked).map(dato => dato.id)
            resetChecboxs = true
        }
        if (ids.length === 0) {
            this.props.Error("Seleccione Alguno")
        } else {
            if (resetChecboxs) {
                Array.from(document.getElementsByName("checkboxs")).forEach(checkbox => { checkbox.checked = false })
            }
            DELETE(this.state.url, ids).then((mensaje) => { this.loadData(false); this.props.Success(mensaje) }).catch(error => { this.props.Error(error.message) })
        }
    }
    saveData(trarges = []) {
        if (Balidador(trarges)) {
            PUT(this.state.url, {
                name: trarges[0].value,
                solapin: trarges[1].value,
                userName: trarges[2].value,
                password: trarges[3].value,
                rol: trarges[4].selectedIndex
            }).then((mensaje) => { this.loadData(true, false); this.props.Success(mensaje) }).catch(error => { this.props.Error(error.message) })
        } else {
            this.props.Error("Faltan datos por rellenar")
        }
    }
    getDataForUpdate(id) {
        const fromInputs = Array.from(document.getElementsByName("fromInputs"))
        GET(this.state.url + "/" + id).then((data) => {
            fromInputs[0].value = data.name
            fromInputs[1].value = data.solapin
            fromInputs[2].value = data.userName
            fromInputs[4].value = data.rol
            this.setState({ update: true, idForUpdate: id, dataForUpdate: data })
            Balidar(fromInputs, true)
            this.props.Success("Datos Cargados y Listo para Modificar")
        }).catch(error => { this.props.Error(error.message) })
    }
    updateData(trarges = []) {
        if (Balidador(trarges)) {
            POST(this.state.url, {
                id: this.state.idForUpdate,
                name: trarges[0].value,
                solapin: trarges[1].value,
                userName: trarges[2].value,
                password: trarges[3].value,
                rol: trarges[4].selectedIndex
            }).then((mensaje) => { this.setState({ update: false, idForUpdate: -1, dataForUpdate: null }, this.loadData(true, false)); this.props.Success(mensaje) }).catch(error => { this.props.Error(error) })
        }
    }
    canselUpdate() {
        this.setState({ update: false, idForUpdate: -1, dataForUpdate: null }, () => { this.resetForm("Listo para Añadir") })
    }
    resetForm(mensaje = "Formulario Resetiado", mostar = true) {
        let form = document.getElementsByTagName("form")[0]
        let fromInputs = Array.from(document.getElementsByName("fromInputs"))
        if (this.state.update) {
            fromInputs[0].value = this.state.dataForUpdate.name
            fromInputs[1].value = this.state.dataForUpdate.solapin
            fromInputs[2].value = this.state.dataForUpdate.userName
            fromInputs[4].value = this.state.dataForUpdate.rol
            Balidar(Array.from(fromInputs), true)
        } else {
            Balidar(Array.from(fromInputs), false)
            form.reset()
        }
        if (mostar) {
            this.props.Success(mensaje)
        }
    }
    searchData(text) {
        if (text.length !== 0) {
            PATCH(this.state.url + "/" + text).then(resul => { this.setState({ datos: resul }); this.props.Success("Buaqueda Completada") }).catch(error => { this.props.Error(error) })
        } else {
            this.loadData()
        }
    }
    render() {
        return (
            <>
                <Col xs="3" className="border-right border-top">
                    <Alert className="mt-2" variant="dark">
                        <h3>{(!this.state.update) ? "Añadir" : "Modificar"} Usuario <Button className="float-right mt-2" size="sm" variant="danger" onClick={() => { this.resetForm() }}>RESET</Button></h3>
                        <UsersForm saveData={this.saveData} update={this.state.update} updateData={this.updateData} onCansel={this.canselUpdate} />
                    </Alert>
                </Col>
                <Col className="border-top">
                    <InputGroup className="mb-3 mt-2">
                        <FormControl placeholder="Escriva el Filtro(Si se deja vacio se Actualizara Los Datos) y Precione Enter para Filtrar" onKeyPress={(e) => { if (e.key === "Enter") { this.searchData(e.target.value) } }} />
                        <InputGroup.Append>
                            <Button onClick={(e) => { e.target.parentElement.previousElementSibling.value = ""; this.loadData() }}>X</Button>
                        </InputGroup.Append>
                        <InputGroup.Append>
                            <Button variant="danger" onClick={(e) => { this.deleteData([]) }}>Borrar</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    <UsersTable datos={this.state.datos} onDelete={this.deleteData} onUpdate={this.getDataForUpdate} />
                </Col>
            </>
        )
    }
}