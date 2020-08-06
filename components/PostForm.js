import React from 'react'
import {
    Form,
    Input
} from 'antd'

const PostForm = () => {
    return (
        <Form
            style={{margin: '10px 0 20px'}}
            encType='multipart/form-data'
            onFinish={onSubmit}
        >
            <Input.TextArea
                value={text}
                onChange={onChangeTest}
                maxLength={140}
            />
        </Form>
    )
}

export default PostForm
