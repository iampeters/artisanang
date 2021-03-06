import React from 'react'
import { useSnackbar } from 'notistack';
import { makeStyles, createStyles, Theme, TextField, Button, Icon } from '@material-ui/core';
import { Reducers } from '../interfaces/interface';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PrimaryTheme from '../themes/Primary';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { getCategory } from '../redux/Actions/categoryActions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createJob } from '../redux/Actions/jobActions';
import { States } from '../helpers/States';


export default function AddJob() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const user = useSelector((state: Reducers) => state.user);
  const dispatch = useDispatch();
  const alert = useSelector((state: Reducers) => state.alert);
  const category = useSelector((state: Reducers) => state.category);

  const [title, setTitle]: any = React.useState('');
  const [description, setDescription]: any = React.useState('');
  const [submitted, setSubmitted]: any = React.useState(null);
  const [phoneNumberValid, setPhoneNumberValid]: any = React.useState(null);
  const [phoneNumber, setPhoneNumber]: any = React.useState('');
  const [categoryId, setCategoryId]: any = React.useState({})
  const [state, setState]: any = React.useState('');
  const [lga, setLga]: any = React.useState('');
  const [address, setAddress]: any = React.useState('');

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
      phoneNumber,
      userId: user._id,
      state,
      address,
      lga
    };

    dispatch(createJob(data));

  }

  const validatePhoneNumber = (text: any) => {
    let reg = /^[0-9]{11,11}$/;
    if (!reg.test(text)) {
      setPhoneNumber(text);
      setPhoneNumberValid(false);
    } else {
      setPhoneNumber(text);
      setPhoneNumberValid(true);
    }
  };

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
        <h4 className='mb-0' style={{ color: PrimaryTheme.appBar, fontFamily: PrimaryTheme.fonts?.mediumFont }}>Create Job <Icon>star</Icon></h4>
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
                  <TextField
                    name="contact"
                    variant="outlined"
                    required
                    fullWidth
                    id="contact"
                    label="Contact Phone Number"
                    inputMode='tel'
                    value={phoneNumber}
                    onChange={e => validatePhoneNumber(e.target.value)}
                    disabled={submitted}
                    error={!phoneNumberValid && phoneNumberValid !== null}
                    helperText={!phoneNumberValid && phoneNumberValid !== null && 'Invalid phone number'}
                  />
                </div>

                <div className="form-group col-md-12">
                  <Autocomplete
                    id="state"
                    options={States}
                    getOptionLabel={(option) => option.name}
                    fullWidth
                    disabled={submitted}
                    onChange={(e, option) => setState(option?.name)}
                    renderInput={(params) => <TextField {...params}
                      label="State"
                      variant="outlined"
                      required
                      name='state'
                      value={state}
                      autoComplete='state'
                      onChange={e => setState(e.target.value)}
                    // disabled={submitted}
                    />}
                  />
                </div>

                <div className="form-group col-md-12">
                  <TextField
                    name="lga"
                    variant="outlined"
                    required
                    fullWidth
                    id="lga"
                    label="Enter LGA of job"
                    inputMode='text'
                    value={lga}
                    onChange={e => setLga(e.target.value)}
                    disabled={submitted}
                    error={lga.length <= 4 && lga !== ''}
                    helperText={lga.length <= 4 && lga !== '' && 'Title should be more than 4 characters'}
                  />
                </div>

                <div className="form-group col-md-12">
                  <TextField
                    name="address"
                    variant="outlined"
                    fullWidth
                    id="address"
                    label="Enter job address"
                    inputMode="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    disabled={submitted}
                    error={address.length <= 4 && address !== ''}
                    helperText={address.length <= 4 && address !== '' && 'Title should be more than 4 characters'}
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
                    style={{ minHeight: 100, borderColor: PrimaryTheme.black }}
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
                        state === '' ? true : false ||
                        lga === '' ? true : false ||
                        submitted
                    }
                    style={{ background: PrimaryTheme.black, color: PrimaryTheme.warn }}
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
