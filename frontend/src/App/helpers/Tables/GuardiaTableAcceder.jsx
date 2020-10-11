import React from 'react'
import { Button, Form, Table } from 'react-bootstrap'

const GuardiaTableAcceder = ({ datos, onDelete, onUpdate }) => {
    function selectAllChecboks() {
        document.getElementsByName("checkboxs").forEach(checkbox => { if (!checkbox.checked) { checkbox.checked = true; } })
    }
    return (
        <Table responsive hover size="sm" className="mr-3">
            <thead>
                <tr>
                    <th style={{ width: "10px" }}><Button variant="dark" size="sm" onClick={selectAllChecboks}>ST</Button></th>
                    <th>Nombre</th>
                    <th>Evaluacion</th>
                    <th className="text-center" style={{ width: "100px" }}>Modificar</th>
                    <th className="text-center" style={{ width: "100px" }}>Borrar</th>
                </tr>
            </thead>
            <tbody>
                {
                    datos.integrantes.map((dato, i) => (
                        (dato.name === undefined) ? null
                            :
                            <tr key={i} onClick={(e) => { e.preventDefault(); }}>
                                <td className="text-center">
                                    <Form.Check id={i} className="ml-1" type="checkbox" label="" name="checkboxs" onClick={(e) => { e.stopPropagation(); }} />
                                </td>
                                <td>{dato.name}</td>
                                <td>{datos.evaluaciones[i]}</td>
                                <td className="text-center" ><Button id={i} onClick={(e) => { e.stopPropagation(); onUpdate(e.target.id) }} variant="warning" size="sm">MD</Button></td>
                                <td className="text-center" ><Button id={i} onClick={(e) => { e.stopPropagation(); onDelete([e.target.id]) }} variant="danger" size="sm">BR</Button></td>
                            </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}
export default GuardiaTableAcceder