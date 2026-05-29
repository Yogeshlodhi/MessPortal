import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuIcon from '@mui/icons-material/Menu';

import { useAppDispatch, useAppSelector } from 'Redux/Store';
import { performAdminLogout, performStudentLogout } from 'Redux/Services/authService';
import { isStudentRole } from 'Rbac/roles';

import './header.scss';

interface IHeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: IHeaderProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    if (!user) return;
    if (isStudentRole(user.role)) {
      void performStudentLogout(dispatch);
    } else {
      void performAdminLogout(dispatch);
    }
  };

  return (
    <Box component='header' className='headerWrapper'>
      <Box className='headerWrapper__left'>
        <IconButton
          onClick={onMenuClick}
          aria-label='Open navigation menu'
          edge='start'
          className='headerWrapper__menuButton'
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='headingS' component='h2'>
          Hello, {user?.displayName ?? 'there'}
        </Typography>
      </Box>

      <Box className='headerWrapper__actions'>
        <Tooltip title={user?.emailId ?? ''}>
          <Avatar
            src={user?.avatarUrl}
            alt={user?.displayName ?? 'User'}
            className='headerWrapper__avatar'
          >
            {user?.displayName?.charAt(0).toUpperCase()}
          </Avatar>
        </Tooltip>
        <Tooltip title='Log out'>
          <IconButton onClick={handleLogout} aria-label='Log out' size='small'>
            <LogoutOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Header;
