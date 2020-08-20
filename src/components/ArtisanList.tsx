import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Artisans } from '../interfaces/interface';
import PrimaryTheme from '../themes/Primary';
import { List, ListItem, Icon } from '@material-ui/core';
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
                <h4 className='mb-0' style={{
                  color: PrimaryTheme.appBar,
                  fontFamily: PrimaryTheme.fonts?.RubikMedium
                }}>
                  <div className="row m-0 justify-content-start align-items-center">
                    <span className="mr-1">{`${props.firstname} ${props.lastname}`} </span>
                    {props.rating > 0 ? (
                      <React.Fragment>
                        <svg width=".7em" height=".7em" viewBox="0 0 16 16" className="bi bi-patch-check-fll" fill={PrimaryTheme.success} xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984a.5.5 0 0 0-.708-.708L7 8.793 5.854 7.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                        </svg>
                      </React.Fragment>
                    ) : null}
                  </div>
                </h4>
                <span className='text-light note small'>{props.specialization}</span>
                <div className='text-light note small'>{`${props.state}, ${props.country}`}</div>
              </div>
            </div>
          </div>

          <div className="col-4 d-none d-sm-inline-block" style={{ ...styles.sectionHeight }}>

            <div className={" pt-2 text-center"}>
              <h4 style={{
                fontFamily: PrimaryTheme.fonts?.RubikMedium
              }}>{props.rating}</h4>
              <CustomizedRatings rating={props.rating} />
              <p className="small mb-1">Based on {props.reviews} reviews</p>
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
