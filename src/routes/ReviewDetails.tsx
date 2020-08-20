import React from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { Reducers, Artisans } from '../interfaces/interface';
import { makeStyles, createStyles, Theme, List, ListItem, ListItemAvatar, Avatar, ListItemText, Button, Icon, Tooltip, IconButton } from '@material-ui/core';
import PrimaryTheme from '../themes/Primary';
import CustomizedRatings from '../components/Ratings';
import { getReviewDetails } from '../redux/Actions/reviewAction';
import Placeholder from '../components/Skeleton';
import AlertDialogSlide from '../components/Share';
import { getArtisanDetails } from '../redux/Actions/artisanActions';

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
  let data: Artisans = artisan.result && artisan.result;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const navigate = (route: string) => {
    history.push(route);
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getArtisanDetails(params.artId))
    dispatch(getReviewDetails(params.id))
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

            <div>
              <Avatar
                className={classes.large + ' mr-auto ml-auto mb-1 pointer'}
                alt={`${data.firstname} ${data.lastname}`}
                src={data.imageUrl}
                onClick={() => navigate(`/artisans/details/${review.artisanId._id}`)}
              />

              <div className="col-md-12">
                <h5 className='text-center mt-3 mb-0' style={{ color: PrimaryTheme.appBar }}>{`${data.firstname} ${data.lastname}`}</h5>
                <p className='text-center note small text-light mb-0'>{data.address}</p>
                <p className='text-center note small text-light mb-0'>{data.state}, {data.country}</p>
              </div>

              <div className="col-md-5 ml-auto mr-auto p-2 text-center border-radius">

                {/* <Tooltip title="Call Artisan" aria-label="call">
                  <IconButton
                    edge="start"
                    className={classes.button}
                    color="inherit"
                    aria-label="Call Artisan"
                    href={`tel:${data.phoneNumber}`}
                    rel='noreferer'
                    target='_blank'
                  >
                    <Icon style={{ color: PrimaryTheme.success, fontSize: 30 }} >local_phone</Icon>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Email Artisan" aria-label="email">
                  <IconButton
                    edge="start"
                    className={classes.button}
                    color="inherit"
                    aria-label="Email Artisan"
                    href={`mailto:${data.email}`}
                    rel='noreferer'
                    target='_blank'
                  >

                    <Icon style={{ color: PrimaryTheme.info, fontSize: 30 }} >email</Icon>
                  </IconButton>
                </Tooltip> */}

                {/* <Tooltip title="Report Artisan" aria-label="report">
                <IconButton
                  edge="start"
                  className={classes.button}
                  color="inherit"
                  aria-label="Report"
                >
                  <Icon style={{ color: PrimaryTheme.danger, fontSize: 30 }} >report</Icon>
                </IconButton>
              </Tooltip> */}

                <Tooltip title="Share your review" aria-label="share your review">
                  <IconButton
                    edge="start"
                    className={classes.button}
                    color="inherit"
                    aria-label="Share your review"
                    onClick={handleClickOpen}
                  >
                    <Icon style={{ color: PrimaryTheme.facebook, fontSize: 30 }} >share</Icon>
                  </IconButton>
                </Tooltip>

              </div>
            </div>
            <List className={classes.root}>
              <ListItem alignItems="flex-start" button onClick={() => navigate(`/artisans/details/${review.artisanId._id}`)}>
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
            <AlertDialogSlide
              onClose={handleClose}
              open={open}
              title="I just reviewed an artisan on Artisana Nigeria"
              description={review.description} />
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
