import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

export default function PostList({ posts }) {
	return (
		<div>
			<h2 className='text-4xl font-medium mb-6'>Posts</h2>
			{posts.length === 0 ? (
				<h2>Здесь пока ничего нет</h2>
			) : (
				<div className='space-y-8'>
					{posts.map((post) => (
						<div key={post.id} className='space-y-4'>
							<div>
								<h2 className='text-2xl font-medium mb-4'>{post.title}</h2>
								<p className='text-base'>{post.body}</p>
							</div>
							{post.tags.length > 0 && (
								<div className='flex items-center gap-2 flex-wrap'>
									{post.tags.map((tag) => (
										<Chip key={tag} label={tag} size='small' color='primary' />
									))}
								</div>
							)}
							<div className='flex items-center gap-4'>
								<div className='flex items-center gap-1'>
									<IconButton aria-label='Like' size='small'>
										<ThumbUpIcon />
									</IconButton>
									<span>{post.reactions.likes}</span>
								</div>
								<div className='flex items-center gap-1'>
									<IconButton aria-label='Dislike' size='small'>
										<ThumbDownIcon />
									</IconButton>
									<span>{post.reactions.dislikes}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
