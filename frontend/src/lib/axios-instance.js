import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';

/**
 * 
 * @typedef {Object} CreateAxiosConfig
 * @property {boolean} enableDefaultSuccessMesage
 * @property {Function} callbackUnauthorized
 * @property {Function} callbackSuccess
 */


/**
 * 
 * @param {CreateAxiosConfig} config
 * @returns {Axios}
 */
const createAxiosInstence = (config) => {
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://franciscodev.online/therapy/api';
    const axiosInstance = axios.create({
        baseURL
    });
    axiosInstance.interceptors.response.use(
        (response) => {
            if((response.status === 201 || response.status === 204) && config?.enableDefaultSuccessMesage) {
                toast.success('Dados salvos com sucesso.');
            }

            if(config?.callbackSuccess)
                config.callbackSuccess();


            return response;
        },
        (error) => {
            if (error.response) {
                if (error.response.status === 401) {
                    toast.error('Não autenticado.');
                    if(config?.callbackUnauthorized)
                        return config.callbackUnauthorized();
                    return;
                } else if (error.response.status === 404) {
                    toast.error('Recurso inexistente.');
                    return;
                }

                if(error.response.data?.message) {
                    if(typeof error.response.data.message === 'string') {
                        toast.error(error.response.data.message);
                        return;
                    }
                    if(error.response.data.message?.[0]) {
                        error.response.data.message.forEach(errorMessage => toast.error(errorMessage));
                        return;
                    }
                }
            }
            toast.error("Algo deu errado na operação.");
        }
    );

    return axiosInstance;
}

export {createAxiosInstence};