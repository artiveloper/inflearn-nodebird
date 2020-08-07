import React, {useCallback, useRef, useState} from 'react'
import {
    Button,
    Form,
    Input
} from 'antd'
import {useDispatch, useSelector} from 'react-redux';
import {addPost} from '../reducers/post';

const PostForm = () => {

    const [text, setText] = useState('')
    const imageInput = useRef()

    const dispatch = useDispatch()
    const {imagePaths} = useSelector((state) => state.post)

    const onChangeText = useCallback((e) => {
        setText(e.target.value)
    }, [])

    const onSubmit = useCallback(() => {
        dispatch(addPost)
        setText('')
    }, [])

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click()
    }, [imageInput.current])

    return (
        <Form
            style={{margin: '10px 0 20px'}}
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
                <input type="file" multiple hidden ref={imageInput}/>
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button
                    type="primary"
                    style={{float: 'right'}}
                    htmlType="submit"
                >
                    짹짹
                </Button>
            </div>
            <div>
                {
                    imagePaths.map(image => (
                        <div key={image} style={{display: 'inline-block'}}>
                            <img src={image} style={{width: '200px'}} alt={image} />
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
