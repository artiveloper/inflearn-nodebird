import React from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import AppLayout from '../components/AppLayout'
import FollowList from '../components/FollowList'
import NicknameEditForm from '../components/NicknameEditForm'

const Profile = () => {
    const { me } = useSelector((state) => state.user)

    return (
        <>
            <Head>
                <title>프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉 목록" data={me.Followings} />
                <FollowList header="팔로워 목록" data={me.Followers} />
            </AppLayout>
        </>
    )
}

export default Profile
