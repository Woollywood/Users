import { useEffect, useState } from 'react';
import { UsersService } from '../services/UsersService';

export function Component() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		UsersService.getAllUsers({ limit: 10 }).then(({ data }) => setUsers(data.users));
	}, []);

	return (
		<div>
			<h2 className='text-4xl font-medium text-center mb-12'>Over 3.000+ Users</h2>
			<div>
				{users.length && (
					<div className='grid grid-cols-10 items-center gap-6'>
						{users.map((user) => (
							<img
								key={user.id}
								alt={`${user.username}'s avatar`}
								src={user.image}
								className='rounded-full'
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
