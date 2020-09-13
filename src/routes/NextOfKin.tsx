import React from 'react'
import PrimaryTheme from '../themes/Primary'
import { useSelector, useDispatch } from 'react-redux'
import { Reducers } from '../interfaces/interface'
import { useSnackbar } from 'notistack';
import { makeStyles, createStyles, Theme, TextField, Button } from '@material-ui/core';
import { updateNextOfKin } from '../redux/Actions/artisanActions';

export default function NextOfKin() {
  const user = useSelector((state: Reducers) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const alert = useSelector((state: Reducers) => state.alert);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [guarantor, setGuarantor] = React.useState('')
  const [guarantorAddress, setGuarantorAddress] = React.useState('')
  const [guarantorPhoneNumber, setGuarantorPhoneNumber] = React.useState('')
  const [phoneNumberValid, setPhoneNumberValid]: any = React.useState(null);
  const [guarantorValid, setGuarantorValid]: any = React.useState(null)
  const [submitted, setSubmitted] = React.useState(false);

  const validateName = (text: any) => {
    // minimum of one character
    // let reg = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/;
    if (text.length <= 2) {

      setGuarantor(text);
      setGuarantorValid(false);
    } else {
      setGuarantor(text);
      setGuarantorValid(true);
    }
  };

  const validatePhoneNumber = (text: any) => {
    let reg = /^[0-9]{11,11}$/;
    if (!reg.test(text)) {
      setGuarantorPhoneNumber(text);
      setPhoneNumberValid(false);
    } else {
      setGuarantorPhoneNumber(text);
      setPhoneNumberValid(true);
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
      guarantor,
      guarantorAddress,
      guarantorPhoneNumber,
      _id: user._id
    };

    dispatch(updateNextOfKin(artisan));
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

        setTimeout(() => {
          window.location.pathname = '/dashboard';
        }, 500);
      }
    }
  }, [dispatch, enqueueSnackbar, alert]);

  return (
    <div className='col-md-4 ml-auto mr-auto' style={{
      minHeight: 'calc(100vh - 64px)'
    }}>
      <div className="row m-0 p-3 justify-content-around align-items-center w-100">
        <div className="col-md-4 p-4 justify-content-around align-items-center">
          <div className="row m-0 justify-content-around">
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
              background: PrimaryTheme.primary,
              textAlign: 'center',
              fontSize: 10,
              color: PrimaryTheme.white,
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
          }}>Guarantor Information</h4>
          <p style={{
            fontSize: PrimaryTheme.fontSizes?.small,
            textAlign: 'center',
            fontFamily: PrimaryTheme.fonts?.ProductSansRegular,
            color: PrimaryTheme.dark
          }}>Enter Next of Kin Information</p>
        </div>

        <div className="col-md-12 mb-3">

          <form>
            <div className="form-group">
              <TextField
                autoComplete="text"
                name="guarantor"
                variant="outlined"
                required
                fullWidth
                id="guarantor"
                label="Guarantor Full Name"
                inputMode='text'
                value={guarantor}
                onChange={e => validateName(e.target.value)}
                disabled={submitted}
                error={!guarantorValid && guarantorValid !== null}
                helperText={!guarantorValid && guarantorValid !== null && 'Only alphabets allowed'}
              />
            </div>

            <div className="form-group">
              <TextField
                label="Guarantor Phone Number"
                autoComplete="tel"
                name="phoneNumber"
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                inputMode='text'
                value={guarantorPhoneNumber}
                onChange={e => validatePhoneNumber(e.target.value)}
                disabled={submitted}
                error={!phoneNumberValid && phoneNumberValid !== null}
                helperText={!phoneNumberValid && phoneNumberValid !== null && 'Invalid phone number'}
              />
            </div>

            <div className="form-group">
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Guarantor Address"
                name="address"
                autoComplete="address"
                inputMode='text'
                value={guarantorAddress}
                onChange={e => setGuarantorAddress(e.target.value)}
                disabled={submitted}
              />
            </div>
            {/* 
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
            </div> */}

            <div className="form-group">
              <Button
                type='submit'
                variant="outlined"
                size="medium"
                className={classes.button + ' col mt-2'}
                onClick={handleSubmit}
                disabled={
                  !phoneNumberValid ||
                  submitted ||
                  !guarantorValid
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
