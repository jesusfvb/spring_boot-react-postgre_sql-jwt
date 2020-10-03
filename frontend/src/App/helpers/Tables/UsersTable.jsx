import React from 'react'
import { Button, Form, Table } from 'react-bootstrap'

const UsersTable = ({ datos = [], onDelete, onUpdate }) => {
    function selectAllChecboks() {
        document.getElementsByName("checkboxs").forEach(checkbox => { if (!checkbox.checked) { checkbox.checked = true; } })
    }
    return (
        <Table responsive hover size="sm" className="mr-3">
            <thead>
                <tr>
                    <th style={{ width: "10px" }}><Button variant="dark" size="sm" onClick={selectAllChecboks}>ST</Button></th>
                    <th>Nombre</th>
                    <th>Solapin</th>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th className="text-center" style={{ width: "100px" }}>Modificar</th>
                    <th className="text-center" style={{ width: "100px" }}>Borrar</th>
                </tr>
            </thead>
            <tbody>
                {
                    datos.map((dato, i) => (
                        <tr key={i}>
                            <td className="text-center">
                                <Form.Check id={dato.id} className="ml-1" type="checkbox" label="" name="checkboxs" />
                            </td>
                            <td>{dato.name}</td>
                            <td>{dato.solapin}</td>
                            <td>{dato.userName}</td>
                            <td>{dato.rol}</td>
                            <td className="text-center" ><Button id={dato.id} onClick={(e) => { onUpdate(e.target.id) }} variant="warning" size="sm">MD</Button></td>
                            <td className="text-center" ><Button id={dato.id} onClick={(e) => { onDelete([e.target.id]) }} variant="danger" size="sm">BR</Button></td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}
export default UsersTable