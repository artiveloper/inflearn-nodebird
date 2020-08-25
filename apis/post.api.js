import { instance } from './index'

const addPostApi = (data) => instance.post('/post', {
    content: data,
})

const addCommentApi = (data) => instance.post(`/post/${data.postId}/comment`, data)

export {
    addPostApi,
    addCommentApi,
}
