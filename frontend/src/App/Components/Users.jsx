import React from 'react'
import { Col, InputGroup, FormControl, Button } from 'react-bootstrap'
import { DELETE, GET, PUT } from '../helpers/Axion'
import UsersForm from '../helpers/Forms/UsersForm'
import UsersTable from '../helpers/Tables/UsersTable'
export default class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            url: "/users",
            update:false,
            datos: [],
        }
        this.loadData = this.loadData.bind(this);
        this.delete = this.delete.bind(this);
        this.saveData = this.saveData.bind(this)
    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        GET(this.state.url).then(resul => { this.setState({ datos: resul }) }).catch(error => { console.error(error) })
    }
    delete(ids = []) {
        if (ids.length === 0) {
            ids = Array.from(document.getElementsByName("checkboxs")).filter(dato => dato.checked).map(dato => dato.id)
        }
        if (ids.length === 0) {
            console.error("Seleccione Alguno")
        } else {
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
    render() {
        return (
            <>
                <Col xs="3" className="border-right border-top">
                    <UsersForm saveData={this.saveData} update={this.state.update}/>
                </Col>
                <Col className="border-top">
                    <InputGroup className="mb-3 mt-2">
                        <FormControl placeholder="Filtrar" />
                        <InputGroup.Append>
                            <Button variant="danger" onClick={(e) => { this.delete([]) }}>Borrar</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    <UsersTable datos={this.state.datos} onDelete={this.delete} />
                </Col>
            </>
        )
    }
}