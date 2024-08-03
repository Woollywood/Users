import { HttpService } from './HttpService';

export class AuthService {
	static async login(username, password) {
		const service = new HttpService();
		const httpService = service.instance;
		const { data } = await httpService.post(
			'user/login',
			{ username, password },
			{ headers: { 'Content-Type': 'application/json' } }
		);
		localStorage.setItem('token', data.token);
		localStorage.setItem('refreshToken', data.refreshToken);
		return data;
	}

	static async getMe() {
		const service = new HttpService();
		const httpService = service.instance;
		return await httpService.get('user/me');
	}
}
