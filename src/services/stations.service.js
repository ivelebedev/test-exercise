//import config from 'config';
//import { authHeader } from '../helpers';

export const stationsService = {
    getAll,
	getById
};

function getAll() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch('http://h136631.s26.test-hf.su/radio/', requestOptions).then(handleResponse);
}

function getById(id) {
	console.log(id);
	const requestOptions = {
        method: 'GET'
    };

    return fetch('http://h136631.s26.test-hf.su/radio/?get=tracks&id='+id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}