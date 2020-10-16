import React from 'react'
import { Button, Form, Table } from 'react-bootstrap'

const NotificacionTable = ({ datos = [], onDelete, opcion }) => {
    function selectAllChecboks() {
        document.getElementsByName("checkboxsN").forEach(checkbox => { if (!checkbox.checked) { checkbox.checked = true; } })
    }
    if (opcion === "remitente") { opcion = "destinatario" } else if (opcion === "destinatario") { opcion = "remitente" }
    return (
        <Table responsive hover size="sm" className="mr-3">
            <thead>
                <tr>
                    <th style={{ width: "10px" }}><Button variant="dark" size="sm" onClick={selectAllChecboks}>ST</Button></th>
                    <th>Nombre</th>
                    <th>Mensaje</th>
                    <th className="text-center" style={{ width: "100px" }}>Borrar</th>
                </tr>
            </thead>
            <tbody>
                {
                    datos.map((dato, i) => (
                        <tr key={i}>
                            <td className="text-center">
                                <Form.Check id={dato.id} className="ml-1" type="checkbox" label="" name="checkboxsN" />
                            </td>
                            <td>{(dato[opcion] !== null) ? dato[opcion].name : ""}</td>
                            <td>{(dato !== null) ? dato.mensaje : ""}</td>
                            <td className="text-center" ><Button id={dato.id} onClick={(e) => { onDelete([e.target.id]) }} variant="danger" size="sm">BR</Button></td>
                        </tr>
                        
                    ))
                }
            </tbody>
        </Table>
    )
}
export default NotificacionTable