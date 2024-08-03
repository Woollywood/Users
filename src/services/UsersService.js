import { HttpService } from './HttpService';

export class UsersService {
	static async getAllUsers(params = {}) {
		const service = new HttpService();
		const httpService = service.instance;
		return await httpService.get('users', {
			params,
		});
	}
}
