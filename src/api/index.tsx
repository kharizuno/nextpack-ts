import axios, { HeadersDefaults } from 'axios';
import http from 'http';
import https from 'https';
import serialize from 'serialize-javascript';

// import { localStore } from '../helpers';

// interface CommonHeaders extends HeadersDefaults {
//     'Authorization': string;
//     'Content-Type': string;
//     'Access-Control-Allow-Origin': string;
// }

// axios.defaults.headers = {
//     'Authorization': '',
//     'Content-Type': '',
//     'Access-Control-Allow-Origin': ''
// } as CommonHeaders;

class HttpApi {

    static requestHeaders(multipart?: any) {
        // let token = localStore('_access_token');
        // axios.defaults.headers['Authorization'] = (token) ? `jwt ${localStore('_access_token')}` : '';
        // axios.defaults.headers = { 'Authorization': (token) ? `jwt ${localStore('_access_token')}` : '' } as CommonHeaders;

        if (!multipart) {
            axios.defaults.headers['Content-Type'] = 'application/json';
            // axios.defaults.headers = { 'Content-Type': 'application/json' } as CommonHeaders;
        }

        axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
        // axios.defaults.headers = { 'Access-Control-Allow-Origin': '*' } as CommonHeaders;
    }

    static requestConfig(cancelToken?: any) {
        let config = {
            httpAgent: new http.Agent({ keepAlive: true }),
            httpsAgent: new https.Agent({ keepAlive: true }),
            onDownloadProgress: (progressEvent: any) => {
                // let downloadCount = DownloadCount(progressEvent.timeStamp, progressEvent.total, progressEvent.loaded)
                // let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                // console.log(percentCompleted, progressEvent, 'DOWNLOAD')
            },
            onUploadProgress: (progressEvent: any) => {
                // let downloadCount = DownloadCount(progressEvent.timeStamp, progressEvent.total, progressEvent.loaded)
                // let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                // console.log(percentCompleted, progressEvent, 'UPLOAD')
            }
        }

        if (cancelToken) Object.assign(config, { cancelToken: cancelToken })
        return config;
    }

    static requestUrl(access: string | boolean) {
        switch (access) {
            default:
                return process.env.URL_WEB;
        }
    }

    static callGet(uri: string, data: any, access: string | boolean, cancelToken: any) {
        cancelToken = (cancelToken) ? cancelToken.token : '';

        this.requestHeaders();
        return axios.get(`${this.requestUrl(access)}/${uri}`, { params: data, cancelToken: cancelToken })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                let msg = { error: true, message: error.message };
                if (error.response) Object.assign(msg, error.response.data);

                if (axios.isCancel(error)) {
                    Object.assign(msg, { unmount: true });
                    console.log("Request cancelled", error.message);
                }

                return msg;
            });
    }

    static callPost(uri: string, data: any, access: string | boolean, multipart: any, cancelToken: any) {
        cancelToken = (cancelToken) ? cancelToken.token : '';

        this.requestHeaders(multipart);
        return axios.post(`${this.requestUrl(access)}/${uri}`, serialize(data, { isJSON: true }), this.requestConfig(cancelToken))
            .then(function (response) {
                if (multipart && multipart.progress === 100) {
                    // multipart.actprogress.loadProgress(false); 
                }

                return response.data;
            })
            .catch(function (error) {
                let msg = { error: true, message: error.message };
                if (error.response) Object.assign(msg, error.response.data);

                if (axios.isCancel(error)) {
                    Object.assign(msg, { unmount: true });
                    console.log("Request cancelled", error.message);
                }

                return msg;
            });
    }

    static callPut(uri: string, data: any, access: string | boolean, multipart: any, cancelToken: any) {
        cancelToken = (cancelToken) ? cancelToken.token : '';

        this.requestHeaders(multipart);
        return axios.put(`${this.requestUrl(access)}/${uri}`, serialize(data, { isJSON: true }), this.requestConfig(cancelToken))
            .then(function (response) {
                if (multipart && multipart.progress === 100) {
                    // multipart.actprogress.loadProgress(false); 
                }

                return response.data;
            })
            .catch(function (error) {
                let msg = { error: true, message: error.message };
                if (error.response) Object.assign(msg, error.response.data);

                if (axios.isCancel(error)) {
                    Object.assign(msg, { unmount: true });
                    console.log("Request cancelled", error.message);
                }

                return msg;
            });
    }

    static callDelete(uri: string, data: any, access: string | boolean, cancelToken: any) {
        cancelToken = (cancelToken) ? cancelToken.token : '';

        this.requestHeaders();
        return axios.delete(`${this.requestUrl(access)}/${uri}`, this.requestConfig(cancelToken))
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                let msg = { error: true, message: error.message };
                if (error.response) Object.assign(msg, error.response.data);

                if (axios.isCancel(error)) {
                    Object.assign(msg, { unmount: true });
                    console.log("Request cancelled", error.message);
                }

                return msg;
            });
    }
}

export default HttpApi;
