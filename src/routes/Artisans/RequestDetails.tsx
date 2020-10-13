import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PrimaryTheme from '../../themes/Primary';
import { Icon } from '@material-ui/core';
import { Reducers } from '../../interfaces/interface';
import { useSnackbar } from 'notistack';
import { useHistory, useParams } from 'react-router-dom';
import ImgMediaCard from '../../components/Card';
import { getDate } from '../../helpers/Functions';
import Placeholder from '../../components/Skeleton';
import { acceptRequest, getRequestDetails, rejectRequest } from '../../redux/Actions/requestActions';

export default function RequestDetails() {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();
  const params: any = useParams();

  const alert = useSelector((state: Reducers) => state.alert);
  const request = useSelector((state: any) => state.requests);

  const handleRefresh = () => {
    dispatch({
      type: 'LOADING',
      payload: true
    });

    dispatch(getRequestDetails(params.id));
  }


  const acceptJob = () => {
    if (window.confirm("Are you sure?")) {

      dispatch({
        type: 'LOADING',
        payload: true
      })

      dispatch(acceptRequest(params.id))
    }
  };

  const rejectJob = () => {
    if (window.confirm("Are you sure?")) {

      dispatch({
        type: 'LOADING',
        payload: true
      })

      dispatch(rejectRequest(params.id))
    }
  };


  React.useEffect(() => {
    dispatch(getRequestDetails(params.id));

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
          type: 'LOADING',
          payload: false
        })

        dispatch({
          type: 'ALERT',
          payload: {}
        });

      } else {

        handleRefresh();

        dispatch({
          type: 'LOADING',
          payload: false
        })

        dispatch({
          type: 'ALERT',
          payload: {}
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, enqueueSnackbar, alert, history]);

  return (
    <div className='animated fadeIn'>
      <div className='col-md-12 p-0 mb-4'>
        <div className="row">
          <div className="col-8">
            <h4 className='mb-0' style={{ color: PrimaryTheme.appBar, fontFamily: PrimaryTheme.fonts?.mediumFont }}> Job Details</h4>
          </div>

          <div className="col-4 text-right">
            <button className='btn btn-dark btn-sm mr-3' type="reset" onClick={() => history.goBack()} title="Go back">
              <div className="row m-0 justify-content-between align-items-center">
                <Icon style={{
                  fontSize: 20
                }}>arrow_back</Icon>
              </div>
            </button>

            <button className='btn btn-dark btn-sm' type="reset" onClick={handleRefresh} title="Reload">
              <div className="row m-0 justify-content-between align-items-center">
                <Icon style={{
                  fontSize: 20
                }}>refresh</Icon>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-9 col-lg-7 ml-auto mr-auto p-0 mb-5">
        {Object.entries(request).length !== 0 ?
          <ImgMediaCard
            title={request.jobId && request.jobId.title}
            description={request.jobId && request.jobId.description}
            status={request.status}
            date={getDate(request.createdOn)}
            category={request.categoryId && request.categoryId.name}
            color={request.status === "ACCEPTED" ? "success": ((request.status === "DECLINED" || request.status === "TIMEOUT")? "danger": 'warning')}
            actionButton="Accept"
            actionButtonColor={PrimaryTheme.white}
            actionButtonBgColor={PrimaryTheme.success}
            secondActionButton="Reject"
            secondActionButtonColor={PrimaryTheme.danger}
            onAccept={acceptJob}
            onEdit={rejectJob}
            type="request"
            address={request.jobId && request.jobId.address}
            state={request.jobId && request.jobId.state}
            lga={request.jobId && request.jobId.lga}
            phoneNumber={request.jobId && request.jobId.phoneNumber}
          />
          : (
            <React.Fragment>
              <div className="col-md-12 text-center">
                <Placeholder variant="text" width={'100%'} height={120} animation='wave' className="display-inline" />
              </div>
              <div className="col-md-12 text-center">
                <Placeholder variant="text" width={'100%'} height={120} animation='wave' className="display-inline" />
              </div>
              <div className="col-md-12 text-center">
                <Placeholder variant="text" width={'100%'} height={120} animation='wave' className="display-inline" />
              </div>

            </React.Fragment>
          )
        }

      </div>
    </div>
  )
}
