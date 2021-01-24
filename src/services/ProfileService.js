import axios from 'axios'

const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getProfile(){
        return apiClient.get('/profile')
    },

    updateExperince(request){
        return apiClient.post('/profile', request)
    }
}