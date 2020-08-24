import axios from 'axios'

const apiUrl = 'http://localhost:3000'

const createApi = () => {
    const api = axios.create({
        baseURL: apiUrl,
    })
    return api
}

export const instance = createApi()
