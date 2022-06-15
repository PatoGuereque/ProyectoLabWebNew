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
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';

var currPage = 0;

const PageAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { data: session } = useSession();
  const router = useRouter();

  const pages = [
    {
      name: 'Inicio',
      route: '/',
      isActive: 'none',
    },
    session
      ? {
          name: 'Objetos Perdidos',
          route: '/objetos',
          isActive: 'none',
        }
      : {},
    session
      ? {
          name: 'Reportar Objetos',
          route: '/reportar',
          isActive: 'none',
        }
      : {},
    {
      name: 'FAQ',
      route: '/faq',
      isActive: 'none',
    },
  ];

  for (let i = 0; i < 4; i++) {
    pages[i].isActive = 'none';
  }

  switch (router.pathname) {
    case '/':
      pages[0].isActive = 'underline';
      break;
    case '/objetos':
      pages[1].isActive = 'underline';
      break;
    case '/reportar':
      pages[2].isActive = 'underline';
      break;
    case '/faq':
      pages[3].isActive = 'underline';
      break;
    default:
    //
  }

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
                    <Typography sx={{ textDecoration: page.isActive }}>
                      {page.name}
                    </Typography>
                  </Button>
                </NextLink>
              ) : null
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {session ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={session.user.name} src={session.user.image} />
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
                    <Avatar alt={session.user.name} src={session.user.image} />
                    {session.user.name}
                  </MenuItem>

                  <Divider />
                  <MenuItem onClick={signOut}>
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
                onClick={signIn}
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
