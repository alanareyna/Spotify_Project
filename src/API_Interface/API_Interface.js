import axios from 'axios';

const AxiosConfigured = () => {
    // Indicate to the API that all requests for this app are AJAX
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain
    // axios.defaults.baseURL = `http://localhost:8443/api/v1`;
    // Uncomment the following line if the API server runs on the same host as your UI server.
    axios.defaults.baseURL = `http://localhost:8443/home`;

    // Allow the browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;

    //axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;
    return axios;
};

const axiosAgent = AxiosConfigured();

export default class APIInterface {

    async getUserInfo(user_id) {
        return axiosAgent.get(`login/${user_id}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                 }));
    }

    async register(username, password, firstName, lastName) {
        return axiosAgent.post(`/login/register`);
    }

    async getUser(username) {
        return axiosAgent.get(`/${username}`);
    }

    

}

