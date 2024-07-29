import { useRouteError } from 'react-router-dom';

export default function ErrorElement() {
	const error = useRouteError();

	return (
		<div className='h-full flex flex-col items-center justify-center'>
			<h2 className='text-4xl font-medium text-center mb-4'>Something went wrong...</h2>
			<p className='text-base text-center'>{error.statusText}</p>
		</div>
	);
}
