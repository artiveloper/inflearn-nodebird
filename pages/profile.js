import React from 'react'
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';

const Profile = () => {

    const followers = [{nickname: '제로초'}, {nickname: '제로초2'}, {nickname: '제로초3'}]
    const followings = [{nickname: '제로초'}, {nickname: '제로초2'}, {nickname: '제로초3'}]

    return (
        <>
            <Head>
                <title>프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉 목록" data={followings}/>
                <FollowList header="팔로워 목록" data={followers}/>
            </AppLayout>
        </>
    )
}

export default Profile
