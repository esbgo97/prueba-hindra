import React from 'react'
import { Layout, Typography, Alert } from 'antd';

const AppTemplate = (props: any) => {
    const {alertProps} = props

    return (<Layout>
        <Layout.Header>
            <Typography.Title style={{ color: "white" }}>
                {props.title || "Testing App"}
            </Typography.Title>
        </Layout.Header>
        <Layout.Content >
            <br />
            {props.children || 'Content'}
        </Layout.Content>
        <Layout.Footer style={{textAlign:"center"}}>
            Powered by esbgo97
        </Layout.Footer>
        {alertProps.show ? <Alert type={alertProps.type}  message={alertProps.message} showIcon/>:null}
        
    </Layout>)
}

export default AppTemplate