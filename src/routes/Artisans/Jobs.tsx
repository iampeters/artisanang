import React from 'react'
import PrimaryTheme from '../../themes/Primary'
import { useHistory } from 'react-router-dom'
import { Icon } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Reducers, JobProps } from '../../interfaces/interface';
import { useSnackbar } from 'notistack';
import SearchBar from '../../components/SearchBar';
import FloatingActionButtons from '../../components/Fab';
import FolderList from '../../components/JobList';
import { getJobs } from '../../redux/Actions/jobActions';
import PaginationControlled from '../../components/Pagination';
import Placeholder from '../../components/Skeleton';
import { getDate } from '../../helpers/Functions';

export default function Jobs() {
  const history = useHistory();

  const alert = useSelector((state: Reducers) => state.alert);
  const jobs = useSelector((state: Reducers) => state.jobs);
  const user = useSelector((state: Reducers) => state.user);


  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(25);
  const [search, setSearch] = React.useState('');

  let jobList: any = jobs.items && jobs.items;


  let filter: any = { artisanId: user._id };
  let paginationConfig = {
    page: page + 1,
    pageSize,
    whereCondition: JSON.stringify(filter)
  }

  const handleClick = (id: any) => {
    history.push(`/jobs/details/${id}`)
  }

  const navigate = () => {
    history.push(`/jobs/new`)
  }

  const handleSearch = (event: any) => {
    let text = event.target.value;
    setSearch(text)
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
    if (search.length >= 2) {
      filter.title = search.trim();
      paginationConfig.whereCondition = JSON.stringify(filter)

      dispatch(getJobs(paginationConfig));
    } else {

      if (search.length === 0) {
        delete filter.name;
        dispatch(getJobs(paginationConfig));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, search]);

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
            <h4 className='mb-0' style={{ color: PrimaryTheme.appBar, fontFamily: PrimaryTheme.fonts?.RubikMedium }}>Jobs</h4>
          </div>

          <div className="col-4 text-right">
            <button className='btn btn-color btn-sm' type="reset" onClick={handleRefresh} title="Reload">
              <div className="row m-0 justify-content-between align-items-center">
                <Icon style={{
                  fontSize: 20
                }}>refresh</Icon>
              </div>
            </button>
          </div>
        </div>
      </div>
{/* 
      <div className="col-md-12 ml-auto mr-auto p-4 mb-5 searchBar border-radius-10" style={{
        backgroundColor: PrimaryTheme.appBar,
        backgroundImage: 'url(/bg.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
        color: 'white',

      }}>
        <SearchBar onClick={handleSearch} onChange={handleSearch} value={search} placeholder='Search for Job title' />
      </div> */}

      {/* job list */}
      <div className="col-md-9 ml-auto mr-auto p-0 mb-3">
        <div className="row m-0 justify-content-center align-items-center">
          {jobList ? (
            <React.Fragment>

              {jobList.length !== 0 && jobList?.map((item: JobProps, index: number) =>

                <FolderList
                  key={index}
                  title={item.title}
                  status={item.status}
                  color={item.status === "ASSIGNED"? "success": "warning"}
                  createdOn={getDate(item.createdOn)}
                  onClick={() => handleClick(item._id)} />

              )}

              {jobList.length === 0 &&
                <React.Fragment>
                  <img src="/empty.svg" alt="No jobs" className='col-md-5 col-10' />
                  <p className='text-center mt-3 text-light w-100'>No jobs</p>
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
