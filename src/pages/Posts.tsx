import React, { Component } from 'react'
import Firebase from '../infrastructure/Firebase'
import AppTemplate from '../ui/partials/AppTemplate';
import { Row, Col, Button, Card, Form, Input, List, Avatar } from 'antd';
import { } from '@ant-design/icons'

class Post extends Component<any, any> {
    db: any = null;

    constructor(props: any) {
        super(props);
        this.state = {
            posts: [],
            alert: { type: "info", message: "", show: false }
        }
        this.db = Firebase.database().ref().child('Post');
    }
    async componentDidMount() {
        const posts = this.state.posts
        this.db.on('child_added', (snap: any) => {
            posts.push({
                postsId: snap.key,
                name: snap.val().name,
                text: snap.val().text
            })
            this.setState({ posts })
        })
    }
    handleSubmit = (formData: any) => {
        const post = {
            user: Firebase.auth().currentUser?.uid || "",
            ...formData
        };
        this.db.push().set(post).then((resp: any) => {
            this.setState({
                alert: {
                    show: true,
                    type: "info",
                    message: "Adde Posts"
                }
            })
        }).catch((err: Error) => {
            this.setState({
                alert: {
                    show: true,
                    type: "error",
                    message: err.message
                }
            })
        })
    }

    render() {


        return (
            <AppTemplate title="Post Page" alertProps={this.state.alert}>
                <Row gutter={[16, 16]} >
                    <Col span={6}>
                        <Card title="Publish new Post">
                            <Form onFinish={this.handleSubmit}>
                                <Form.Item name="name" rules={[{ required: true, message: "Ingrese un nombre" }]}>
                                    <Input placeholder="Nombre" />
                                </Form.Item>

                                <Form.Item name="text" rules={[{ required: true, message: "Ingrese un nombre" }]}>
                                    <Input placeholder="Contenido" />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" >Publicar</Button>
                                </Form.Item>

                            </Form>

                        </Card>

                    </Col>
                    <Col  span={12}>
                        <Card >
                            <List itemLayout="horizontal"
                                dataSource={this.state.posts}
                                renderItem={(post: any) => (<List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                        title={post.name}
                                        description={post.text}
                                    />
                                </List.Item>)}
                            />
                        </Card>

                    </Col>
                    <Col span={6}>
                        <Card title="Users">

                        </Card>
                    </Col>
                </Row>
                <br />

                <Button type="primary" onClick={() => { Firebase.auth().signOut() }}>Salir</Button>
            </AppTemplate>

        )
    }
}

export default Post