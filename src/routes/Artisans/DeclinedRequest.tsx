import React from 'react'
import PrimaryTheme from '../../themes/Primary'
import { useHistory } from 'react-router-dom'
import { Icon } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Reducers } from '../../interfaces/interface';
import { useSnackbar } from 'notistack';
import FolderList from '../../components/JobList';
import PaginationControlled from '../../components/Pagination';
import Placeholder from '../../components/Skeleton';
import { getDate } from '../../helpers/Functions';
import { getRequests } from '../../redux/Actions/requestActions';

export default function DeclinedRequests() {
  const history = useHistory();

  const alert = useSelector((state: Reducers) => state.alert);
  const user = useSelector((state: Reducers) => state.user);
  const requests = useSelector((state: Reducers) => state.requests);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(25);

  let requestList: any = requests.items && requests.items;


  let filter: any = { artisanId: user._id, status: 'DECLINED' };
  let paginationConfig = {
    page: page + 1,
    pageSize,
    whereCondition: JSON.stringify(filter)
  }

  const handleClick = (id: any) => {
    history.push(`/requests/details/${id}`)
  }

  const handleRefresh = () => {
    dispatch({
      type: 'LOADING',
      payload: true
    })
    dispatch(getRequests(paginationConfig));
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePageSizeChange = (event: React.MouseEvent<HTMLButtonElement> | null, value: any) => {
    setPageSize(value.props.value);

    paginationConfig.pageSize = value.props.value;
    dispatch(getRequests(paginationConfig))
  };

  React.useEffect(() => {
    paginationConfig.whereCondition = JSON.stringify(filter);
    dispatch(getRequests(paginationConfig));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);

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
      <div className='col-md-12 p-0 mb-4'>
        <div className="row">
          <div className="col-8">
            <h4 className='mb-0' style={{ color: PrimaryTheme.appBar, fontFamily: PrimaryTheme.fonts?.mediumFont }}>Declined Requests</h4>
          </div>

          <div className="col-4 text-right">
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

      {/* request list */}
      <div className="col-md-9 ml-auto mr-auto p-0 mb-3">
        <div className="row m-0 justify-content-center align-items-center">
          {requestList ? (
            <React.Fragment>

              {requestList.length !== 0 && requestList?.map((item: any, index: number) =>

                <FolderList
                  key={index}
                  title={item.jobId && item.jobId.title}
                  status={item.status}
                  color={"danger"}
                  createdOn={getDate(item.createdOn)}
                  onClick={() => handleClick(item._id)} />

              )}

              {requestList.length === 0 &&
                <React.Fragment>
                  <img src="/empty.svg" alt="No jobs" className='col-md-5 col-10' />
                  <p className='text-center mt-3 text-light w-100'>No requests</p>
                </React.Fragment>

              }


              <div className='col-md-12 p-0 mt-3'>
                {requests.total > pageSize && <PaginationControlled onPageSizeChange={handlePageSizeChange} onChange={handleChange} page={page} total={requests.total && requests.total} pageSize={pageSize} />}
              </div>
            </React.Fragment>
          ) : (
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
            )}
        </div>
      </div>

      {/* <div style={{
        bottom: 0,
        right: 20,
        width: "auto",
        position: 'fixed'
      }}>
        <div className="row m-0 justify-content-end align-items-center">
          <FloatingActionButtons
            marginRight={5}
            IconName="add"
            IconText="New Job"
            variant="extended"
            onClick={navigate}
            customColor={PrimaryTheme.warn}
            IconColor={PrimaryTheme.black} />
        </div>
      </div> */}
    </div >
  )
}
