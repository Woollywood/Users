import { Outlet } from 'react-router-dom';
import Header from '../widgets/Header';

export default function Default() {
	return (
		<div className='min-h-screen grid grid-rows-[auto_1fr] gap-6'>
			<Header />
			<main className='container'>
				<Outlet />
			</main>
		</div>
	);
}
