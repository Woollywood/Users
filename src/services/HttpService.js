import axios from 'axios';

export class HttpService {
	constructor() {
		this.apiUrl = import.meta.env.VITE_API_URL;
		this._instance = this.init();
	}

	init() {
		const instance = axios.create({
			baseURL: this.apiUrl,
			timeout: 1000,
		});

		instance.interceptors.request.use((config) => {
			config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
			return config;
		});

		return instance;
	}

	get instance() {
		return this._instance;
	}
}
