import React, { useCallback, useEffect, useRef } from 'react'
import {
    Button,
    Form,
    Input,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../../reducers/post'
import useInput from '../../hooks/useInput'

const PostForm = () => {
    const [text, onChangeText, setText] = useInput('')

    const imageInput = useRef()

    const dispatch = useDispatch()
    const { imagePaths, addPostLoading, addPostDone } = useSelector((state) => state.post)

    useEffect(() => {
        if (addPostDone) {
            setText('')
        }
    }, [addPostDone])

    const onSubmit = useCallback(() => {
        dispatch(addPost(text))
    }, [text])

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click()
    }, [imageInput.current])

    return (
        <Form
            style={{ margin: '10px 0 20px' }}
            encType="multipart/form-data"
            onFinish={onSubmit}
        >
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="어떤 신기한 일이 있나요?"
            />
            <div>
                <input type="file" multiple hidden ref={imageInput} />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button
                    type="primary"
                    style={{ float: 'right' }}
                    htmlType="submit"
                    loading={addPostLoading}
                >
                    짹짹
                </Button>
            </div>
            <div>
                {
                    imagePaths.map((image) => (
                        <div key={image} style={{ display: 'inline-block' }}>
                            <img src={image} style={{ width: '200px' }} alt={image} />
                            <div>
                                <Button>제거</Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Form>
    )
}

export default PostForm
