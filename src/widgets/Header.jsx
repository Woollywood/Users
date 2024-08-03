import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Skeleton from '@mui/material/Skeleton';
import { useAuth, useAuthDispatch } from '../contexts/AuthContext';
import { AuthService } from '../services/AuthService';

const pages = [
	{
		label: 'Users',
		path: '/users',
	},
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function Header() {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const { loading: isLoading, user } = useAuth();
	const dispatch = useAuthDispatch();

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = async (setting) => {
		switch (setting) {
			case 'Logout': {
				const result = await AuthService.logout();
				if (result) {
					dispatch({ type: 'RESET_USER' });
				}
			}
		}

		setAnchorElUser(null);
	};

	return (
		<AppBar position='static'>
			<div className='container'>
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}>
						<Link to='/'>LOGO</Link>
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}>
							{pages.map((page) => (
								<MenuItem key={page.path} onClick={handleCloseNavMenu}>
									<Typography textAlign='center'>
										<Link to={page.path}>{page.label}</Link>
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
					<Typography
						variant='h5'
						noWrap
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}>
						<Link to='/'>LOGO</Link>
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<Button
								key={page.path}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}>
								<Link to={page.path}>{page.label}</Link>
							</Button>
						))}
					</Box>

					{isLoading ? (
						<Skeleton variant='circular' width={40} height={40} />
					) : (
						<>
							{user ? (
								<Box sx={{ flexGrow: 0 }}>
									<Tooltip title='Open settings'>
										<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
											<Avatar
												alt={`${user.username}'s avatar`}
												src={user.image}
												variant='rounded'
											/>
										</IconButton>
									</Tooltip>
									<Menu
										sx={{ mt: '45px' }}
										id='menu-appbar'
										anchorEl={anchorElUser}
										anchorOrigin={{
											vertical: 'top',
											horizontal: 'right',
										}}
										keepMounted
										transformOrigin={{
											vertical: 'top',
											horizontal: 'right',
										}}
										open={Boolean(anchorElUser)}
										onClose={handleCloseUserMenu}>
										{settings.map((setting) => (
											<MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
												<Typography textAlign='center'>{setting}</Typography>
											</MenuItem>
										))}
									</Menu>
								</Box>
							) : (
								<Link to='/login'>
									<Button variant='contained'>Войти</Button>
								</Link>
							)}
						</>
					)}
				</Toolbar>
			</div>
		</AppBar>
	);
}
