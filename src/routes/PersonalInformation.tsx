import React from 'react'
import PrimaryTheme from '../themes/Primary'
import { useSelector, useDispatch } from 'react-redux'
import { Reducers, CountryType } from '../interfaces/interface'
import { useSnackbar } from 'notistack';
import { fileUpload } from '../redux/Actions/configAction';
import { makeStyles, createStyles, Theme, Avatar, TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Countries } from '../helpers/Countries';
import { States } from '../helpers/States';
import { updateAccount } from '../redux/Actions/artisanActions';
import { useHistory } from 'react-router-dom';

export default function PersonalInformation() {
  const user = useSelector((state: Reducers) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const history= useHistory();
  const file = useSelector((state: Reducers) => state.file);
  const [imageUrl, setImageUrl]: any = React.useState('/add-user.png');
  const alert = useSelector((state: Reducers) => state.alert);
  const classes = useStyles();
  const dispatch = useDispatch();


  const [firstname, setFirstname] = React.useState(user.firstname)
  const [firstnameValid, setFirstnameValid]: any = React.useState(user.firstname?.length > 0? true: false)
  const [lastname, setLastname] = React.useState(user.lastname)
  const [lastnameValid, setLastnameValid]: any = React.useState(user.lastname?.length > 0? true: false)
  const [email, setEmail] = React.useState(user.email)
  const [phoneNumber, setPhoneNumber] = React.useState(user.phoneNumber)
  const [phoneNumberValid, setPhoneNumberValid]: any = React.useState(user.phoneNumber?.length > 0? true: false)
  const [isEmailValid, setEmailValid]: any = React.useState(user.email?.length > 0? true: false);
  const [address, setAddress]: any = React.useState(user.address);
  const [state, setState]: any = React.useState(user.state);
  const [country, setCountry]: any = React.useState(user.country);
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
      imageUrl: imageUrl,
      state: state,
      country: country,
      _id: user._id
    };

    dispatch(updateAccount(artisan));
  }

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
        enqueueSnackbar(alert.message, { variant: "success" });
        dispatch({
          type: 'ALERT',
          payload: {}
        });

        // history.push('/onboarding/business-information');
        window.location.pathname = '/onboarding/business-information';

      }
    }
  }, [dispatch, enqueueSnackbar, alert, history]);

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
    <div className='col-md-5 ml-auto mr-auto' style={{
      minHeight: 'calc(100vh - 64px)'
    }}>
      <div className="row m-0 p-3 justify-content-around align-items-center w-100">
        <div className="col-md-4 mt-3 mb-3 justify-content-around align-items-center">
          <div className="row m-0 justify-content-around">
            <div className="box" style={{
              width: 20,
              height: 20,
              borderRadius: 25,
              background: PrimaryTheme.primary,
              textAlign: 'center',
              fontSize: 12,
              color: PrimaryTheme.white,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              fontFamily: PrimaryTheme.fonts?.RubikMedium
            }}>1</div>
            <div className="box" style={{
              width: 20,
              height: 20,
              borderRadius: 25,
              background: PrimaryTheme.light,
              textAlign: 'center',
              fontSize: 12,
              color: PrimaryTheme.dark,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              fontFamily: PrimaryTheme.fonts?.RubikMedium
            }}>2</div>
            <div className="box" style={{
              width: 20,
              height: 20,
              borderRadius: 25,
              background: PrimaryTheme.light,
              textAlign: 'center',
              fontSize: 10,
              color: PrimaryTheme.dark,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              fontFamily: PrimaryTheme.fonts?.RubikMedium
            }}>3</div>
          </div>
        </div>

        <div className="col-md-12 mb-3">
          <h4 style={{
            fontSize: PrimaryTheme.fontSizes?.body,
            textAlign: 'center',
            fontFamily: PrimaryTheme.fonts?.RubikMedium,
            color: PrimaryTheme.black,
            marginBottom: 0
          }}>Personal Information</h4>
          <p style={{
            fontSize: PrimaryTheme.fontSizes?.small,
            textAlign: 'center',
            fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
            color: PrimaryTheme.dark
          }}>Update your information</p>
        </div>

        <div className="col-md-12 mb-3">
          <div className="col-md-12 ml-auto mr-auto mb-3 text-center">
            <label htmlFor="file" className='pointer'>
              <Avatar
                className={classes.large + ' mr-auto ml-auto mb-1'}
                alt={`${user.firstname} ${user.lastname}`}
                src={imageUrl} />
              {imageUrl === '/add-user.png' ? "Upload Photo" : "Change"}
            </label>
            <input type="file" id='file' name='file' disabled={submitted} onChange={handleFile} className='d-none' />
          </div>

          <form>
            <div className="form-group">
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                disabled
                required
                fullWidth
                id="firstName"
                label="First Name"
                inputMode='text'
                value={firstname}
                onChange={e => validateName(e.target.value, 'firstname')}
                // disabled={submitted}
                error={!firstnameValid && firstnameValid !== null}
                helperText={!firstnameValid && firstnameValid !== null && 'Only alphabets allowed.'}
              />
            </div>

            <div className="form-group">
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
                disabled={true}
                error={!lastnameValid && lastnameValid !== null}
                helperText={!lastnameValid && lastnameValid !== null && 'Only alphabets allowed.'}
              />
            </div>

            <div className="form-group">
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
                disabled={true}
              />
            </div>

            <div className="form-group">
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
                disabled={true}
              />
            </div>

            <div className="form-group">
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

            <div className="form-group">
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

            <div className="form-group">
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

            <div className="form-group">
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
                          submitted ||
                          imageUrl === '/add-user.png' ? true : false
                }
                style={{ background: PrimaryTheme.primary, color: PrimaryTheme.white }}
              >Update Profile</Button>
            </div>

          </form>
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
