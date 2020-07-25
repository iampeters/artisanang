import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Artisans } from '../interfaces/interface';
import PrimaryTheme from '../themes/Primary';
import { List, ListItem } from '@material-ui/core';
import CustomizedRatings from './Ratings';



export default function ArtisanList(props: Artisans) {
  const classes = useStyles();

  return (
    <List className='artisanList' onClick={props.onClick}>
      <ListItem button className='mb-3 box-shadow border-radius'>
        <div className="row m-0 w-100">
          <div className="col-md-8 col-sm-8" style={{ ...styles.sectionHeight }}>

            <div className="row justify-content-center align-items-center h-inherit">
              <div className="col-3">
                <Avatar className={classes.large} alt={`${props.firstname} ${props.lastname}`} src={props.imageUrl} />
              </div>
              <div className="col-9">
                <h4 className='mb-0' style={{ color: PrimaryTheme.appBar }}>{`${props.firstname} ${props.lastname}`}</h4>
                <span className='text-light note small'>{props.specialization}</span>
                <div className='text-light note small'>{`${props.state}, ${props.country}`}</div>
              </div>
            </div>
          </div>

          <div className="col-4 d-none d-sm-inline-block" style={{ ...styles.sectionHeight }}>

            <div className={" pt-2 text-center"}>
              <h4 className=''>{props.rating}</h4>
              <CustomizedRatings rating={props.rating} />
              <p className="small mb-1">Based on 34 ratings</p>
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
