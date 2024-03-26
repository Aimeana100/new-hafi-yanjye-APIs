import { user } from '../shared/types';
import { decryptAndRetrieveToken, encryptTokenAndStoreToLocalStorage, serverUrl } from './../shared/constants';
import axios from 'axios'

const instance = axios.create({
    baseURL: serverUrl
})


instance.interceptors.response.use(function (response) {
    if (response.data && response.data.data && response.data.data.user) {

        encryptTokenAndStoreToLocalStorage(response.data.data.token)

        const user: user = {
            fullname: response.data.data.user.fullName,
            email: response.data.data.user.email,
            telphone: response.data.data.user.telphone,
            id: response.data.data.user.id,
            role: response.data.data.user.role,
        }

        localStorage.setItem('user', JSON.stringify(user))
        response.data.data.user = user

    }
    return response
})


instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');

    if (token) {
        const decryptedToken = decryptAndRetrieveToken();

        // console.log('decryptedToken', decryptedToken);

        config.headers['Authorization'] = `Bearer ${decryptedToken}`;
    }

    return config;
}, function (error) {

    return Promise.reject(error);
});









export default instance;