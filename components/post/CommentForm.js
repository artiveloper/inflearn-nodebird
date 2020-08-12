import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_COMMENT_REQUEST } from '../../reducers/post'

const CommentForm = ({ post }) => {
    const [commentText, setCommentText] = useState('')

    const dispatch = useDispatch()
    const id = useSelector((state) => state.user.me?.id)
    const { addCommentDone } = useSelector((state) => state.post)

    useEffect(() => {
        if (addCommentDone) setCommentText('')
    }, addCommentDone)

    const onChangeComment = useCallback((e) => {
        setCommentText(e.target.value)
    }, [])

    const onSubmitComment = useCallback(() => {
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                content: commentText,
                postId: post.id,
                userId: id,
            },
        })
    }, [commentText, id])

    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{ position: 'relative', margin: 0 }}>
                <Input.TextArea
                    value={commentText}
                    onChange={onChangeComment}
                    rows={4}
                />
                <Button
                    style={{ position: 'absolute', right: 0, bottom: -40 }}
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
    post: PropTypes.object.isRequired,
}

export default CommentForm
