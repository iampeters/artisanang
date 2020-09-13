import React from 'react'
import { useSnackbar } from 'notistack';
import { makeStyles, createStyles, Theme, TextField, Button, Icon } from '@material-ui/core';
import { Reducers, JobProps } from '../interfaces/interface';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PrimaryTheme from '../themes/Primary';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { getCategory } from '../redux/Actions/categoryActions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createJob } from '../redux/Actions/jobActions';

export default function AddJob() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const user = useSelector((state: Reducers) => state.user);
  const jobs: JobProps = useSelector((state: any) => state.jobs);
  const dispatch = useDispatch();
  const alert = useSelector((state: Reducers) => state.alert);
  const category = useSelector((state: Reducers) => state.category);

  const [title, setTitle]: any = React.useState(jobs.title);
  const [description, setDescription]: any = React.useState(jobs.description);
  const [submitted, setSubmitted]: any = React.useState(null);
  const [categoryId, setCategoryId]: any = React.useState({})

  let categoryList: any = category.items && category.items;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);

    dispatch({
      type: 'LOADING',
      payload: true
    })

    const data = {
      title,
      description,
      categoryId: categoryId._id,
      userId: user._id
    };

    dispatch(createJob(data));

  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
    let filter: any = {};
    let paginationConfig = {
      page: 1,
      pageSize: 0,
      whereCondition: JSON.stringify(filter)
    }
    dispatch(getCategory(paginationConfig));

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
          window.location.pathname = `/jobs`;
        }, 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, enqueueSnackbar, alert, history]);

  return (
    <div className='animated fadeIn'>
      <div className='col-md-12 mb-5'>
        <h4 className='mb-0' style={{ color: PrimaryTheme.appBar, fontFamily: PrimaryTheme.fonts?.RubikMedium }}>Create Job <Icon>star</Icon></h4>
      </div>
      <div className="col-md-7 ml-auto mr-auto mb-5 border-radius p-0">
        <React.Fragment>

          <div className='col-md-12 p-0'>
            <form className={classes.root} noValidate autoComplete="off">

              <div className="row m-0 w-100 p-2">
                <div className="form-group col-md-12">
                  <TextField
                    name="title"
                    variant="outlined"
                    required
                    fullWidth
                    id="title"
                    label="Enter job title"
                    inputMode='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    disabled={submitted}
                    error={title.length <= 4 && title !== ''}
                    helperText={title.length <= 4 && title !== '' && 'Title should be more than 4 characters'}
                  />
                </div>

                <div className="form-group col-12">
                  <Autocomplete
                    id="category"
                    options={categoryList}
                    getOptionLabel={(option: any) => option.name}
                    fullWidth
                    disabled={submitted}
                    onChange={(e, option) => setCategoryId(option)}
                    renderInput={(params) => <TextField {...params}
                      label="Choose job Category"
                      variant="outlined"
                      required
                      name='category'
                      value={categoryId}
                      autoComplete='Category'
                      onChange={e => setCategoryId(e.target.value)}
                    />}
                  />
                </div>

                <div className="form-group col-md-12">
                  <TextareaAutosize
                    name="Enter description"
                    placeholder="Enter job description"
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
                  >Create Job</Button>
                </div>
              </div>
            </form>
          </div>

        </React.Fragment>
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
