import React from 'react'
import { Form, TextInput } from './form'
import { Form as BForm, Button, Card, Col, Row, Container } from 'react-bootstrap'
import { useLogin } from '../flows/auth'
import { useHistory } from 'react-router-dom'
import { useMe } from '../flows/data'

export function LoginDialog() {
    const { isLoading, isDone, initiateLogin, error } = useLogin()
    const me = useMe()
    const history = useHistory()

    if (me.loggedIn) {
        switch (me.role) {
            case 'doctor':
                history.push('/booking')
                break
            default:
                history.push('/testcenter')
        }
    }

    const onSubmit = values => {
        initiateLogin(values.email)
    }

    return (
        <Container >
            <Row style={{ height: "80vh" }}>
                <Col className="m-auto border p-4 m-2 rounded" md="4">
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
                                    <Button block disabled={isLoading} type="submit">Login</Button>
                                </Form>
                            </>
                    }
                </Col>
            </Row>
        </Container>
    )
}
