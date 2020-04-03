import React, { useCallback, useContext, useState } from 'react'
import Firebase from '../infrastructure/Firebase';
import { AuthContext } from '../utils/Auth';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import { Card, Button, Form, Input, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AppTemplate from '../ui/partials/AppTemplate';


const Login = (props: any) => {
    const [alertProps, setAlertProps] = useState({ type: "info", message: "", show: false })

    const handleSubmit = useCallback(formData => {
        Firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
        .then(resp => {
            if (resp) {
                setAlertProps({
                    show:true,
                    message:"Login Success",
                    type:"success"
                })
                props.history.push("/posts")
            }
        }).catch(err => {
            setAlertProps({
                show:true,
                message:err.message,
                type:"error"
            })
        })
    }, [props.history])

    const cont = useContext(AuthContext) as any


    if (cont.currentUser) {
        return <Redirect to="/posts" />
    }
    

    return (
        <AppTemplate alertProps={alertProps}>
            <Row>
                <Col span={12} offset={6} >
                    <Card title="Ingreso" style={{ textAlign: "center" }}>

                        <Form name="Login"
                            className="login-form"
                            initialValues={{ rememberMe: true }}
                            onFinish={handleSubmit}>
                            <Form.Item name="email" rules={[{ required: true, message: "Ingrese un correo válido" }]}>
                                <Input placeholder="Email"
                                    prefix={<UserOutlined className="site-form-item-icon" />} />

                            </Form.Item>

                            <Form.Item name="password" rules={[{ required: true, message: 'Ingrese una clave' }]} >
                                <Input placeholder="Clave"
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password" />
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked" >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>


                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">Ingresar </Button>
                                <br />
                                <Link to="/signup" >Registrarse</Link>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>

            </Row>

        </AppTemplate>

    )
}

export default Login