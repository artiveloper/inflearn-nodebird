import React from 'react'
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'
import Head from 'next/head'
import withReduxSaga from 'next-redux-saga'
import wrapper from '../stores/configureStore'

const NodeBird = ({ Component }) => (
    <>
        <Head>
            <meta charSet="utf-8" />
            <title>NodeBird</title>
        </Head>
        <Component />
    </>
)

NodeBird.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(withReduxSaga(NodeBird))
