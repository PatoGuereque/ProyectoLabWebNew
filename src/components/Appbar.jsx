import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logout from '@mui/icons-material/Logout';
import { Divider, ListItemIcon } from '@mui/material';
import NextLink from 'next/link';
import { useAuthContext } from '../context/auth-context';
import Image from 'next/image';

const PageAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, login, logout } = useAuthContext();

  const pages = [
    {
      name: 'Inicio',
      route: '/',
    },
    user
      ? {
          name: 'Objetos Perdidos',
          route: '/objetos',
        }
      : {},
    user
      ? {
          name: 'Reportar Objetos',
          route: '/reportar',
        }
      : {},
    {
      name: 'FAQ',
      route: '/faq',
    },
  ];
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 2,
            }}
          >
            <Box sx={{ height: 50, width: 150 }}>
              <NextLink href="/">
                <a>
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                    }}
                  >
                    <Image
                      src="/logolocatec.png"
                      alt="logo"
                      layout="fill"
                      objectFit="contain"
                    />
                  </Box>
                </a>
              </NextLink>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
              }}
            >
              {pages.map((page) =>
                page?.name ? (
                  <NextLink key={page.name} href={page.route} passHref>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  </NextLink>
                ) : null
              )}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <Box sx={{ height: 50, width: 150 }}>
              <NextLink href="/">
                <a>
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                    }}
                  >
                    <Image
                      src="/logolocatec.png"
                      alt="logo"
                      layout="fill"
                      objectFit="contain"
                    />
                  </Box>
                </a>
              </NextLink>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) =>
              page?.name ? (
                <NextLink key={page.name} href={page.route} passHref>
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                    {page.name}
                  </Button>
                </NextLink>
              ) : null
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user !== undefined ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.name} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
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
                  onClose={handleCloseUserMenu}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                >
                  <MenuItem>
                    <Avatar />
                    {user.firstName} {user.lastName}
                  </MenuItem>

                  <Divider />
                  <MenuItem onClick={logout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={login}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default PageAppBar;
