import { instance } from './index'

const loadPostsApi = (data) => instance.get('/posts', {
    content: data,
})

const addPostApi = (data) => instance.post('/post', {
    content: data,
})

const addCommentApi = (data) => instance.post(`/post/${data.postId}/comment`, data)

export {
    loadPostsApi,
    addPostApi,
    addCommentApi,
}
