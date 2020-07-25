import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useSelector, useDispatch } from 'react-redux';
import { menuToggle } from '../redux/Actions/themeActions';
import PrimaryTheme from '../themes/Primary';
import { useHistory, NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';


export default function OpenAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const menu = useSelector((state: any) => state.menu);
  const dispatch = useDispatch();
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

  const handleMenuToggle = (value: any) => {
    value === 'none' ? dispatch(menuToggle('inline-block')) : dispatch(menuToggle('none'))
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
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      // style={{width: 100}}
    >
      <MenuItem style={{
        fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
      }}>
        <p className="mb-0">About</p>
      </MenuItem>
      <MenuItem style={{
        fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
      }}>
        <p className="mb-0">FAQs</p>
      </MenuItem>
      <MenuItem onClick={() => handleNavigation('sign-in')}
        style={{
          fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
        }}>
        <p className="mb-0">Sign In</p>
      </MenuItem>
      <MenuItem onClick={() => handleNavigation('join')}
        style={{
          fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
        }}>
        <p className="mb-0">Join</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ backgroundColor: PrimaryTheme.appBar }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton + ' d-md-none'}
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleMenuToggle(menu)}
            style={{ color: PrimaryTheme.white }}
          >
            <MenuIcon style={{ color: PrimaryTheme.white }} />
          </IconButton>

          <NavLink to='/'>
            <Typography className={classes.title} variant="h6" noWrap style={{ color: PrimaryTheme.white, fontFamily: PrimaryTheme.fonts?.ProductSansRegular, fontWeight: 600 }}>
              Artisana
          </Typography>
          </NavLink>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            <Button color="inherit" style={{
              color: PrimaryTheme.white,
              fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
            }}>About</Button>

            <Button color="inherit" style={{
              color: PrimaryTheme.white,
              fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
            }}>faqs</Button>

            <Button color="inherit" style={{
              color: PrimaryTheme.white,
              fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
            }}>Support</Button>

            <Button color="inherit" style={{
              color: PrimaryTheme.white,
              fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
            }} onClick={() => handleNavigation('sign-in')}>Sign in</Button>

            <Button color="inherit" style={{
              color: PrimaryTheme.white,
              fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
            }} onClick={() => handleNavigation('join')}>Join</Button>

          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
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
      display: 'none',
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