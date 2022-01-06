import axios from 'axios';
import * as AuthService from '../utils/AuthService';
import * as Loader from '../common/Loader/Loader';
import { store } from '../../store';
import ErrorHandler from './ErrorHandler';


export const setAxiosInterceptor = () => {
    axios.interceptors.response.use(response => {
        store.dispatch(Loader.hideLoader());
        return response;
    }, ErrorHandler);
    axios.interceptors.request.use((config) => {
        if (AuthService.isAuthenticated()) {

            //przy każdym request pobiera token z local storage
            config.headers.Authorization = "Bearer " + AuthService.getToken();
        }
        store.dispatch(Loader.showLoader());
        return config;
    }, error => Promise.reject(error))
}