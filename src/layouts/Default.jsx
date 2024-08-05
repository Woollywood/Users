import { Outlet } from 'react-router-dom';
import Header from '../widgets/Header';

export default function Default() {
	return (
		<div className='min-h-screen grid grid-rows-[auto_1fr]'>
			<Header />
			<div className='py-6'>
				<main className='container'>
					<Outlet />
				</main>
			</div>
		</div>
	);
}
