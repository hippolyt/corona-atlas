import React from 'react'
import { Form, TextInput } from './form'
import { Form as BForm, Button, Card, Col, Row } from 'react-bootstrap'
import { useLogin } from '../flows/auth'

export function LoginDialog() {
    const { isLoading, isDone, initiateLogin, error } = useLogin()

    const onSubmit = values => {
        initiateLogin(values.email)
    }

    return (
        <Row>
            <Col className="m-auto border p-2 rounded" md="4">
                {
                    isDone ? <>
                        <p>Es wurde eine Email mit einem login Link verschickt</p>
                        <Button>Laden</Button>
                    </>
                        :
                        <>
                            <p className="text-danger">{error}</p>
                            <Form onSubmit={onSubmit}>
                                <BForm.Group controlId="email">
                                    <TextInput disabled={isLoading} placeholder="name@domain.de" field="email" />
                                </BForm.Group>
                                <Button disabled={isLoading} type="submit">Login</Button>
                            </Form>
                        </>
                }
            </Col>
        </Row>
    )
}
