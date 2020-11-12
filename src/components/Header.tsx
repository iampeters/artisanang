import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useSelector, useDispatch } from 'react-redux';
import { menuToggle } from '../redux/Actions/themeActions';
import PrimaryTheme from '../themes/Primary';
import { useHistory } from 'react-router-dom';
import SwipeableTemporaryDrawer from './Drawer';
import Nav from './Nav';
import { Reducers, ResponseDetails } from '../interfaces/interface';
import Notifications from '../Services/Notifications';
import { io } from 'socket.io-client';

const socket = io({
  host: 'http://localhost:5000/',
  hostname: 'http://localhost',
  autoConnect: true,
  // transports: ['websocket', 'polling'],
  port: process.env.PORT || '5000',
  upgrade: true
})

export default function SecuredAppBar() {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const menu = useSelector((state: any) => state.menu);
  const dispatch = useDispatch();
  const history = useHistory();
  // const socket = new Notifications().socket;

  const nav = useSelector((state: Reducers) => state.navBar);
  const user = useSelector((state: Reducers) => state.user);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [messageCount, setMessageCount] = React.useState(4);
  const notificationCount = React.useState(0)[0];

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    dispatch({
      type: 'TOGGLE_NAVBAR',
      payload: !nav
    })
    // setState(!state);
  };

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
    value === 'none' ? dispatch(menuToggle('d-md-inline-block')) : dispatch(menuToggle('none'))
  };

  const handleNavigation = (route: string) => {
    history.push(route)
  }

  const setupSocket = () => {
    socket.on('connection', (data: any) => {
      console.log(`Connected: ${data}`);
    });
  }

  const getNotifications = () => {
    const data = {
      userId: user._id
    };

    // socket.getNotifications(data);

    // socket.on('connection', () => socket.emit('getNotifications', data))

    socket.emit('getNotifications', data);
  }

  // const handleMessageNotification = (data: any) => {
  //   console.log('====================================');
  //   console.log(data);
  //   console.log('====================================');
  // }

  React.useEffect(() => {
    setupSocket();
    // getNotifications();

    // return () => {
    //   socket.off('getNotifications')
    // }
  })

  // React.useEffect(() => {

  //   socket.on('Notifications', (data: ResponseDetails) => {
  //     console.log('====================================');
  //     console.log(data);
  //     console.log('====================================');
  //   });

  //   return () => {
  //     socket.off('Notifications')
  //   }
  // })


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
    >
      <MenuItem onClick={() => handleNavigation('/messages')}>
        <IconButton aria-label="show 4 new mails" color="inherit" >
          <Badge badgeContent={messageCount} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p className="mb-0">Messages</p>
      </MenuItem>
      <MenuItem onClick={() => handleNavigation('/notifications')}>
        <IconButton aria-label="show 11 new notifications" color="inherit" >
          <Badge badgeContent={notificationCount} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p className="mb-0">Notifications</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" style={{ backgroundColor: PrimaryTheme.white }} elevation={0} className='box-shadow border-bottom'>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton + ' d-none d-md-inline-block'}
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleMenuToggle(menu)}
          >
            <MenuIcon style={{ color: PrimaryTheme.black }} />
          </IconButton>

          <IconButton
            edge="start"
            className={classes.menuButton + ' d-inline-block d-md-none'}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
          >
            <MenuIcon style={{ color: PrimaryTheme.black }} />
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap style={{ color: PrimaryTheme.black }}>
            Artisana <button className='btn btn-success' onClick={() => getNotifications()}>Fire</button>
          </Typography>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            <IconButton aria-label="show 4 new mails" color="inherit" onClick={() => handleNavigation('/messages')}>
              <Badge badgeContent={messageCount} color="secondary" >
                <MailIcon style={{ color: PrimaryTheme.icon }} />
              </Badge>
            </IconButton>

            <IconButton aria-label="show 17 new notifications" color="inherit" onClick={() => handleNavigation('/notifications')}>
              <Badge badgeContent={notificationCount} color="secondary">
                <NotificationsIcon style={{ color: PrimaryTheme.icon }} />
              </Badge>
            </IconButton>

          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon style={{ color: PrimaryTheme.icon }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      {/* Drawer */}
      <SwipeableTemporaryDrawer anchor='left' state={nav} toggleDrawer={toggleDrawer}>
        <Nav />
      </SwipeableTemporaryDrawer>
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
      marginLeft: 0,
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
