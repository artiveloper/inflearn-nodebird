const setInterceptors = (api) => {
    api.interceptors.request.use(
        (config) => config,
        (config) => config,
    )
    return api
}

export default setInterceptors
