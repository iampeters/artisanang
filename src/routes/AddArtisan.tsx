import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PrimaryTheme from '../themes/Primary';
import { Reducers, CountryType, Category } from '../interfaces/interface';
import Avatar from '@material-ui/core/Avatar';
import { useSelector, useDispatch } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { States } from '../helpers/States';
import { Countries } from '../helpers/Countries';
import { Button, Icon } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { createArtisan } from '../redux/Actions/artisanActions';
import { fileUpload } from '../redux/Actions/configAction';
import { getCategory } from '../redux/Actions/categoryActions';

export default function AddArtisan() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state: Reducers) => state.user);
  const category = useSelector((state: Reducers) => state.category);
  const file = useSelector((state: Reducers) => state.file);
  const [imageUrl, setImageUrl]: any = React.useState('/add-user.png');
  const alert = useSelector((state: Reducers) => state.alert);

  const dispatch = useDispatch();

  let categoryList: any = category.items ? category.items : [];


  const [firstname, setFirstname] = React.useState('')
  const [firstnameValid, setFirstnameValid]: any = React.useState(null)
  const [lastname, setLastname] = React.useState('')
  const [categoryId, setCategoryId]: any = React.useState({})
  const [lastnameValid, setLastnameValid]: any = React.useState(null)
  const [email, setEmail] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [phoneNumberValid, setPhoneNumberValid]: any = React.useState(null)
  const [isEmailValid, setEmailValid]: any = React.useState(null);
  const [businessName, setBusinessName]: any = React.useState('');
  const [RCNumber, setRCNumber]: any = React.useState('');
  const [address, setAddress]: any = React.useState('');
  const [state, setState]: any = React.useState('');
  const [country, setCountry]: any = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const RAND_NUM = Math.floor(Math.random() * 1234567890);


  const validateEmail = (text: string) => {
    // email pattern
    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(text)) {
      setEmailValid(false);
      setEmail(text.toLowerCase());
    } else {
      setEmailValid(true);
      setEmail(text);
    }
  };

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

  const validateName = (text: any, type: any) => {
    // minimum of one character
    let reg = /^[a-zA-Z]{1,}$/;
    if (!reg.test(text)) {

      if (type === 'firstname') {
        setFirstname(text);
        setFirstnameValid(false);
      } else {
        setLastname(text);
        setLastnameValid(false);
      }
    } else {
      if (type === 'firstname') {
        setFirstname(text);
        setFirstnameValid(true);
      } else {
        setLastname(text);
        setLastnameValid(true);
      }
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);

    dispatch({
      type: 'LOADING',
      payload: true
    })

    const artisan = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      categoryId: categoryId._id,
      createdBy: user._id,
      imageUrl: imageUrl,
      businessName: businessName,
      RCNumber: RCNumber,
      state: state,
      country: country
    };

    dispatch(createArtisan(artisan));
  }

  React.useEffect(() => {
    let filter: any = {};
    let paginationConfig = {
      page: 1,
      pageSize: 0,
      whereCondition: JSON.stringify(filter)
    }
    dispatch(getCategory(paginationConfig));
  }, [dispatch]);

  React.useEffect(() => {
    if (Object.entries(alert).length !== 0) {
      if (!alert.successful) {
        // display error message
        enqueueSnackbar(alert.message, { variant: "error" });
        dispatch({
          type: 'ALERT',
          payload: {}
        });

        setSubmitted(false);
      } else {
        dispatch({
          type: 'ALERT',
          payload: {}
        });

        window.location.pathname = '/my-artisans';
      }
    }
  }, [dispatch, enqueueSnackbar, alert]);

  React.useEffect(() => {
    if (file.successful) {
      setImageUrl(file.result);
    }
  }, [file]);

  // ISO 3166-1 alpha-2
  // ⚠️ No support for IE 11
  function countryToFlag(isoCode: string) {
    return typeof String.fromCodePoint !== 'undefined'
      ? isoCode
        .toUpperCase()
        .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
      : isoCode;
  }

  const handleFile = (e: any) => {
    let pic = e.currentTarget.files[0];
    let fd = new FormData();
    if (pic) {
      fd.append('imageUrl', pic)
      fd.append('code', `${RAND_NUM}`)
      dispatch(fileUpload(fd))
      dispatch({
        type: 'LOADING',
        payload: true
      })

    }
  }

  return (
    <div className='animated fadeIn'>
      <div className="col-md-12 ml-auto mr-auto mb-5 border-radius">
        <div className="row m-0">
          <div className="col-md-12 ml-auto mr-auto mb-3 text-center">
            <h4 className='text-left text-color' style={{
              fontFamily: PrimaryTheme.fonts?.mediumFont
            }}> Add Artisan <Icon>star</Icon></h4>
            <label htmlFor="file" className=' pointer'>
              <Avatar
                className={classes.large + ' mr-auto ml-auto mb-1'}
                alt={`${user.firstname} ${user.lastname}`}
                src={imageUrl} />
                {imageUrl === '/add-user.png'? "Upload Photo": "Change"}
            </label>
            <input type="file" id='file' name='file' disabled={submitted} onChange={handleFile} className='d-none' />
          </div>


          <div className="col-md-7 ml-auto mr-auto p-2 mb-5">
            <form className={classes.root} noValidate autoComplete="off">
              <div className="row m-0 w-100">
                <div className="col-md-12">
                  <p className='small' style={{
                    fontFamily: PrimaryTheme.fonts?.mediumFont
                  }}>Basic information</p>
                </div>

                <div className="form-group col-sm-6">
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    inputMode='text'
                    value={firstname}
                    onChange={e => validateName(e.target.value, 'firstname')}
                    disabled={submitted}
                    error={!firstnameValid && firstnameValid !== null}
                    helperText={!firstnameValid && firstnameValid !== null && 'Only alphabets allowed.'}
                  />
                </div>

                <div className="form-group col-sm-6">
                  <TextField
                    label="Last Name"
                    autoComplete="lname"
                    name="lastName"
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    inputMode='text'
                    value={lastname}
                    onChange={e => validateName(e.target.value, 'lastname')}
                    disabled={submitted}
                    error={!lastnameValid && lastnameValid !== null}
                    helperText={!lastnameValid && lastnameValid !== null && 'Only alphabets allowed.'}
                  />
                </div>

                <div className="form-group col-sm-6">
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    inputMode='email'
                    value={email}
                    onChange={e => validateEmail(e.target.value)}
                    error={!isEmailValid && isEmailValid !== null}
                    helperText={!isEmailValid && isEmailValid !== null && 'Invalid email'}
                    disabled={submitted}
                  />
                </div>

                <div className="form-group col-sm-6">
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="tel"
                    inputMode='tel'
                    value={phoneNumber}
                    onChange={e => validatePhoneNumber(e.target.value)}
                    error={!phoneNumberValid && phoneNumberValid !== null}
                    helperText={!phoneNumberValid && phoneNumberValid !== null && 'Invalid phone number'}
                    disabled={submitted}
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
                      label="Choose Category"
                      variant="outlined"
                      required
                      name='category'
                      value={categoryId}
                      autoComplete='Category'
                      onChange={e => setCategoryId(e.target.value)}
                    />}
                  />
                </div>

                <div className="col-md-12">
                  <p className='small' style={{
                    fontFamily: PrimaryTheme.fonts?.mediumFont
                  }}>Business Information (Optional)</p>
                </div>

                <div className="form-group col-sm-6">
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="businessName"
                    label="Business Name"
                    name="businessName"
                    inputMode='text'
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    disabled={submitted}
                  />
                </div>

                <div className="form-group col-sm-6">
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="RCNumber"
                    label="RC Number"
                    name="RCNumber"
                    inputMode='text'
                    value={RCNumber}
                    onChange={e => setRCNumber(e.target.value)}
                    disabled={submitted}
                  />
                </div>

                <div className="col-md-12">
                  <p className='small' style={{
                    fontFamily: PrimaryTheme.fonts?.mediumFont
                  }}>Artisan Location</p>
                </div>

                <div className="form-group col-12">
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                    inputMode='text'
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    disabled={submitted}
                  />
                </div>

                <div className="form-group col-sm-6">
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

                <div className="form-group col-sm-6">
                  <Autocomplete
                    id="country-select-demo"
                    options={Countries as CountryType[]}
                    classes={{
                      option: classes.option,
                    }}
                    disabled={submitted}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    onChange={(e, option) => setCountry(option?.label)}
                    renderOption={(option) => (
                      <React.Fragment>
                        <span>{countryToFlag(option.code)}</span>
                        {option.label} ({option.code}) +{option.phone}
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Choose a country"
                        variant="outlined"
                        name='country'
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'country',
                        }}
                        required
                        value={country}
                        disabled={submitted}
                      />
                    )}
                  />
                </div>

                <div className="form-group col-12">
                  <Button
                    type='submit'
                    variant="outlined"
                    size="medium"
                    className={classes.button + ' col mt-2'}
                    onClick={handleSubmit}
                    disabled={
                      !isEmailValid ||
                        !lastnameValid ||
                        !firstnameValid ||
                        !phoneNumberValid ||
                        state === '' ? true : false ||
                          country === '' ? true : false ||
                            address === '' ? true : false ||
                            submitted
                    }
                    style={{ background: PrimaryTheme.black, color: PrimaryTheme.white }}
                  >Add Artisan</Button>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div >
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
      width: theme.spacing(8),
      height: theme.spacing(8),
    }, paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
    }, backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    }, option: {
      fontSize: 15,
      '& > span': {
        marginRight: 10,
        fontSize: 18,
      },
    },
  }),
);
