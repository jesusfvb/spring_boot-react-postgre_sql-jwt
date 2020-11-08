import React from 'react'
import { Button, Form, Table } from 'react-bootstrap'

const GuardiaTableAcceder = ({ datos, onDelete, onUpdate, rol }) => {
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
                    <th>Nombre</th>
                    <th>Evaluacion</th>
                    {( rol === "ROLE_ESTUDIANTE") ? null :
                        <th className="text-center" style={{ width: "100px" }}>Modificar</th>
                    }
                    {(rol === "ROLE_PROFESOR" || rol === "ROLE_ESTUDIANTE") ? null :
                        <th className="text-center" style={{ width: "100px" }}>Borrar</th>
                    }
                </tr>
            </thead>
            <tbody>
                {
                    datos.integrantes.map((dato, i) => (
                        (dato.name === undefined) ? null
                            :
                            <tr key={i} onClick={(e) => { e.preventDefault(); }}>
                                {(rol === "ROLE_PROFESOR" || rol === "ROLE_ESTUDIANTE") ? null :
                                    <td className="text-center">
                                        <Form.Check id={i} className="ml-1" type="checkbox" label="" name="checkboxs" onClick={(e) => { e.stopPropagation(); }} />
                                    </td>
                                }
                                <td>{dato.name}</td>
                                <td>{datos.evaluaciones[i]}</td>
                                {(rol === "ROLE_ESTUDIANTE") ? null :
                                    <td className="text-center" ><Button id={i} onClick={(e) => { e.stopPropagation(); onUpdate(e.target.id) }} variant="warning" size="sm">MD</Button></td>
                                }
                                {(rol === "ROLE_PROFESOR" || rol === "ROLE_ESTUDIANTE") ? null :
                                    <td className="text-center" ><Button id={i} onClick={(e) => { e.stopPropagation(); onDelete([e.target.id]) }} variant="danger" size="sm">BR</Button></td>
                                }
                            </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}
export default GuardiaTableAcceder