import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';

export default function User({ image, firstName, lastName, username, role, ...other }) {
	const fullName = `${firstName} ${lastName}`;
	const isAdmin = role === 'admin';

	const tokens = getTokens();

	function getTokens() {
		const result = [];

		isAdmin && result.push('admin');
		other.hair?.type && result.push(other.hair.type);
		result.push(other.age);
		result.push(other.gender);
		other.crypto?.coin && result.push(other.crypto.coin);
		other.bank?.currency && result.push(other.bank.currency);

		return result;
	}

	return (
		<Link
			className='relative flex items-center gap-4 p-4 rounded-3xl ring-[1px] ring-inset ring-transparent transition-all hover:ring-black hover:shadow-2xl'
			to={`/users/${username}`}>
			<img className='w-20 h-20 rounded-full object-cover' src={image} alt={username} />
			<div className='space-y-4'>
				<div className='mt-0'>
					<h2 className='text-base font-medium text-gray-700'>{fullName}</h2>
					<p className='text-sm text-gray-500'>@{username}</p>
				</div>
				{tokens.length && (
					<div className='flex items-center gap-2 flex-wrap'>
						{tokens.map((token) => (
							<Chip key={token} label={token} color='primary' size='small' className='flex-shrink-0' />
						))}
					</div>
				)}
			</div>
			{isAdmin && <h3 className='absolute top-4 right-4 text-base font-medium text-purple-500'>Admin</h3>}
		</Link>
	);
}
