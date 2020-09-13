import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Reducers } from '../interfaces/interface';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { confirmEmail } from '../redux/Actions/userActions';
import PrimaryTheme from '../themes/Primary';

export default function EmailConfirmation() {

  const alert = useSelector((state: Reducers) => state.alert);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading]: any = React.useState(null);

  const params = useParams();


  const handleRetry = () => {
    dispatch({
      type: 'LOADING',
      payload: true
    })
    setLoading(true);
    dispatch(confirmEmail(params));
  }

  React.useEffect(() => {
    setLoading(true);

    dispatch({
      type: 'LOADING',
      payload: true
    })
    dispatch(confirmEmail(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        dispatch({
          type: 'LOADING',
          payload: false
        })

        setLoading(false);

      } else {
        enqueueSnackbar("Email confirmed", { variant: "success" });

        setTimeout(() => {
          dispatch({
            type: 'LOADING',
            payload: false
          })
          window.location.pathname = '/home';
        }, 1000);
      }
    }
  }, [dispatch, enqueueSnackbar, alert]);

  return (
    <div className='col-md-8 ml-auto mr-auto' style={{
      minHeight: 'calc(100vh - 64px)'
    }}>
      <div className="row justify-content-center align-items-center h-inherit">
        {!loading && loading !== null && <div className="form-group bg-white p-5 border-radius-20" style={{
          minWidth: 400,
          width: 'auto',
          textAlign: 'center'
        }}>
          <svg width="5em" height="5em" viewBox="0 0 16 16" className="bi bi-patch-exclamation-fll animated shake" fill={PrimaryTheme.danger} xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.553.553 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
          </svg>

          <h4 style={{
            marginTop: 20,
            marginBottom: 20,
            fontFamily: PrimaryTheme.fonts?.RubikMedium,
            color: PrimaryTheme.dark,
          }}>Email confirmation failed</h4>
          <button onClick={handleRetry} className='btn btn-success border-radius-20 btn-md pl-3 pr-3'>Retry</button>
        </div>
        }

        {loading && loading !== null && <div className="form-group bg-white p-5 border-radius-20" style={{
          minWidth: 400,
          width: 'auto',
          textAlign: 'center'
        }}>
          <svg width="4em" height="4em" viewBox="0 0 16 16" className="bi bi-hourglass-split" fill={PrimaryTheme.primary} xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0c0 .701.478 1.236 1.011 1.492A3.5 3.5 0 0 1 11.5 13s-.866-1.299-3-1.48V8.35z" />
          </svg>

          <h4 style={{
            marginTop: 20,
            marginBottom: 20,
            color: PrimaryTheme.primary,
            fontFamily: PrimaryTheme.fonts?.RubikMedium
          }}>Processing...</h4>
        </div>
        }
      </div>
    </div>
  )
}
