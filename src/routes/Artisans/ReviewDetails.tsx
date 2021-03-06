import React from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, createStyles, Theme, List, ListItem, ListItemAvatar, Avatar, ListItemText, Button, Icon } from '@material-ui/core';
import { Reducers } from '../../interfaces/interface';
import { getReviewDetails } from '../../redux/Actions/reviewAction';
import PrimaryTheme from '../../themes/Primary';
import CustomizedRatings from '../../components/Ratings';
import AlertDialogSlide from '../../components/Share';
import Placeholder from '../../components/Skeleton';

export default function ReviewDetails() {
  const classes = useStyles();
  const params: any = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

  const reviews = useSelector((state: Reducers) => state.reviews);
  const artisan = useSelector((state: Reducers) => state.artisan);
  const alert = useSelector((state: Reducers) => state.alert);

  let review = reviews.result && reviews.result;

  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getReviewDetails(params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  React.useEffect(() => {
    if (Object.entries(alert).length !== 0) {
      if (!alert.successful) {
        // display error message
        enqueueSnackbar(alert.message, { variant: "error" });

        if (alert.message === 'Network request failed') {
          history.push('/networkError');
        }

        dispatch({
          type: 'ALERT',
          payload: {}
        });

      } else {
        dispatch({
          type: 'ALERT',
          payload: {}
        });
      }
    }
  }, [dispatch, enqueueSnackbar, alert, history]);

  return (
    <div className='animated fadeIn'>
      <div className='col-md-12'>
        <div className="row m-0 justify-content-between">
          <h4 className='mb-0' style={{ color: PrimaryTheme.appBar }}>Review Details</h4>
          <Button variant='text' size='small' style={{ color: PrimaryTheme.appBar }} onClick={() => history.goBack()}>
            <Icon style={{ marginRight: 5 }}>arrow_back</Icon>
            Go Back
          </Button>
        </div>
      </div>

      <div className="col-md-9 col-lg-7 ml-auto mr-auto p-0 mb-5 mt-5">
        {review && artisan ? (
          <React.Fragment>
            <List className={classes.root}>
              <ListItem alignItems="flex-start" button>
                <ListItemAvatar>
                  <Avatar alt={`${review.userId.firstname} ${review.userId.lastname}`}
                    src={review.userId.imageUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <div className="row m-0">
                        <div className="col-md-7 p-0">
                          {review.title}
                        </div>
                        <div className="col-md-5 text-right">
                          <CustomizedRatings rating={review.rating} />
                        </div>
                      </div>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      {/* <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {`${review.userId?.firstname} ${review.userId?.lastname}`}
                      </Typography> */}
                      {review.description}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>

            {/* modal */}
            {/* <AlertDialogSlide
              onClose={handleClose}
              open={open}
              title="I just reviewed an artisan on Artisana Nigeria"
              description={review.description} /> */}
          </React.Fragment>
        ) : (
            <React.Fragment>
              <div className="col-md-12 p-0 text-center">
                <Placeholder variant="text" width={'100%'} height={90} animation='wave' className="display-inline" />
                <Placeholder variant="text" width={'100%'} height={90} animation='pulse' className="display-inline" />
              </div>
            </React.Fragment>
          )}
      </div>
    </div>
  )
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '100ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    }, large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    }, button: {
      marginRight: theme.spacing(1),
      marginLeft: 0,
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  }),
);
