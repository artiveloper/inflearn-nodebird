import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppLayout from '../components/AppLayout'
import PostForm from '../components/post/PostForm'
import PostCard from '../components/post/PostCard'
import { LOAD_POSTS_REQUEST } from '../reducers/post'
import { LOAD_USER_REQUEST } from '../reducers/user'

const Home = () => {
    const dispatch = useDispatch()
    const { me } = useSelector((state) => state.user)
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post)

    useEffect(() => {
        dispatch({
            type: LOAD_USER_REQUEST,
        })
        dispatch({
            type: LOAD_POSTS_REQUEST,
        })
    }, [])

    useEffect(() => {
        function onScroll() {
            // eslint-disable-next-line max-len
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMorePosts && !loadPostsLoading) {
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                    })
                }
            }
        }
        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [hasMorePosts, loadPostsLoading])

    return (
        <AppLayout>
            {me && <PostForm />}
            {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </AppLayout>
    )
}

export default Home
