import React from 'react'
import { Col, InputGroup, FormControl, Button, Alert } from 'react-bootstrap'
import { DELETE, GET, PUT, POST, PATCH } from '../helpers/Axion'
import UsersForm from '../helpers/Forms/UsersForm'
import UsersTable from '../helpers/Tables/UsersTable'
export default class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            url: "/users",
            update: false,
            idForUpdate: -1,
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
    loadData() {
        GET(this.state.url).then(resul => { this.setState({ datos: resul }); this.resetForm() }).catch(error => { console.error(error) })
    }
    deleteData(ids = []) {
        let resetChecboxs = false
        if (ids.length === 0) {
            ids = Array.from(document.getElementsByName("checkboxs")).filter(dato => dato.checked).map(dato => dato.id)
            resetChecboxs = true
        }
        if (ids.length === 0) {
            console.error("Seleccione Alguno")
        } else {
            if (resetChecboxs) {
                Array.from(document.getElementsByName("checkboxs")).forEach(checkbox => { checkbox.checked = false })
            }
            DELETE(this.state.url, ids).then((mensaje) => { this.loadData(); console.log(mensaje) }).catch(error => { console.error(error) })
        }
    }
    saveData(trarges = []) {
        PUT(this.state.url, {
            name: trarges[0].value,
            solapin: trarges[1].value,
            userName: trarges[2].value,
            password: trarges[3].value,
            rol: trarges[4].selectedIndex
        }).then((mensaje) => { this.loadData(); console.log(mensaje) }).catch(error => { console.error(error) })
    }
    getDataForUpdate(id) {
        const fromInputs = Array.from(document.getElementsByName("fromInputs"))
        GET(this.state.url + "/" + id).then((data) => {
            fromInputs[0].value = data.name
            fromInputs[1].value = data.solapin
            fromInputs[2].value = data.userName
            fromInputs[4].value = data.rol
            console.log(data.rol)
            this.setState({ update: true, idForUpdate: id })
        }).catch(error => { console.error(error) })
    }
    updateData(trarges = []) {
        POST(this.state.url, {
            id: this.state.idForUpdate,
            name: trarges[0].value,
            solapin: trarges[1].value,
            userName: trarges[2].value,
            password: trarges[3].value,
            rol: trarges[4].selectedIndex
        }).then((mensaje) => { this.setState({ update: false, idForUpdate: -1, }, this.loadData()); console.log(mensaje) }).catch(error => { console.error(error) })
    }
    canselUpdate() {
        this.resetForm()
        this.setState({ update: false, idForUpdate: -1, })
    }
    resetForm() {
        document.getElementsByTagName("form")[0].reset()
    }
    searchData(text) {
        if(text.length!==0){
            PATCH(this.state.url + "/"+text).then(resul => { this.setState({ datos: resul }); this.resetForm() }).catch(error => { console.error(error) })
        } else{
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
                        <FormControl placeholder="Escriva el Filtro(Si se deja vacio se Actualizara Los Datos) y Precione Enter para Filtrar" onKeyPress={(e) => { if (e.key === "Enter") {this.searchData(e.target.value)} }} />
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