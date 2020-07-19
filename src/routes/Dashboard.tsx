import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import PrimaryTheme from '../themes/Primary';
import ArtisanList from '../components/ArtisanList';
import Icon from '@material-ui/core/Icon';
import ProgressBar from '../components/ProgressBar';

export default function Dashboard() {

  const classes = useStyles();

  return (
    <div className='animated fadeIn'>
      <div className="col-md-7 ml-auto mr-auto p-4 box-shadow bg-white mb-5 searchBar" style={{ ...styles.searchBar }}>
      </div>
      <div className="col-md-7 ml-auto mr-auto p-2 box-shadow border-radius-20 bg-white mb-5">
        {/* <Avatar className={classes.large} alt="John Doe" src="logo.png" /> */}
        <div className="row m-0">
          <div className="col-8">
            <ArtisanList firstname='James' lastname='Adams' imageUrl='logo.png' rating={3} specialization="Welding, Soldering, Mechanic" />
          </div>

          <div className="col-4">
            {/* <Icon style={{ color: PrimaryTheme.warn, fontSize: 40 }}>star</Icon> */}
            <div className='mb-1 mt-2'>
              <div className="row justify-content-center align-content-center">
                <div className="col-2 p-0">5</div>
                <div className="col-10 p-0">
                  <ProgressBar size={20} />
                </div>
              </div>
            </div>
            <div className='mb-1'>
              <ProgressBar size={60} />
            </div>
            <div className='mb-1'>
              <ProgressBar size={40} />
            </div>
            <div className='mb-1'>
              <ProgressBar size={35} />
            </div>
            <div className='mb-1'>
              5 <ProgressBar size={15} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const styles = {
  header: {
    color: 'dark',
  },
  searchBar: {
    height: 70,
    borderRadius: 50
  },
  sideBar: {},
  content: {
    marginTop: 20,
    overflow: 'auto'
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }),
);
