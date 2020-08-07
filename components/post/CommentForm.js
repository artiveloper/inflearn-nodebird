import React, {useCallback, useState} from 'react'
import PropTypes from 'prop-types'
import {Form, Input, Button} from 'antd';
import {useSelector} from 'react-redux';

const CommentForm = ({post}) => {

    const [commentText, setCommentText] = useState('');
    const id = useSelector((state) => state.user.me?.id)

    const onChangeComment = useCallback((e) => {
        setCommentText(e.target.value)
    }, [])

    const onSubmitComment = useCallback(() => {
        console.log(post.id, commentText)
    }, [commentText])

    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{position: 'relative', margin: 0}}>
                <Input.TextArea
                    value={commentText}
                    onChange={onChangeComment}
                    rows={4}
                />
                <Button
                    style={{position: 'absolute', right: 0, bottom: -40}}
                    type="primary"
                    htmlType="submit"
                >
                    삐약
                </Button>
            </Form.Item>
        </Form>
    )
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired
}

export default CommentForm
