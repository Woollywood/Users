import axios from 'axios';

export class HttpService {
	constructor() {
		this.apiUrl = import.meta.env.VITE_API_URL;
		this._instance = this.init();
	}

	init() {
		const instance = axios.create({
			baseURL: this.apiUrl,
		});

		instance.interceptors.request.use((config) => {
			config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
			return config;
		});

		instance.interceptors.response.use(
			(config) => {
				return config;
			},
			async (error) => {
				const originalRequest = error.config;
				if (error.response?.status === 401 && error.config && !error._isRetry) {
					originalRequest._isRetry = true;
					try {
						const { data } = await this._instance.post('auth/refresh', {
							refreshToken: localStorage.getItem('refreshToken'),
						});
						localStorage.setItem('token', data.token);
						localStorage.setItem('refreshToken', data.refreshToken);
						return this._instance.request(originalRequest);
					} catch (error) {
						console.log('Пользователь не авторизован');
					}
				}
				throw error;
			}
		);

		return instance;
	}

	get instance() {
		return this._instance;
	}
}
