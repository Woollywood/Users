import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UsersService } from '../services/UsersService';
import { useSnackbar } from 'notistack';
import Profile from '../components/shared/Profile';

export function Component() {
	const { enqueueSnackbar } = useSnackbar();
	const [user, setUser] = useState({});
	const [isLoading, setLoading] = useState(true);
	const { slug } = useParams();

	async function getUser() {
		try {
			const { data } = await UsersService.searchUser(slug);
			if (data.users.length) {
				setUser(data.users[0]);
			} else {
				throw new Response({ status: 404, statusMessage: 'User not found' });
			}
		} catch (error) {
			enqueueSnackbar('User not found', { variant: 'error' });
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getUser();
	}, []);

	return <>{isLoading ? <h2 className='text-2xl font-medium'>Загрузка...</h2> : <Profile user={user} />}</>;
}
