import React from 'react'
import { Col, InputGroup, FormControl } from 'react-bootstrap'
import UsersForm from '../helpers/Forms/UsersForm'
import UsersTable from '../helpers/Tables/UsersTable'
export default class Users extends React.Component {
    render() {
        return (
            <>
                <Col xs="3" className="border-right border-top">
                    <UsersForm />
                </Col>
                <Col className="border-top">
                    <InputGroup className="mb-3 mt-2">
                        <FormControl placeholder="Filtrar"/>
                    </InputGroup>
                    <UsersTable />
                </Col>
            </>
        )
    }
}