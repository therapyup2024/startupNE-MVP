import { toast } from "react-toastify";
import { createAxiosInstence } from "../lib/axios-instance";

/**
 * @callback RedirectFn
 * @param {string} path
 * @returns {void}
 */

/**
 * Dados de um profissional
 * @typedef {Object} ProfessionalDTO
 * @property {string} uid
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} gender
 * @property {string} document
 * @property {string} license_number
 * @property {string} specialty
 * @property {string} approach
 * @property {string} description
 */

/**
 * Dados para registrar um profissional
 * @typedef {Object} ProfessionalRegisterDTO
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {string} phone
 * @property {string} gender
 * @property {string} document
 * @property {string} license_number
 * @property {string} specialty
 * @property {string} approach
 * @property {string} description
 */

/**
 * Dados para login de profissional
 * @typedef {Object} ProfessionalLoginDTO
 * @property {string} email
 * @property {string} password
 */

/**
 * Dados para validar perfil de profissional
 * @typedef {Object} ProfessionalValidateDTO
 * @property {string} code
 * @property {string} email
 */

/**
 * Dados para atualizar um profissional
 * @typedef {Object} ProfessionalUpdateDTO
 * @property {string} [name]
 * @property {string} [password]
 * @property {string} [phone]
 * @property {string} [gender]
 * @property {string} [document]
 * @property {string} [license_number]
 * @property {string} [specialty]
 * @property {string} [approach]
 * @property {string} [description]
 */

/* -------------------------------------- */

/**
 * Dados para registrar um cliente
 * @typedef {Object} CustomerDTO
 * @property {string} uid
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} gender
 * @property {string} document
 * @property {boolean} is_foreigner
 */

/**
 * Dados para registrar um cliente
 * @typedef {Object} CustomerRegisterDTO
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {string} phone
 * @property {string} gender
 * @property {string} document
 * @property {boolean} is_foreigner
 */

/**
 * Dados para login de cliente
 * @typedef {Object} CustomerLoginDTO
 * @property {string} email
 * @property {string} password
 */

/**
 * Dados para validar perfil de cliente
 * @typedef {Object} CustomerValidateDTO
 * @property {string} code
 * @property {string} email
 */

/**
 * Dados para atualizar um cliente
 * @typedef {Object} CustomerUpdateDTO
 * @property {string} [name]
 * @property {string} [email]
 * @property {string} [password]
 * @property {string} [phone]
 * @property {string} [gender]
 * @property {string} [document]
 * @property {boolean} [is_foreigner]
 */

/* -------------------------------------- */

/**
 * Dados de um termo de uso / contrato
 * @typedef {Object} AgreementDTO
 * @property {number} id
 * @property {string} name
 * @property {string} text
 * @property {string} type
 */

/**
 * Dados de um termo de uso / contrato
 * @typedef {Object} AgreementRegisterDTO
 * @property {string} name
 * @property {string} text
 * @property {string} type
 */

/* -------------------------------------- */

/**
 * Dados de criação/edição de agendamento
 * @typedef {Object} AppointmentDTO
 * @property {string} uid
 * @property {CustomerDTO} customer
 * @property {ProfessionalDTO} professional
 * @property {string} title
 * @property {string} description
 * @property {string} notes
 * @property {string} start_at
 * @property {string} finish_at
 */

/**
 * Dados de criação/edição de agendamento
 * @typedef {Object} AppointmentRegisterDTO
 * @property {string} customer_uid
 * @property {string} professional_uid
 * @property {string} title
 * @property {string} description
 * @property {string} notes
 * @property {string} start_at
 * @property {string} finish_at
 */

/* -------------------------------------- */

/**
 * Retorno da função apiServer
 * @typedef {Object} ApiServer
 * @property {Object} professional
 * @property {function(ProfessionalRegisterDTO): Promise<any>} professional.register
 * @property {function(ProfessionalLoginDTO): Promise<any>} professional.login
 * @property {function(ProfessionalValidateDTO): Promise<any>} professional.validateProfile
 * @property {function(): Promise<{ data: ProfessionalDTO[] }>} professional.list
 * @property {function(string): Promise<ProfessionalDTO>} professional.getOne
 * @property {function(): Promise<ProfessionalDTO>} professional.profile
 * @property {function(string, ProfessionalUpdateDTO): Promise<any>} professional.update
 * @property {function(string): Promise<any>} professional.remove
 *
 * @property {Object} customer
 * @property {function(CustomerRegisterDTO): Promise<any>} customer.register
 * @property {function(CustomerLoginDTO): Promise<any>} customer.login
 * @property {function(CustomerValidateDTO): Promise<any>} customer.validateProfile
 * @property {function(): Promise<{ data: CustomerDTO[] }>} customer.list
 * @property {function(string): Promise<CustomerDTO>} customer.getOne
 * @property {function(): Promise<CustomerDTO>} customer.profile
 * @property {function(string, CustomerUpdateDTO): Promise<any>} customer.update
 * @property {function(string): Promise<any>} customer.remove
 *
 * @property {Object} agreement
 * @property {function(AgreementRegisterDTO): Promise<any>} agreement.register
 * @property {function(): Promise<{ data: AgreementDTO[] }>} agreement.list
 * @property {function(string): Promise<AgreementDTO>} agreement.getOne
 * @property {function(string, AgreementRegisterDTO): Promise<any>} agreement.update
 * @property {function(string): Promise<any>} agreement.remove
 *
 * @property {Object} appointment
 * @property {function(AppointmentRegisterDTO): Promise<any>} appointment.register
 * @property {function(): Promise<{ data: AppointmentDTO[] }>} appointment.list
 * @property {function(string): Promise<AppointmentDTO>} appointment.getOne
 * @property {function(string, AppointmentRegisterDTO): Promise<any>} appointment.update
 * @property {function(string): Promise<any>} appointment.remove
 *
 * @property {Object} upload
 * @property {function(string): Promise<any>} upload.profile
 *
 * @property {function(): {headers: {Authorization: string}}} getHeaders
 * @property {function(string): void} setAuthorizationToken
 * @property {function(): string|null} getAuthorizationToken
 */

/**
 * 
 * @param {RedirectFn} redirect Função que executa um redirecionamento.
 * @returns {ApiServer}
 */
export const apiServer = (redirect) => {
    const axiosInstance = createAxiosInstence({ callbackUnauthorized: () => redirect("/role-selection"), enableDefaultSuccessMesage: true });
    const axiosNoSuccessMessageInstance = createAxiosInstence({ callbackUnauthorized: () => redirect("/role-selection") });
    const apiServerObject = {
        professional: {
            register: async function ({
                name,
                email,
                password,
                phone,
                gender,
                document,
                license_number,
                specialty,
                approach,
                description,
            }) {
                return ( await createAxiosInstence({ callbackSuccess: () => {
                    toast.success("Cadastro realizado com sucesso!");
                    toast.success("Aguarde um email de confirmação.");
                    redirect("/login-profissional")
                }}).post('professional', {
                    name,
                    email,
                    password,
                    phone,
                    gender,
                    document,
                    license_number,
                    specialty,
                    approach,
                    description,
                })).data;
            },

            login: async function ({
                email,
                password
            }) {
                const result = await axiosNoSuccessMessageInstance.post('auth/login', {
                    username: email,
                    password,
                    type: "professional"
                })

                if(result?.data?.access_token) {
                    apiServerObject.setAuthorizationToken(result.data.access_token);
                    redirect("/specialist");
                }
            },

            validateProfile: async function ({
                code,
                email
            }) {
                return (await createAxiosInstence({ callbackSuccess: () => {
                    toast.success("Cadastro confirmado com sucesso.");
                    redirect("/login-profissional")
                } }).post('professional/validate', {
                    code,
                    email
                })).data;
            },

            list: async function () {
                return (await axiosInstance.get('professional', {
                    ...apiServerObject.getHeaders()
                })).data
            },

            getOne: async function (uid) {
                return (await axiosInstance.get('professional/' + uid, {
                    ...apiServerObject.getHeaders()
                })).data
            },

            profile: async function () {
                return (await axiosInstance.get('professional/profile', {
                    ...apiServerObject.getHeaders()
                })).data
            },

            update: async function (uid, {
                name,
                password,
                phone,
                gender,
                document,
                license_number,
                specialty,
                approach,
                description
            }) {
                return (await axiosInstance.patch('professional/' + uid,{
                    name,
                    password,
                    phone,
                    gender,
                    document,
                    license_number,
                    specialty,
                    approach,
                    description
                }, {
                    ...apiServerObject.getHeaders()
                })).data
            },

            remove: async function (uid) {
                return (await axiosInstance.delete('professional/' + uid, {
                    ...apiServerObject.getHeaders()
                })).data
            }
        },

        customer: {
            register: async function ({
                name,
                email,
                password,
                phone,
                gender,
                document,
                is_foreigner
            }) {
                return (await createAxiosInstence({ callbackSuccess: () => {
                    toast.success("Cadastro realizado com sucesso!");
                    toast.success("Aguarde um email de confirmação.");
                    redirect("/login-cliente")
                }}).post('customer', {
                    name,
                    email,
                    password,
                    phone,
                    gender,
                    document,
                    is_foreigner
                })).data
            },

            login: async function ({
                email,
                password
            }) {
                const result = await axiosNoSuccessMessageInstance.post('auth/login', {
                    username: email,
                    password,
                    type: "customer"
                })

                if(result?.data?.access_token) {
                    apiServerObject.setAuthorizationToken(result.data.access_token);
                    redirect("/patient");
                }
            },

            validateProfile: async function ({
                code,
                email
            }) {
                return (await createAxiosInstence({ callbackSuccess: () => {
                    toast.success("Cadastro confirmado com sucesso.");
                    redirect("/login-cliente")
                } }).post('customer/validate', {
                    code,
                    email
                })).data
            },

            list: async function () {
                return (await axiosInstance.get('customer', {
                    ...apiServerObject.getHeaders()
                })).data
            },

            getOne: async function (uid) {
                return (await axiosInstance.get('customer/' + uid, {
                    ...apiServerObject.getHeaders()
                })).data
            },

            profile: async function () {
                return (await axiosInstance.get('customer/profile', {
                    ...apiServerObject.getHeaders()
                })).data
            },

            update: async function (uid, {
                name,
                email,
                password,
                phone,
                gender,
                document,
                is_foreigner
            }) {
                return (await axiosInstance.patch('customer/' + uid,{
                    name,
                    email,
                    password,
                    phone,
                    gender,
                    document,
                    is_foreigner
                }, {
                    ...apiServerObject.getHeaders()
                })).data
            },

            remove: async function (uid) {
                return (await axiosInstance.delete('customer/' + uid, {
                    ...apiServerObject.getHeaders()
                })).data
            }
        },

        agreement: {
            register: async function ({
                name,
                text,
                type
            }) {
                return (await axiosInstance.post('agreement', {
                    name,
                    text,
                    type
                })).data
            },

            list: async function () {
                return (await axiosInstance.get('agreement', {
                    ...apiServerObject.getHeaders()
                })).data
            },

            getOne: async function (uid) {
                return (await axiosInstance.get('agreement/' + uid, {
                    ...apiServerObject.getHeaders()
                })).data
            },

            update: async function (uid, {
                name,
                text,
                type
            }) {
                return (await axiosInstance.patch('agreement/' + uid,{
                    name,
                    text,
                    type
                }, {
                    ...apiServerObject.getHeaders()
                })).data
            },

            remove: async function (uid) {
                return (await axiosInstance.delete('agreement/' + uid, {
                    ...apiServerObject.getHeaders()
                })).data
            }
        },

        appointment: {
            register: async function ({
                customer_uid,
                professional_uid,
                title,
                description,
                notes,
                start_at,
                finish_at
            }) {
                return (await axiosInstance.post('appointment', {
                    customer_uid,
                    professional_uid,
                    title,
                    description,
                    notes,
                    start_at,
                    finish_at
                })).data
            },

            list: async function () {
                return (await axiosInstance.get('appointment', {
                    ...apiServerObject.getHeaders()
                })).data
            },

            getOne: async function (uid) {
                return ( await axiosInstance.get('appointment/' + uid, {
                    ...apiServerObject.getHeaders()
                })).data
            },

            update: async function (uid, {
                customer_uid,
                professional_uid,
                title,
                description,
                notes,
                start_at,
                finish_at
            }) {
                return (await axiosInstance.patch('appointment/' + uid,{
                    customer_uid,
                    professional_uid,
                    title,
                    description,
                    notes,
                    start_at,
                    finish_at
                }, {
                    ...apiServerObject.getHeaders()
                })).data
            },

            remove: async function (uid) {
                return (await axiosInstance.delete('appointment/' + uid, {
                    ...apiServerObject.getHeaders()
                })).data
            }
        },

        upload: {
            profile: async function (fileInputSelector) {
                let formData = new FormData();
                const fileInput = document.querySelector(fileInputSelector);
                formData.append('file', fileInput.files[0]);
                const headers = {
                    ...apiServerObject.getHeaders()
                }
                headers.headers['Content-Type'] = 'multipart/form-data';
                return ( await axiosInstance.post('image-upload/avatar', formData, headers)).data
            }
        },
        
        getHeaders: function() {
            return {
                headers: {
                    Authorization: "Bearer " + apiServerObject.getAuthorizationToken()
                }
            }
        },

        setAuthorizationToken: function (token) {
            window.localStorage.setItem('therapy-access-token', token)
        },

        getAuthorizationToken: function () {
            return window.localStorage.getItem('therapy-access-token')
        }
    };
    return apiServerObject;
}