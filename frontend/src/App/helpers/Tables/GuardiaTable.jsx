import React from 'react'
import { Button, Form, Table } from 'react-bootstrap'

const GuardiaTable = ({ datos = [], onDelete, onUpdate, onAcceder, rol }) => {
    function selectAllChecboks() {
        document.getElementsByName("checkboxs").forEach(checkbox => { if (!checkbox.checked) { checkbox.checked = true; } })
    }
    return (
        <Table responsive hover size="sm" className="mr-3">
            <thead>
                <tr>
                    {(rol === "ROLE_PROFESOR" || rol === "ROLE_ESTUDIANTE") ? null :
                        <th style={{ width: "10px" }}><Button variant="dark" size="sm" onClick={selectAllChecboks}>ST</Button></th>
                    }
                    <th>Representante</th>
                    <th>Ubicacion</th>
                    <th>Fecha</th>
                    <th>Inicio</th>
                    <th>Fin</th>
                    <th className="text-center" style={{ width: "100px" }}>Acceder</th>
                    {(rol === "ROLE_PROFESOR" || rol === "ROLE_ESTUDIANTE") ? null :
                        <th className="text-center" style={{ width: "100px" }}>Modificar</th>
                    }
                    {(rol === "ROLE_PROFESOR" || rol === "ROLE_ESTUDIANTE") ? null :
                        <th className="text-center" style={{ width: "100px" }}>Borrar</th>
                    }
                </tr>
            </thead>
            <tbody>
                {
                    datos.map((dato, i) => (
                        <tr key={i} onClick={(e) => { e.preventDefault(); onAcceder(dato) }}>
                            {(rol === "ROLE_PROFESOR" || rol === "ROLE_ESTUDIANTE") ? null :
                                <td className="text-center">
                                    <Form.Check id={dato.id} className="ml-1" type="checkbox" label="" name="checkboxs" onClick={(e) => { e.stopPropagation(); }} />
                                </td>
                            }
                            <td>{dato.representante.name}</td>
                            <td>{dato.ubicacion}</td>
                            <td>{dato.fecha}</td>
                            <td>{dato.inicio}</td>
                            <td>{dato.fin}</td>
                            <td className="text-center" ><Button id={dato.id} onClick={(e) => { e.stopPropagation(); onAcceder(dato) }} variant="primary" size="sm">AC</Button></td>
                            {(rol === "ROLE_PROFESOR" || rol === "ROLE_ESTUDIANTE") ? null :
                                <td className="text-center" ><Button id={dato.id} onClick={(e) => { e.stopPropagation(); onUpdate(e.target.id) }} variant="warning" size="sm">MD</Button></td>
                            }
                             {(rol === "ROLE_PROFESOR" || rol === "ROLE_ESTUDIANTE") ? null :
                                <td className="text-center" ><Button id={dato.id} onClick={(e) => { e.stopPropagation(); onDelete([e.target.id]) }} variant="danger" size="sm">BR</Button></td>
                            }
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}
export default GuardiaTable