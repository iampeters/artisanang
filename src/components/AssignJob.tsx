import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { ListItemSecondaryAction, Icon } from '@material-ui/core';
import PrimaryTheme from '../themes/Primary';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      // maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      padding: 0
    },
  }),
);

export default function AssignJob(props: ListProps) {
  const classes = useStyles();

  return (
    <List className={classes.root + ' col-md-10 ml-auto mr-auto border-radius-10 box-shadow mb-3'}>

      <ListItem className='position-relative'>
        <ListItemAvatar>
          {!props.image ?
            <React.Fragment>
              <Avatar>
                <Icon>business_center</Icon>
              </Avatar>
            </React.Fragment>
            :
            <React.Fragment>
              <Avatar src={props.image} />
            </React.Fragment>

          }
        </ListItemAvatar>


        <React.Fragment>
          <span style={{
            position: "absolute",
            top: 8,
            // left: '30%',
            // zIndex: 2000

          }}>

          </span>
          <div className="row m-0">
            <p className='col-md-12 mb-0'>{props.title + " "}
              {props.rating > 0 &&
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-patch-check-fll" fill={PrimaryTheme.success} xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984a.5.5 0 0 0-.708-.708L7 8.793 5.854 7.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                </svg>}
            </p>
            <p className='col-md-12 mb-0 small text-secondary'>
             <div className="row m-0 justify-content-start align-items-center">
            <span className="mr-1"> {props.rating}</span>
              <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-star-fill" fill={PrimaryTheme.rating} xmlns="http://www.w3.org/2000/svg">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
             </div>
            </p>
          </div>
        </React.Fragment>

        <ListItemSecondaryAction className="d-none d-md-inline">
          <span onClick={props.onAssign} className={'badge badge-pill p-2 pl-3 pr-3 mr-1 pointer badge-' + props.color}>{props.status}</span>
          <span className={'badge badge-pill p-2 pl-3 pr-3 badge-warning pointer'} onClick={props.onView}>View</span>
        </ListItemSecondaryAction>

      </ListItem>
      <div className="row m-0 d-md-none">
        <div className="col-6 p-0">
          <button className={'w-100 btn p-2 pl-3 pr-3 mr-1 border-radius-none pointer btn-success '} onClick={props.onAssign}>{props.status}</button>
        </div>
        <div className="col-6 p-0">
          <button className={'w-100 btn p-2 pl-3 pr-3 btn-warning pointer border-radius-none'} onClick={props.onView}>View</button>
        </div>
      </div>

    </List>
  );
}

interface ListProps {
  color?: "success" | "warning" | "info" | "danger";
  status?: string;
  title: string;
  rating?: number | any;
  image?: string;
  onView?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | any;
  onAssign?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | any;
}
