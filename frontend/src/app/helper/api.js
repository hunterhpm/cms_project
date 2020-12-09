import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const LOGIN_URL = "adm/token/"
const ME_URL = "adm/users/me"

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`
  }

export default function login(username, password) {
    return axios.post(API_URL + LOGIN_URL, { username, password })
}

export function me(Authorization) {
    return axios.get(API_URL + ME_URL,  {
        headers: {
           Authorization: `Bearer ${Authorization.access}` ,
           'Content-Type': 'application/json'
        }
  })
}

export function list(endpoint, params={}) {
	let config = {
	  headers: headers,
	  params: params,
	}
	return axios.get(API_URL + endpoint, config).then(response => {
		if(response.data.results !== undefined) {
			// pagination response handling there :)
			response.extra_data = {
				count : response.data.count,
				next : response.data.next,
				previous : response.data.previous,
			}
			response.data = response.data.results;
    }
		return response;
	})
}

export function patch(endpoint, data) {
  let config = {
    headers: headers,
  }
  return axios.put(API_URL + endpoint, data, config)
}

export function post(endpoint, data) {
  let config = {
    headers: headers,
  }
  return axios.post(API_URL + endpoint, data, config)
}

export function del(endpoint, data = {}) {
  let config = {
    headers: headers,
    data: data,
  }
  return axios.delete(API_URL + endpoint, config)
}
