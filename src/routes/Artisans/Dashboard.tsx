import React from 'react'
import PrimaryTheme from '../../themes/Primary'
import { useHistory } from 'react-router-dom'
import { createStyles, Icon, makeStyles, Theme } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Reducers, JobProps } from '../../interfaces/interface';
import { useSnackbar } from 'notistack';
import FolderList from '../../components/JobList';
import { getJobs } from '../../redux/Actions/jobActions';
import PaginationControlled from '../../components/Pagination';
import Placeholder from '../../components/Skeleton';
import { getDate } from '../../helpers/Functions';
import { getArtisanDashboard } from '../../redux/Actions/configAction';

export default function Dashboard() {
  const history = useHistory();
  const classes = useStyles();

  const alert = useSelector((state: Reducers) => state.alert);
  const jobs = useSelector((state: Reducers) => state.jobs);
  const user = useSelector((state: Reducers) => state.user);
  const dashboard = useSelector((state: Reducers) => state.dashboard);


  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(25);

  let jobList: any = jobs.items && jobs.items;

  let filter: any = { status: 'NEW', categoryId: user.categoryId };
  let paginationConfig = {
    page: page + 1,
    pageSize,
    whereCondition: JSON.stringify(filter)
  }

  const handleClick = (id: any) => {
    history.push(`/jobs/details/${id}`)
  }

  const handleRefresh = () => {
    dispatch({
      type: 'LOADING',
      payload: true
    })
    dispatch(getJobs(paginationConfig));
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePageSizeChange = (event: React.MouseEvent<HTMLButtonElement> | null, value: any) => {
    setPageSize(value.props.value);

    paginationConfig.pageSize = value.props.value;
    dispatch(getJobs(paginationConfig))
  };

  React.useEffect(() => {

    dispatch(getJobs(paginationConfig));
    dispatch(getArtisanDashboard());
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
      <div className='col-md-12 p-0 mb-5'>
        <div className="row">
          <div className="col-8">
  <h4 className='mb-0' style={{ color: PrimaryTheme.appBar, fontFamily: PrimaryTheme.fonts?.mediumFont }}>{user.categoryId && user.categoryId.name}</h4>
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


      <div className="col-md-10 ml-auto mr-auto p-0 mb-3">
        <div className="row mt-4">

          <div className="col-md-3 mb-3">
            <div style={{ backgroundColor: PrimaryTheme.appBar, }} className={classes.card + " p-3 border-radius-bottom-right box-shadow text-center pointer"} onClick={() => history.push(`/requests`)}>
              <div className="row m-0 justify-content-center align-items-center">
                <div className="col-3">
                  <Icon style={{ color: PrimaryTheme.warn }} fontSize='large'>fiber_new</Icon>
                </div>
                <div className="col">
                  <h6 className='' style={{ color: PrimaryTheme.white, fontFamily: PrimaryTheme.fonts?.mediumFont }}>New</h6>
                  <h4 className='mb-0' style={{ color: PrimaryTheme.white }}>{dashboard.newRequest ? dashboard.newRequest : 0}</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div style={{ backgroundColor: PrimaryTheme.purple }} className={classes.card + " p-3 border-radius box-shadow text-center pointer"} onClick={() => history.push(`/declined-requests`)}>
              {/* row */}
              <div className="row m-0 justify-content-center align-items-center">
                <div className="col-3">
                  <Icon style={{ color: PrimaryTheme.white }} fontSize='large'>thumb_down_alt</Icon>
                </div>
                <div className="col" style={{ color: PrimaryTheme.white }}>
                  <h6 className='' style={{ color: PrimaryTheme.light, fontFamily: PrimaryTheme.fonts?.mediumFont }}>Declined</h6>
                  <h4 className='mb-0'>{dashboard.declinedRequest ? dashboard.declinedRequest : 0}</h4>
                </div>
              </div>
            </div>

          </div>

          <div className="col-md-3 mb-3">
            <div style={{ backgroundColor: PrimaryTheme.black }} className={classes.card + " p-3 box-shadow text-center  border-radius-bottom-left pointer"} onClick={() => history.push(`/active-jobs`)}>

              {/* row */}
              <div className="row m-0 justify-content-center align-items-center">
                <div className="col-3">
                  <Icon style={{ color: PrimaryTheme.white }} fontSize='large'>cached</Icon>
                </div>
                <div className="col">
                  <h6 className='' style={{ color: PrimaryTheme.light, fontFamily: PrimaryTheme.fonts?.mediumFont }}>Ongoing</h6>
                  <h4 className='mb-0'>{dashboard.ongoing ? dashboard.ongoing : 0}</h4>
                </div>
              </div>
            </div>

          </div>

          <div className="col-md-3 mb-3">
            <div style={{ backgroundColor: PrimaryTheme.success }} className={classes.card + " p-3 box-shadow text-center  border-radius-bottom-left pointer"} onClick={() => history.push(`/completed-jobs`)}>

              {/* row */}
              <div className="row m-0 justify-content-center align-items-center">
                <div className="col-3">
                  <Icon style={{ color: PrimaryTheme.white }} fontSize='large'>done_all</Icon>
                </div>
                <div className="col">
                  <h6 className='' style={{ color: PrimaryTheme.light, fontFamily: PrimaryTheme.fonts?.mediumFont }}>Completed</h6>
                  <h4 className='mb-0'>{dashboard.completed ? dashboard.completed : 0}</h4>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* job list */}
      <div className="col-md-10 ml-auto mr-auto p-0 mb-3">

        <div className="col-md-12">
          <h5 style={{ color: PrimaryTheme.appBar, 
            fontFamily: PrimaryTheme.fonts?.mediumFont }}>Latest Jobs</h5>
            <div className="dropdown-divider"></div>
        </div>

        <div className="row m-0 justify-content-center align-items-center">
          {jobList ? (
            <React.Fragment>

              {jobList.length !== 0 && jobList?.map((item: JobProps, index: number) =>

                <FolderList
                  key={index}
                  title={item.title}
                  status={item.status}
                  color={item.status === "ASSIGNED" ? "success" : "warning"}
                  createdOn={getDate(item.createdOn)}
                  onClick={() => handleClick(item._id)} />

              )}

              {jobList.length === 0 &&
                <React.Fragment>
                  <img src="/empty.svg" alt="No jobs" className='col-md-5 col-10' />
                  <p className='text-center mt-3 text-light w-100'>No jobs for you category</p>
                </React.Fragment>

              }


              <div className='col-md-12 p-0 mt-3'>
                {jobs.total > pageSize && <PaginationControlled onPageSizeChange={handlePageSizeChange} onChange={handleChange} page={page} total={jobs.total && jobs.total} pageSize={pageSize} />}
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

    </div >
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      backgroundImage: 'url(/bg.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'right center',
      color: 'white',
    }
  }),
);

