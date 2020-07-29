import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import PrimaryTheme from '../themes/Primary';
import { useHistory, NavLink } from 'react-router-dom';
import { Avatar } from '@material-ui/core';


export default function OpenAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const handleNavigation = (route: string) => {
    history.push(route)
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    // style={{width: 100}}
    >
      <MenuItem style={{
        fontFamily: PrimaryTheme.fonts?.ProductSansRegular, color: PrimaryTheme.primary,
        fontSize: 15,
      }}>
        <p className="mb-0">How it works</p>
      </MenuItem>
      <MenuItem style={{
        fontFamily: PrimaryTheme.fonts?.ProductSansRegular, color: PrimaryTheme.primary,
        fontSize: 15,
      }}>
        <p className="mb-0">About</p>
      </MenuItem>
      <MenuItem style={{
        fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
        color: PrimaryTheme.primary,
        fontSize: 15,
      }}>
        <p className="mb-0">FAQs</p>
      </MenuItem>
      <MenuItem onClick={() => handleNavigation('sign-in')}
        style={{
          fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
          color: PrimaryTheme.primary,
        }}>
        {/* <p className="mb-0">
          Sign In</p> */}
        <button className="btn btn-white p-0 " style={{
          color: PrimaryTheme.primary,
          fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
        }} onClick={() => handleNavigation('sign-in')}>
          <div className="row m-0 align-items-center">
            <svg width="1em" height="1.1em" viewBox="0 0 16 16" className="bi bi-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            </svg>
            <span className='ml-1'>Sign in</span>
          </div>
        </button>
      </MenuItem>
      <MenuItem onClick={() => handleNavigation('get-started')}
        style={{
          fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
        }}>
        {/* <p className="mb-0">Get Started</p> */}
        <button className='btn btn-purple pr-4 pl-4 badge-pill' style={{
          fontWeight: 300,
          fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
        }} onClick={() => handleNavigation('get-started')} >Get Started</button>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ backgroundColor: PrimaryTheme.white }} elevation={0}>
        <Toolbar>
          <div className="container">
            <div className="row justify-content-center align-items-center">
              {/* <IconButton
                edge="start"
                className={classes.menuButton + ' d-md-none'}
                color="inherit"
                aria-label="open drawer"
                onClick={() => handleMenuToggle(menu)}
                style={{ color: PrimaryTheme.appBar }}
              >
                <MenuIcon style={{ color: PrimaryTheme.appBar }} />
              </IconButton> */}

              <NavLink to='/'>
                <div className="row m-0 justify-content-center align-items-center">
                  <Avatar src={'/logo.png'} className='mr-1 justify-content-center align-items-center' />
                  <Typography className={classes.title} variant="h6" noWrap style={{ color: PrimaryTheme.primary, fontFamily: PrimaryTheme.fonts?.ProductSansRegular, fontWeight: 600 }}>
                    Artisana</Typography>
                </div>
              </NavLink>

              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>

                <button className="btn btn-white" style={{
                  color: PrimaryTheme.primary,
                  fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
                }}>How it works</button>

                <button className="btn btn-white" style={{
                  color: PrimaryTheme.primary,
                  fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
                }}>About</button>

                <button className="btn btn-white" style={{
                  color: PrimaryTheme.primary,
                  fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
                }}>FAQs</button>

                <button className="btn btn-white" style={{
                  color: PrimaryTheme.primary,
                  fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
                }}>Support</button>

                <button className="btn btn-white" style={{
                  color: PrimaryTheme.primary,
                  fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
                }} onClick={() => handleNavigation('/sign-in')}>
                  <div className="row m-0 align-items-center">
                    <svg width="1em" height="1.1em" viewBox="0 0 16 16" className="bi bi-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    </svg>
                    <span className='ml-1'>Sign in</span>
                  </div>
                </button>

                <button className='btn btn-purple pr-4 pl-4 badge-pill' style={{
                  fontWeight: 300,
                  fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
                }} onClick={() => handleNavigation('/get-started')} >Get Started</button>
              </div>

              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                  style={{ color: PrimaryTheme.primary }}
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      // display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    }
  }),
);