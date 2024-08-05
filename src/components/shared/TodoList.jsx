export default function TodoList({ todos }) {
	return (
		<div>
			<h2 className='text-4xl font-medium mb-6'>Todos</h2>
			{todos.length === 0 ? (
				<h2>Здесь пока ничего нет</h2>
			) : (
				<ul>
					{todos.map((todo) => (
						<li
							key={todo.id}
							className='relative before:absolute before:left-0 before:top-[50%] before:translate-y-[-50%] before:w-2 before:h-2 before:bg-black before:rounded-full pl-4 flex'>
							<div className='relative'>
								<h2>{todo.todo}</h2>
								{todo.completed && (
									<div className='absolute left-0 top-[50%] translate-y-[-50%] w-full h-[1px] bg-black'></div>
								)}
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
