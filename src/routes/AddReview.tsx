import React from 'react'
import { useSnackbar } from 'notistack';
import { makeStyles, createStyles, Theme, Avatar, TextField, Button } from '@material-ui/core';
import { Reducers, Artisans } from '../interfaces/interface';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import PrimaryTheme from '../themes/Primary';
import { getArtisanDetails } from '../redux/Actions/artisanActions';
import Placeholder from '../components/Skeleton';
import { createReviews } from '../redux/Actions/reviewAction';
import Ratings from '../components/HoverRating';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export default function AddReview() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const params: any = useParams();
  const history = useHistory();
  const user = useSelector((state: Reducers) => state.user);
  const dispatch = useDispatch();
  const alert = useSelector((state: Reducers) => state.alert);
  const artisan = useSelector((state: Reducers) => state.artisan);

  const [title, setTitle]: any = React.useState('');
  const [description, setDescription]: any = React.useState('');
  const [rating, setRating] = React.useState<number | string>(0);
  const [submitted, setSubmitted]: any = React.useState(null);
  const [ratingSet, setRatingSet]: any = React.useState(null);

  let data: Artisans = artisan.result && artisan.result;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (rating !== 0) {
      setSubmitted(true);

      dispatch({
        type: 'LOADING',
        payload: true
      })

      const review = {
        title,
        description,
        rating,
        artisanId: params.id,
        userId: user._id
      };

      dispatch(createReviews(review));
    } else {
      setRatingSet(false)
    }
  }
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getArtisanDetails(params.id))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  React.useEffect(() => {
    if (Object.entries(alert).length !== 0) {
      if (!alert.successful) {
        // display error message
        enqueueSnackbar(alert.message, { variant: "error" });

        if (alert.message === 'Network request failed') {
          history.push('/networkError');
        }

        setSubmitted(false);

        dispatch({
          type: 'ALERT',
          payload: {}
        });

      } else {
        enqueueSnackbar(alert.message, { variant: "success" });

        dispatch({
          type: 'ALERT',
          payload: {}
        });

        setTimeout(() => {
          window.location.pathname = `/artisans/details/${params.id}`;
        }, 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, enqueueSnackbar, alert, history]);

  return (
    <div className='animated fadeIn'>
      <div className='col-md-12'>
        <h4 className='mb-0' style={{ color: PrimaryTheme.appBar, fontFamily: PrimaryTheme.fonts?.mediumFont }}>Review Artisan</h4>
        <p className="small text-light">Have you used this artisan before? Write about your experience.</p>
      </div>
      <div className="col-md-7 ml-auto mr-auto mb-5 border-radius p-0">
        {data ? (
          <React.Fragment>
            <div>
              <Avatar
                className={classes.large + ' mr-auto ml-auto mb-1'}
                alt={`${data.firstname} ${data.lastname}`}
                src={data.imageUrl} />

              <div className="col-md-12 mb-3">
                <h5 className='text-center mt-3 mb-0' style={{ color: PrimaryTheme.appBar }}>{`${data.firstname} ${data.lastname}`}</h5>
                <p className='text-center note small text-light mb-0'>{data.address}</p>
                <p className='text-center note small text-light mb-0'>{data.state}, {data.country}</p>
              </div>
            </div>

            <div className='col-md-12 ml-auto mr-auto position-relative'>
              <Ratings onChange={(event: any, newValue: number) => {
                setRating(newValue);
              }} value={rating} />
              {!ratingSet && ratingSet !== null && rating === 0 && <span className='text-danger small' style={{ position: 'absolute', right: 0, top: 5 }}>Rating is required</span>}
            </div>

            <div className='col-md-12 p-0'>
              <form className={classes.root} noValidate autoComplete="off">

                <div className="row m-0 w-100">
                  <div className="form-group col-md-12">
                    <TextField
                      name="title"
                      variant="outlined"
                      required
                      fullWidth
                      id="title"
                      label="Enter review title"
                      inputMode='text'
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      disabled={submitted}
                      error={title.length <= 4 && title !== ''}
                      helperText={title.length <= 4 && title !== '' && 'Title should be more than 4 characters'}
                    />
                  </div>

                  <div className="form-group col-md-12">
                    <TextareaAutosize
                      name="Enter review description"
                      required
                      id="description"
                      value={description}
                      className="w-100 border-radius p-2"
                      style={{ minHeight: 200, borderColor: PrimaryTheme.primary }}
                      onChange={e => setDescription(e.target.value)}
                      disabled={
                        submitted ||
                        (title.length <= 4 && title !== '')
                      }
                    />
                  </div>

                  <div className="form-group col-12 col-md-8 ml-auto mr-auto">
                    <Button
                      type='submit'
                      variant="outlined"
                      size="medium"
                      className={classes.button + ' col mt-2'}
                      onClick={handleSubmit}
                      disabled={
                        title === '' ? true : false ||
                          description === '' ? true : false ||
                          submitted
                      }
                      style={{ background: PrimaryTheme.primary, color: PrimaryTheme.white }}
                    >Add Review</Button>
                  </div>
                </div>
              </form>
            </div>

          </React.Fragment>
        ) : (
            <React.Fragment>
              <Placeholder variant="circle" width={120} height={120} animation='pulse' className="mr-auto ml-auto mb-1" />
              <Placeholder variant="text" width={150} height={15} animation='wave' className="mr-auto ml-auto mb-1" />
              <Placeholder variant="text" width={120} height={15} animation='wave' className="mr-auto ml-auto mb-3" />
            </React.Fragment>
          )}
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
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    }, button: {
      margin: theme.spacing(0),
    },
  }),
);
