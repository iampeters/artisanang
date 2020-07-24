import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Artisans } from '../interfaces/interface';
import PrimaryTheme from '../themes/Primary';
import ProgressBar from '../components/ProgressBar';
import Icon from '@material-ui/core/Icon';
import { List, ListItem } from '@material-ui/core';



export default function ArtisanList(props: Artisans) {
  const classes = useStyles();

  return (
    <List className='artisanList'>
      <ListItem button className='mb-3 box-shadow border-radius'>
        <div className="row m-0 w-100">
          <div className="col-md-6 col-sm-8" style={{ ...styles.sectionHeight }}>

            <div className="row justify-content-center align-items-center h-inherit">
              <div className="col-4">
                <Avatar className={classes.large} alt={`${props.firstname} ${props.lastname}`} src={props.imageUrl} />
              </div>
              <div className="col-8">
                <h4 className='mb-0'>{`${props.firstname} ${props.lastname}`}</h4>
                <span className='text-light note small'>{props.specialization}</span>
                <div className='text-light note small'>{`${props.state}, ${props.country}`}</div>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-4 d-none d-sm-inline-block" style={{ ...styles.sectionHeight }}>
            <div className="row m-0 justify-content-center h-inherit align-items-center">
              <div className='col-12 p-0 text-center'>
                <Icon style={{ color: PrimaryTheme.variant, fontSize: 40 }}>star</Icon>
                <div className='text-bold col-12 p-0 text-center' style={{ fontSize: 25, fontFamily: PrimaryTheme.fonts?.ProductSansBold }}>{props.rating}</div>
              </div>
            </div>
          </div>

          <div className="col-3 d-none d-md-inline-block" style={{ ...styles.sectionHeight }}>
            <div className='row m-0 justify-content-center h-inherit align-items-center'>
              <div className='col-12 p-0'>
                {/* rating */}
                <div className="row justify-content-center align-content-center m-0">
                  <div className="col-2 p-0" style={{ ...styles.progressRate }}>5</div>
                  <ProgressBar size={12} />
                  <div className="col-3" style={{ ...styles.progressRate }}>100</div>
                </div>
                <div className="row justify-content-center align-content-center m-0">
                  <div className="col-2 p-0" style={{ ...styles.progressRate }}>4</div>
                  <ProgressBar size={14} />
                  <div className="col-3" style={{ ...styles.progressRate }}>100</div>
                </div>
                <div className="row justify-content-center align-content-center m-0">
                  <div className="col-2 p-0" style={{ ...styles.progressRate }}>3</div>
                  <ProgressBar size={30} />
                  <div className="col-3" style={{ ...styles.progressRate }}>100</div>
                </div>
                <div className="row justify-content-center align-content-center m-0">
                  <div className="col-2 p-0" style={{ ...styles.progressRate }}>2</div>
                  <ProgressBar size={20} />
                  <div className="col-3" style={{ ...styles.progressRate }}>100</div>
                </div>
                <div className="row justify-content-center align-content-center m-0">
                  <div className="col-2 p-0" style={{ ...styles.progressRate }}>1</div>
                  <ProgressBar size={2} />
                  <div className="col-3" style={{ ...styles.progressRate }}>100</div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </ListItem>
    </List >
  );
}

const styles = {
  header: {
    color: 'dark',
  },
  searchBar: {
    // height: 70,
    borderRadius: 50
  },
  sideBar: {},
  content: {
    marginTop: 20,
    overflow: 'auto'
  }, sectionHeight: {
    height: 108
  },
  progressRate: {
    marginTop: -4,
    fontSize: 12
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
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
  }),
);
