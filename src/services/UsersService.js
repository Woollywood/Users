import { HttpService } from './HttpService';

export class UsersService {
	static async getAllUsers(params = {}) {
		const service = new HttpService();
		const httpService = service.instance;
		return await httpService.get('users', {
			params,
		});
	}

	static async getSingleUser(id) {
		const service = new HttpService();
		const httpService = service.instance;
		return await httpService.get(`/users/${id}`);
	}

	static async searchUser(username) {
		const service = new HttpService();
		const httpService = service.instance;
		return await httpService.get('users/search', {
			params: {
				q: username,
			},
		});
	}

	static async getPosts(id) {
		const service = new HttpService();
		const httpService = service.instance;
		return await httpService.get(`/users/${id}/posts`);
	}

	static async getTodos(id) {
		const service = new HttpService();
		const httpService = service.instance;
		return await httpService.get(`/users/${id}/todos`);
	}
}
