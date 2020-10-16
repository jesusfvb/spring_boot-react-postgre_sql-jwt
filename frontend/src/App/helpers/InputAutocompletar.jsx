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
        this.acceso = this.acceso.bind(this)
    }
    componentDidMount() {
        if (this.props.url !== undefined) {
            GET(this.props.url).then(dato => { this.setState({ datos: dato, save: dato }) }).catch(error => { console.error("error", error) })
        } else {
            this.setState({ datos: this.props.datos, save: this.props.datos })
        }
    }
    filtro(texto) {
        if (texto === "") {
            this.setState({ datos: this.state.save })
        } else {
            let pivote = this.state.save.filter(d => this.acceso(d).includes(texto))
            this.setState({ datos: pivote })
        }
    }
    ponerDatos(i, comprovar = true) {
        if (Number.isInteger(Number.parseInt(i))) {
            let contenedor = document.getElementsByClassName(((this.props.ponerDatos === undefined) ? "inputAutocompletar" : this.props.ponerDatos))[0]
            contenedor.id = this.state.datos[i].id
            contenedor.value = this.acceso(this.state.datos[i])
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
    acceso(json, texto = this.props.acceso) {
        texto = texto.split(".")
        while (texto.length !== 0) {
            json = json[texto.shift()]
        }
        return json
    }
    render() {
        return (
            <Dropdown>
                <Dropdown.Toggle isInvalid={this.props.isInvalid} placeholder={this.props.placeholder} name={this.props.name} className={((this.props.ponerDatos === undefined) ? "inputAutocompletar" : this.props.ponerDatos)}
                    as={Form.Control} onChange={(e) => { this.filtro(e.target.value); if (this.props.onChange !== undefined) { this.props.onChange(e) } }}
                    onBlurCapture={(e) => { this.comprovar(e.target.value); if (this.props.onChange !== undefined) { this.props.onChange(e) } }}
                    onFocusCapture={(e) => { this.filtro(e.target.value) }} />
                <Dropdown.Menu>
                    {this.state.datos.map((dato, i) => (
                        <Dropdown.Item key={i} eventKey={i} onSelect={(e) => { this.ponerDatos(e) }}>{this.acceso(dato)}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}