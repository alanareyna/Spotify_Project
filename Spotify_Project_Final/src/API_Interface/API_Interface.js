import axios from 'axios';

const AxiosConfigured = () => {
    // Indicate to the API that all requests for this app are AJAX
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain

    // BASEURL FOR BLUE:
    //axios.defaults.baseURL = `http://localhost:8064/api/v1`;
    
    // BASEURL FOR LOCAL:
    axios.defaults.baseURL = `http://localhost:8443/api/v1`;

    // Allow the browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;

    //axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;
    return axios;
};

const axiosAgent = AxiosConfigured();

export default class APIInterface {

    async getUserInfo(username) {
        console.log('We have called getUserInfo')
        return axiosAgent.get(`login/${username}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                 }));
    }

    async getUserPlaylists(username) {
        console.log('We have called getUserPlaylists');
        return axiosAgent.get(`playlist/${username}`)
            .then(info => info.data)
            .catch(error => ({
                error,
                playlists : undefined
            }));
    }

    async getSongsFromPlaylist(playlist) {
        console.log('We have called getSongsFromPlaylist');
        return axiosAgent.get(`song/${playlist}`)
            .then(info => info.data)
            .catch(error => ({
                error,
                songs : undefined
            }))
    }

    async getSongsFromPlaylistWithGenres(playlist) {
        console.log('We have called getSongsFromPlaylistWithGenres');
        return axiosAgent.get(`song/withgenre/${playlist}`)
            .then(info => info.data)
            .catch(error => ({
                error,
                songs : undefined
            }))
    }

    async register(username, password, firstName, lastName) {
        return axiosAgent.post(`/login/register`);
    }

    async getUser(username) {
        return axiosAgent.get(`/${username}`);
    }

    // async addPlaylist()

}

