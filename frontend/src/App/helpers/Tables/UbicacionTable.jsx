import React from 'react'
import { Button, Form, Table } from 'react-bootstrap'

const UbicacionTable = ({ datos = [], onDelete, onUpdate, rol }) => {
    function selectAllChecboks() {
        document.getElementsByName("checkboxs").forEach(checkbox => { if (!checkbox.checked) { checkbox.checked = true; } })
    }
    return (
        <Table responsive hover size="sm" className="mr-3">
            <thead>
                <tr>
                {(rol === "ROLE_VICDECEXTENCION" || rol === "ROLE_ESTUDIANTE") ? null :
                        <th style={{ width: "10px" }}><Button variant="dark" size="sm" onClick={selectAllChecboks}>ST</Button></th>
                    }
                    <th>Nombre</th>
                    <th>Solapin</th>
                    <th>Grupo</th>
                    <th>Apartamento</th>
                    {(rol === "ROLE_ESTUDIANTE") ? null :
                        <th className="text-center" style={{ width: "100px" }}>Modificar</th>
                    }
                    {(rol === "ROLE_VICDECEXTENCION" || rol === "ROLE_ESTUDIANTE") ? null :
                        <th className="text-center" style={{ width: "100px" }}>Borrar</th>
                    }
                </tr>
            </thead>
            <tbody>
                {
                    datos.map((dato, i) => (
                        <tr key={i}>
                             {(rol === "ROLE_VICDECEXTENCION" || rol === "ROLE_ESTUDIANTE") ? null :
                                <td className="text-center">
                                    <Form.Check id={dato.id} className="ml-1" type="checkbox" label="" name="checkboxs" />
                                </td>
                            }
                            <td>{dato.user.name}</td>
                            <td>{dato.user.solapin}</td>
                            <td>{dato.grupo}</td>
                            <td>{dato.apartamento}</td>
                            {(rol === "ROLE_ESTUDIANTE") ? null :
                                <td className="text-center" ><Button id={dato.id} onClick={(e) => { onUpdate(e.target.id) }} variant="warning" size="sm">MD</Button></td>
                            }
                            {(rol === "ROLE_VICDECEXTENCION" || rol === "ROLE_ESTUDIANTE") ? null :
                                <td className="text-center" ><Button id={dato.id} onClick={(e) => { onDelete([e.target.id]) }} variant="danger" size="sm">BR</Button></td>
                            }
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}
export default UbicacionTable