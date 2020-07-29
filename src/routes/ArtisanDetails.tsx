import React from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { Reducers, Artisans, Reviews } from '../interfaces/interface';
import { Avatar, IconButton, Icon } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { getArtisanDetails } from '../redux/Actions/artisanActions';
import PrimaryTheme from '../themes/Primary';
import Tooltip from '@material-ui/core/Tooltip';
import CustomizedRatings from '../components/Ratings';
import ReviewItemsList from '../components/ReviewItems';
import PaginationControlled from '../components/Pagination';
import FloatingActionButtons from '../components/Fab';
import { getReviews } from '../redux/Actions/reviewAction';
import Placeholder from '../components/Skeleton';

export default function ArtisanDetails() {
  const classes = useStyles();
  const params: any = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

  const artisan = useSelector((state: Reducers) => state.artisan);
  const reviews = useSelector((state: Reducers) => state.reviews);
  const alert = useSelector((state: Reducers) => state.alert);

  let data: Artisans = artisan.result && artisan.result;
  let reviewList = reviews.items && reviews.items;

  const [page, setPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(25)

  let filter: Reviews = {};
  let paginationConfig = {
    page: page + 1,
    pageSize,
    whereCondition: JSON.stringify(filter)
  }


  const handleChange = (event: React.MouseEvent<HTMLButtonElement> | null, value: number) => {
    setPage(value);
  };

  const handlePageSizeChange = (event: React.MouseEvent<HTMLButtonElement> | null, value: number) => {
    setPageSize(value);
  };

  const handleClick = () => {
    history.push(`/reviews/add/${params.id}`)
  }

  const navigate = (route: string) => {
    history.push(route)
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getArtisanDetails(params.id))

    // dispatch reviews
    filter.artisanId = params.id;
    paginationConfig.whereCondition = JSON.stringify(filter)

    dispatch(getReviews(paginationConfig))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  React.useEffect(() => {
    filter.artisanId = params.id;
    paginationConfig.whereCondition = JSON.stringify(filter)

    dispatch(getReviews(paginationConfig))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page])

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
      <div className="col-md-9 col-lg-7 ml-auto mr-auto p-0 mb-5">
        {data ? (
          <div>
            <Avatar
              className={classes.large + ' mr-auto ml-auto mb-1'}
              alt={`${data.firstname} ${data.lastname}`}
              src={data.imageUrl} />

            <div className="col-md-12">
              <h5 className='text-center mt-3 mb-0' style={{ color: PrimaryTheme.appBar }}>{`${data.firstname} ${data.lastname}`}</h5>
              <p className='text-center note small text-light mb-0'>{data.address}</p>
              <p className='text-center note small text-light mb-0'>{data.state}, {data.country}</p>
            </div>

            <div className="col-md-5 ml-auto mr-auto p-2 text-center border-radius">

              <Tooltip title="Call Artisan" aria-label="call">
                <IconButton
                  edge="start"
                  className={classes.button}
                  color="inherit"
                  aria-label="Call Artisan"
                >
                  <Icon style={{ color: PrimaryTheme.primary, fontSize: 30 }} >local_phone</Icon>
                </IconButton>
              </Tooltip>

              <Tooltip title="Email Artisan" aria-label="email">
                <IconButton
                  edge="start"
                  className={classes.button}
                  color="inherit"
                  aria-label="Email Artisan"
                >

                  <Icon style={{ color: PrimaryTheme.primary, fontSize: 30 }} >email</Icon>
                </IconButton>
              </Tooltip>

              <Tooltip title="Report Artisan" aria-label="report">
                <IconButton
                  edge="start"
                  className={classes.button}
                  color="inherit"
                  aria-label="Report"
                >
                  <Icon style={{ color: PrimaryTheme.primary, fontSize: 30 }} >report</Icon>
                </IconButton>
              </Tooltip>

              <Tooltip title="Share" aria-label="report">
                <IconButton
                  edge="start"
                  className={classes.button}
                  color="inherit"
                  aria-label="Share"
                >
                  <Icon style={{ color: PrimaryTheme.primary, fontSize: 30 }} >share</Icon>
                </IconButton>
              </Tooltip>

            </div>
            <div className="row m-0 mt-4">
              <div className="col-md-6 mb-3">
                {/* <div className="col-md-12 p-0">
                  <p className='small mb-1' style={{ color: PrimaryTheme.dark }}>Business Information</p>
                </div> */}
                <div className={classes.smallCard + " p-4 bg-white border-radius box-shadow"}>
                  <h4 className=''>{data.businessName}</h4>
                  <h6 className='text-light'>RC 37463</h6>
                  <h6 className='text-light small mb-0'>{data.specialization}</h6>
                </div>
              </div>

              <div className="col-md-6 mb-3">
                {/* <div className="col-md-12 p-0">
                  <p className='small mb-1' style={{ color: PrimaryTheme.dark }}>Rating</p>
                </div> */}
                <div className={classes.smallCard + " p-4 bg-white border-radius box-shadow text-center"}>
                  <h4 className=''>{data.rating}</h4>
                  <CustomizedRatings rating={data.rating} />
                  <p className="small mb-1">Based on {data.reviews} reviews</p>
                </div>

              </div>

              <div className="col-md-12 mb-3">
                <h6 className='mb-3' style={{ color: PrimaryTheme.dark }}>Reviews</h6>
                <div className="p-1 bg-white border-radius box-shadow">
                  {reviewList?.map((review: Reviews, index) => {
                    return (
                      <ReviewItemsList title={review.title} description={review.description} userId={review.userId} key={index} rating={review.rating} onClick={() => navigate(`/reviews/details/${review._id}`)} />
                    )
                  })}
                </div>
              </div>
            </div>

            {/* pagination component */}
            {reviews.total > pageSize && <PaginationControlled onPageSizeChange={handlePageSizeChange} onChange={handleChange} page={page} total={reviews.total && reviews.total} pageSize={pageSize} />}
          </div>

        ) : (
            <React.Fragment>
              <Placeholder variant="circle" width={120} height={120} animation='pulse' classes="mr-auto ml-auto mb-1" />
              <Placeholder variant="text" width={150} height={15} animation='wave' classes="mr-auto ml-auto mb-1" />
              <Placeholder variant="text" width={120} height={15} animation='wave' classes="mr-auto ml-auto mb-3" />

              <div className="row m-0">
                <div className="col-md-6">
                  <Placeholder variant="text" width={'100%'} height={150} animation='wave' classes="mr-auto ml-auto" />
                </div>
                <div className="col-md-6">
                  <Placeholder variant="text" width={'100%'} height={150} animation='wave' classes="mr-auto ml-auto" />
                </div>

                <div className="col-md-12">
                  <Placeholder variant="text" width={'100%'} height={200} animation='wave' classes="mr-auto ml-auto" />
                </div>
              </div>
            </React.Fragment>

          )}
      </div>

      <div className={classes.fab} style={{ position: 'fixed' }}>
        <div className="row m-0 justify-content-end align-items-center">
          <FloatingActionButtons IconName="edit" IconText="Write review" onClick={handleClick} />
        </div>
      </div>
    </div>
  )
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
      width: theme.spacing(15),
      height: theme.spacing(15),
    }, paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    }, button: {
      marginRight: theme.spacing(1),
      marginLeft: 0,
      width: theme.spacing(6),
      height: theme.spacing(6),
    }, smallCard: {
      minHeight: 146
    }, fab: {
      bottom: 0,
      right: 20,
    }
  }),
);

