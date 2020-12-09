import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import login, {me}  from '../../helper/api';
import {REACT_BASE_URL} from '../../helper/static_data'
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
	init() {
		// this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			console.log('invalid');
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
			axios.post('/api/auth/register', data).then(response => {
				if (response.data.user) {
					this.setSession(response.data.access_token);
					resolve(response.data.user);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	signInWithUsernameAndPassword = (username, password) => {
		return new Promise((resolve, reject) => {
			login(username, password).then((response)=>{
				this.setSession(response.data.access);
				me(response.data).then((res)=>{
					let user= {
							role: 'admin',
							data: {
								displayName: `${res.data.first_name} ${res.data.last_name}`,
								photoURL: 'static/images/avatars/Abbott.jpg',
								email: res.data.email,
								settings: {
									layout: {
										style: 'layout1',
										config: {
											scroll: 'content',
											navbar: {
												display: true,
												folded: true,
												position: 'left'
											},
											toolbar: {
												display: true,
												style: 'fixed',
												position: 'below'
											},
											footer: {
												display: true,
												style: 'fixed',
												position: 'below'
											},
											mode: 'fullwidth'
										}
									},
									customScrollbars: true,
									theme: {
										main: 'mainThemeLight',
										navbar: 'defaultDark',
										toolbar: 'defaultDark',
										footer: 'defaultDark'
									}
								}
							}
						}	
					if (res.data.username) {
						resolve(user);
					} else {
						reject(res.data.error);
					}

					window.location.assign(`/${REACT_BASE_URL}`)
				})
				
			});
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			axios
				.get(process.env.REACT_APP_API_URL+'adm/users/me', {
					data: {
						access_token: this.getAccessToken()
					}
				})
				.then(res => {
					if (res.data.username) {
						let user= {
							role: 'admin',
							data: {
								displayName: `${res.data.first_name} ${res.data.last_name}`,
								photoURL: 'static/images/avatars/Abbott.jpg',
								email: res.data.email,
								settings: {
									layout: {
										style: 'layout1',
										config: {
											scroll: 'content',
											navbar: {
												display: true,
												folded: true,
												position: 'left'
											},
											toolbar: {
												display: true,
												style: 'fixed',
												position: 'below'
											},
											footer: {
												display: true,
												style: 'fixed',
												position: 'below'
											},
											mode: 'fullwidth'
										}
									},
									customScrollbars: true,
									theme: {
										main: 'mainThemeLight',
										navbar: 'defaultDark',
										toolbar: 'defaultDark',
										footer: 'defaultDark'
									}
								}
							}
						}
						resolve(user);
					} else {
						this.logout();
						Promise.reject(new Error('Failed to login with token.'));
					}
				})
				.catch(error => {
					this.logout();
					Promise.reject(new Error('Failed to login with token.'));
				});
		});
	};

	updateUserData = user => {
		return axios.post('/api/auth/user/update', {
			user
		});
	};

	setSession = access_token => {
		console.log('setSession')
		if (access_token) {
			localStorage.setItem('jwt_access_token', access_token);
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			console.log('running')
			localStorage.removeItem('jwt_access_token');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return localStorage.getItem('jwt_access_token');
	};
}

const instance = new JwtService();

export default instance;
