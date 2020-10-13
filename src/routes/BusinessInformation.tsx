import React from 'react'
import PrimaryTheme from '../themes/Primary'
import { useSelector, useDispatch } from 'react-redux'
import { Reducers } from '../interfaces/interface'
import { useSnackbar } from 'notistack';
import { getCategory } from '../redux/Actions/categoryActions';
import { makeStyles, createStyles, Theme, TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { updateBusiness } from '../redux/Actions/artisanActions';

export default function BusinessInformation() {
  const user = useSelector((state: Reducers) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const category = useSelector((state: Reducers) => state.category);
  const alert = useSelector((state: Reducers) => state.alert);
  const classes = useStyles();
  const dispatch = useDispatch();
  let categoryList: any = category.items ? category.items : [];

  const [categoryId, setCategoryId]: any = React.useState({})
  const [experience, setExperience]: any = React.useState('')
  const [website, setWebsite]: any = React.useState('')
  const [websiteValid, setWebsiteValid]: any = React.useState(null);
  const [businessName, setBusinessName]: any = React.useState(user.businessName || '');
  const [RCNumber, setRCNumber]: any = React.useState(user.RCNumber || '');
  const [description, setDescription]: any = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const validateUrl = (text: string) => {
    // email pattern
    // let reg = /^(ftp|http|https):\/\/[^ "]+$/;
    let reg = /^(ftp|http|https|chrome|:\/\/|\.|@){2,}(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\S*:\w*@)*([a-zA-Z]|(\d{1,3}|\.){7}){1,}(\w|\.{2,}|\.[a-zA-Z]{2,3}|\/|\?|&|:\d|@|=|\/|\(.*\)|#|-|%)*$/gum;
    if (!reg.test(text)) {
      setWebsiteValid(false);
      setWebsite(text.toLowerCase());
    } else {
      setWebsiteValid(true);
      setWebsite(text);
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
      categoryId: categoryId._id,
      businessName,
      website,
      experience,
      description,
      RCNumber,
      _id: user._id,
    };

    dispatch(updateBusiness(artisan));
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
        enqueueSnackbar(alert.message, { variant: "success" });
        dispatch({
          type: 'ALERT',
          payload: {}
        });

        window.location.pathname = '/onboarding/next-of-kin';
      }
    }
  }, [dispatch, enqueueSnackbar, alert]);

  return (
    <div className='col-md-5 ml-auto mr-auto' style={{
      minHeight: 'calc(100vh - 64px)'
    }}>
      <div className="row m-0 p-3 justify-content-around align-items-center w-100">
        <div className="col-md-5 mt-3 mb-3 col-lg-4 justify-content-around align-items-center">
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
              fontFamily: PrimaryTheme.fonts?.mediumFont
            }}>1</div>
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
              fontFamily: PrimaryTheme.fonts?.mediumFont
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
              fontFamily: PrimaryTheme.fonts?.mediumFont
            }}>3</div>
          </div>
        </div>

        <div className="col-md-12 mb-3">
          <h4 style={{
            fontSize: PrimaryTheme.fontSizes?.body,
            textAlign: 'center',
            fontFamily: PrimaryTheme.fonts?.mediumFont,
            color: PrimaryTheme.black,
            marginBottom: 0
          }}>Business Information</h4>
          <p style={{
            fontSize: PrimaryTheme.fontSizes?.small,
            textAlign: 'center',
            fontFamily: PrimaryTheme.fonts?.primaryFont,
            color: PrimaryTheme.dark
          }}>Let's know what you do</p>
        </div>

        <div className="col-md-12 mb-3">

          <form>
            <div className="col-md-12 p-0">
              <p className='small' style={{
                fontFamily: PrimaryTheme.fonts?.mediumFont
              }}>Business Name</p>
            </div>

            <div className="form-group">
              <TextField
                variant="outlined"
                fullWidth
                required
                id="businessName"
                label="Business Name"
                name="businessName"
                inputMode='text'
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                disabled={submitted}
              />
            </div>

            <div className="col-md-12 p-0">
              <p className='small' style={{
                fontFamily: PrimaryTheme.fonts?.mediumFont
              }}>RC Number</p>
            </div>

            <div className="form-group">
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

            <div className="col-md-12 p-0">
              <p className='small' style={{
                fontFamily: PrimaryTheme.fonts?.mediumFont
              }}>Business Category</p>
            </div>

            <div className="form-group">
              <Autocomplete
                id="category"
                options={categoryList}
                getOptionLabel={(option: any) => option.name}
                fullWidth
                disabled={submitted}
                onChange={(e, option) => setCategoryId(option)}
                renderInput={(params) => <TextField {...params}
                  label="Business Category"
                  variant="outlined"
                  required
                  name='category'
                  value={categoryId}
                  autoComplete='Category'
                  onChange={e => setCategoryId(e.target.value)}
                />}
              />
            </div>

            <div className="col-md-12 p-0">
              <p className='small' style={{
                fontFamily: PrimaryTheme.fonts?.mediumFont
              }}>Website (Optional)</p>
            </div>

            <div className="form-group">
              <TextField
                variant="outlined"
                fullWidth
                id="website"
                label="Website"
                name="website"
                error={!websiteValid && website !== ''}
                helperText={ !websiteValid && website !== '' && 'Invalid url'}
                inputMode='url'
                value={website}
                onChange={e => validateUrl(e.target.value)}
                disabled={submitted}
              />
            </div>

            <div className="col-md-12 p-0">
              <p className='small' style={{
                fontFamily: PrimaryTheme.fonts?.mediumFont
              }}>Years of Experience</p>
            </div>

            <div className="form-group">
              <TextField
                variant="outlined"
                required
                type="number"
                fullWidth
                id="Experience"
                label="Experience"
                name="Experience"
                autoComplete="tel"
                inputMode='tel'
                value={experience}
                onChange={e => setExperience(e.target.value)}
                error={experience <= 0 && experience !== ''}
                helperText={experience <= 0 && experience !== '' && 'Invalid experience'}
                disabled={submitted}
              />
            </div>


            <div className="col-md-12 p-0">
              <p className='small' style={{
                fontFamily: PrimaryTheme.fonts?.mediumFont
              }}>Describe what you do</p>
            </div>

            <div className="form-group">
              <TextField
                variant="outlined"
                fullWidth
                required
                id="description"
                label="Description"
                name="description"
                multiline
                rows={4}
                inputMode='text'
                value={description}
                onChange={e => setDescription(e.target.value)}
                disabled={submitted}
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
                  submitted ||
                  description.length > 50? false: true ||
                  experience === 0 || experience === ''? false: true ||
                  !categoryId._id ||
                  businessName.length > 2? false:true
                }
                style={{ background: PrimaryTheme.primary, color: PrimaryTheme.white }}
              >Update Business Information</Button>
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
