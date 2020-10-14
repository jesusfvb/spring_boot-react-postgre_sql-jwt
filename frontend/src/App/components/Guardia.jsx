import React from 'react'
import { Col, InputGroup, FormControl, Button, Alert } from 'react-bootstrap'
import { DELETE, GET, PUT, POST, PATCH } from '../helpers/Axion'
import { Balidador, Balidar } from '../helpers/Balidaciones'
import GuardiaForm from '../helpers/Forms/GuardiaForm'
import GuardiaFormAcceder from '../helpers/Forms/GuardiaFormAcceder'
import GuardiaTable from '../helpers/Tables/GuardiaTable'
import GuardiaTableAcceder from '../helpers/Tables/GuardiaTableAcceder'
export default class Guardia extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            url: "/guardia",
            update: false,
            acceder: false,
            idForUpdate: -1,
            dataForUpdate: null,
            dataForAcceder: null,
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
        this.acceder = this.acceder.bind(this)
        this.advertencia = this.advertencia.bind(this)
        this.saveIntegrantes = this.saveIntegrantes.bind(this)
        this.deleteIntegrantes = this.deleteIntegrantes.bind(this)
        this.getIntegrantesForUpdate = this.getIntegrantesForUpdate.bind(this)
        this.updateIntegrantes = this.updateIntegrantes.bind(this)
        this.updateAccediendo = this.updateAccediendo.bind(this)
    }
    componentDidMount() {
        this.loadData()
    }
    loadData(resetForm = true, menssge = true) {
        GET(this.state.url).then(resul => { this.setState({ datos: resul, acceder: false }); if (resetForm) { this.resetForm("Datos Cargados", menssge) } }).catch(error => { this.props.Error(error.message) })
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
                representante: { id: trarges[0].id },
                ubicacion: trarges[1].selectedIndex,
                fecha: trarges[2].value,
                inicio: trarges[3].value,
                fin: trarges[4].value,
            }).then((mensaje) => { this.loadData(true, false); this.props.Success(mensaje) }).catch(error => { this.props.Error(error.message) })
        } else {
            this.props.Error("Faltan datos por rellenar")
        }
    }
    getDataForUpdate(id) {
        const fromInputs = Array.from(document.getElementsByName("fromInputs"))
        GET(this.state.url + "/" + id).then((data) => {
            fromInputs[0].value = data.representante.name
            fromInputs[0].id = data.representante.id
            fromInputs[1].value = data.ubicacion
            fromInputs[2].value = data.fecha
            fromInputs[3].value = data.inicio
            fromInputs[4].value = data.fin
            this.setState({ update: true, idForUpdate: id, dataForUpdate: data })
            Balidar(fromInputs, true)
            this.props.Success("Datos Cargados y Listo para Modificar")
        }).catch(error => { this.props.Error(error.message) })
    }
    updateData(trarges = []) {
        if (Balidador(trarges)) {
            POST(this.state.url, {
                id: this.state.idForUpdate,
                representante: { id: trarges[0].id, },
                ubicacion: trarges[1].selectedIndex,
                fecha: trarges[2].value,
                inicio: trarges[3].value,
                fin: trarges[4].value,
                advertencia: this.state.dataForUpdate.advertencia,
                integrantes: this.state.dataForUpdate.integrantes,
                evaluaciones: this.state.dataForUpdate.evaluaciones
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
            if (this.state.acceder) {
                fromInputs[0].value = this.state.dataForUpdate.name
                fromInputs[0].id = this.state.dataForUpdate.id
                fromInputs[1].value = this.state.dataForUpdate.evaluacion
            }
            else {
                fromInputs[0].value = this.state.dataForUpdate.representante.name
                fromInputs[0].id = this.state.dataForUpdate.representante.id
                fromInputs[1].value = this.state.dataForUpdate.ubicacion
                fromInputs[2].value = this.state.dataForUpdate.fecha
                fromInputs[3].value = this.state.dataForUpdate.inicio
                fromInputs[4].value = this.state.dataForUpdate.fin
            }
            Balidar(Array.from(fromInputs), true)
        } else {
            if (this.state.acceder) {
                Balidar([fromInputs[0]], false);
            } else {
                Balidar([fromInputs[0], fromInputs[2], fromInputs[3], fromInputs[4]], false);
            }
            fromInputs[0].id = ""
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
    acceder(data) {
        this.setState({ acceder: true, dataForAcceder: data, update: false, idForUpdate: -1, dataForUpdate: null })
    }
    advertencia(target) {
        let pivote = this.state.dataForAcceder
        pivote.advertencia = target.value
        this.updateAccediendo(pivote)
    }
    saveIntegrantes(trarges = []) {
        if (Balidador(trarges)) {
            let pivote = this.state.dataForAcceder
            pivote.integrantes.push({ id: trarges[0].id })
            if (pivote.evaluaciones === null) {
                pivote.evaluaciones = [trarges[1].selectedIndex]
            }
            else {
                pivote.evaluaciones.push(trarges[1].selectedIndex)
            }
            this.updateAccediendo(pivote)
        } else {
            this.props.Error("Faltan datos por rellenar")
        }
    }
    deleteIntegrantes(ids = []) {
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
            let pivote = this.state.dataForAcceder, diferencia = 0
            ids.forEach(i => {
                pivote.integrantes.splice(i - diferencia, 1)
                pivote.evaluaciones.splice(i - diferencia, 1)
                diferencia++
            })
            this.updateAccediendo(pivote)
        }
    }
    getIntegrantesForUpdate(i) {
        const fromInputs = Array.from(document.getElementsByName("fromInputs"))
        fromInputs[0].value = this.state.dataForAcceder.integrantes[i].name
        fromInputs[0].id = this.state.dataForAcceder.integrantes[i].id
        fromInputs[1].value = this.state.dataForAcceder.evaluaciones[i]
        Balidar(fromInputs, true)
        this.setState({ update: true, idForUpdate: i, dataForUpdate: { name: this.state.dataForAcceder.integrantes[i].name, evaluacion: this.state.dataForAcceder.evaluaciones[i] } })
        this.props.Success("Datos Cargados y Listo para Modificar")
    }
    updateIntegrantes(trarges = []) {
        if (Balidador(trarges)) {
            let pivote = this.state.dataForAcceder
            pivote.integrantes[this.state.idForUpdate] = { id: trarges[0].id }
            pivote.evaluaciones[this.state.idForUpdate] = trarges[1].selectedIndex
            this.canselUpdate()
            this.updateAccediendo(pivote)
        } else {
            this.props.Error("Faltan datos por rellenar")
        }
    }
    updateAccediendo(data) {
        POST(this.state.url, data).then((mensaje) => {
            GET(this.state.url + "/" + data.id).then((data) => { this.setState({ dataForAcceder: data }) }).catch(error => { this.props.Error(error.message) })
            this.resetForm("", false)
            this.props.Success(mensaje)
        }).catch(error => { this.props.Error(error) })

    }
    render() {
        return (
            <>
                <Col xs="3" className="border-right border-top">
                    <Alert className="mt-2" variant="dark">
                        <h3>{(!this.state.update) ? "Añadir" : "Modificar"} {(this.state.acceder) ? "Integrante" : "Guardia"} <Button className="float-right mt-2" size="sm" variant="danger" onClick={() => { this.resetForm() }}>RESET</Button></h3>
                        {(this.state.acceder) ? <GuardiaFormAcceder saveIntegrante={this.saveIntegrantes} onAdvertencia={this.advertencia} advertencia={this.state.dataForAcceder.advertencia} update={this.state.update} updateData={this.updateIntegrantes} onCansel={this.canselUpdate} />
                            :
                            <GuardiaForm saveData={this.saveData} update={this.state.update} updateData={this.updateData} onCansel={this.canselUpdate} />
                        }
                    </Alert>
                </Col>
                <Col className="border-top">
                    <InputGroup className="mb-3 mt-2">
                        {(!this.state.acceder) ?
                            <FormControl placeholder="Escriva el Filtro(Si se deja vacio se Actualizara Los Datos) y Precione Enter para Filtrar" onKeyPress={(e) => { if (e.key === "Enter") { this.searchData(e.target.value) } }} />
                            :
                            <FormControl placeholder={"" + this.state.dataForAcceder.representante.name + " | " + this.state.dataForAcceder.ubicacion + " | " + this.state.dataForAcceder.fecha
                                + " | " + this.state.dataForAcceder.inicio + " | " + this.state.dataForAcceder.fin} disabled />
                        }
                        <InputGroup.Append>
                            <Button onClick={(e) => { if (!this.state.acceder) { e.target.parentElement.previousElementSibling.value = "" }; this.loadData() }}> {(this.state.acceder) ? "<--" : "X"}</Button>
                        </InputGroup.Append>
                        <InputGroup.Append>
                            <Button variant="danger" onClick={(e) => { (this.state.acceder) ? this.deleteIntegrantes([]) : this.deleteData([]) }}>Borrar</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    {(this.state.acceder) ? <GuardiaTableAcceder datos={this.state.dataForAcceder} onDelete={this.deleteIntegrantes} onUpdate={this.getIntegrantesForUpdate} />
                        :
                        <GuardiaTable datos={this.state.datos} onDelete={this.deleteData} onUpdate={this.getDataForUpdate} onAcceder={this.acceder} />
                    }
                </Col>
            </>
        )
    }
}