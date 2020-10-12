import React from 'react'
import { Dropdown, Form } from 'react-bootstrap'
import { GET } from './Axion'

export default class InputAutocompletar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            datos: [],
            save: [],
            comprovar: true
        }
        this.filtro = this.filtro.bind(this)
        this.ponerDatos = this.ponerDatos.bind(this)
        this.comprovar = this.comprovar.bind(this)
    }
    componentDidMount() {
        if (this.props.url !== undefined) {
            GET(this.props.url).then(dato => { this.setState({datos:dato})}).catch(error => { console.error("error", error) })
        } else {
            this.setState({ datos: this.props.datos, save: this.props.datos })
        }
    }
    filtro(texto) {
        if (texto === "") {
            this.setState({ datos: this.state.save })
        } else {
            let pivote = this.state.save.filter(d => d[this.props.acceso].includes(texto))
            this.setState({ datos: pivote })
        }
    }
    ponerDatos(i, comprovar = true) {
        if (Number.isInteger(Number.parseInt(i))) {
            let contenedor = document.getElementsByName("inputAutocompletar")[0]
            contenedor.id = this.state.datos[i].id
            contenedor.value = this.state.datos[i][this.props.acceso]
            if (comprovar) {
                this.setState({ comprovar: false })
            }
        }
    }
    comprovar(texto) {
        if (texto !== "" && this.state.comprovar) {
            this.filtro(texto)
            this.ponerDatos(0, false)
        } else {
            this.setState({ comprovar: true })
        }
    }
    render() {
        return (
            <Dropdown>
                <Dropdown.Toggle name="inputAutocompletar" as={Form.Control} onChange={(e) => { this.filtro(e.target.value) }} onBlurCapture={(e) => { this.comprovar(e.target.value) }} />
                <Dropdown.Menu>
                    {this.state.datos.map((dato, i) => (
                        <Dropdown.Item key={i} eventKey={i} onSelect={(e) => { this.ponerDatos(e) }}>{dato[this.props.acceso]}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}