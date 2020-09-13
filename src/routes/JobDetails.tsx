import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PrimaryTheme from '../themes/Primary';
import { Icon } from '@material-ui/core';
import { Reducers, JobProps, Artisans } from '../interfaces/interface';
import { useSnackbar } from 'notistack';
import { useHistory, useParams } from 'react-router-dom';
import { getJobDetails } from '../redux/Actions/jobActions';
import ImgMediaCard from '../components/Card';
import { getDate } from '../helpers/Functions';
import Placeholder from '../components/Skeleton';
import AlertDialog from '../components/Dialog';
import AssignJob from '../components/AssignJob';
import { getArtisans } from '../redux/Actions/artisanActions';
import { assignRequest } from '../redux/Actions/requestActions';

export default function JobDetails() {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();
  const params: any = useParams();

  const alert = useSelector((state: Reducers) => state.alert);
  const jobs: JobProps = useSelector((state: any) => state.jobs);
  const user = useSelector((state: Reducers) => state.user);
  const artisans = useSelector((state: Reducers) => state.artisan);

  let artisanList = artisans.items && artisans.items;


  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {

    if (jobs.status === "NEW") {
      setOpen(true);

      getArtisansByCategory();
    }
  }

  const handleRefresh = () => {
    dispatch({
      type: 'LOADING',
      payload: true
    });

    dispatch(getJobDetails(params.id));
  }

  const assignJob = (id: any) => {
    let data = {
      jobId: params.id,
      userId: user._id,
      artisanId: id
    };

    dispatch({
      type: 'LOADING',
      payload: true
    })

    dispatch(assignRequest(data))
  }

  const getArtisansByCategory = () => {
    let id = jobs.categoryId._id
    let filter: any = { categoryId: id };
    let paginationConfig = {
      page: 1,
      pageSize: 0,
      whereCondition: JSON.stringify(filter)
    }

    dispatch(getArtisans(paginationConfig));

  }

  React.useEffect(() => {
    dispatch(getJobDetails(params.id));

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

        setOpen(false);

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
            <h4 className='mb-0' style={{ color: PrimaryTheme.appBar, fontFamily: PrimaryTheme.fonts?.RubikMedium }}> Job Details</h4>
          </div>

          <div className="col-4 text-right">
            <button className='btn btn-color btn-sm mr-3' type="reset" onClick={() => history.goBack()} title="Go back">
              <div className="row m-0 justify-content-between align-items-center">
                <Icon style={{
                  fontSize: 20
                }}>arrow_back</Icon>
              </div>
            </button>

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

      <div className="col-md-9 col-lg-7 ml-auto mr-auto p-0 mb-5">
        {Object.entries(jobs).length !== 0 ?
          <ImgMediaCard
            title={jobs.title}
            description={jobs.description}
            status={jobs.status}
            date={getDate(jobs.createdOn)}
            category={jobs.categoryId && jobs.categoryId.name}
            color={jobs.status === "NEW" || jobs.status === "PENDING" ? "warning" : "success"}
            artisan={jobs.artisanId && jobs.artisanId?.name}
            artisanImage={jobs.artisanId && jobs.artisanId?.imageUrl}
            artisanId={jobs.artisanId && jobs.artisanId}
            onClick={handleOpen}
            actionButton="Assign"
            actionButtonColor={PrimaryTheme.white}
            actionButtonBgColor={PrimaryTheme.success}
            secondActionButton="Edit"
            secondActionButtonColor={PrimaryTheme.dark}
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

      <AlertDialog categoryName={jobs.categoryId && jobs.categoryId.name + "s"} open={open} onClose={handleClose} >
        <React.Fragment>
          {artisanList && artisanList?.length !== 0 && artisanList.map((item: Artisans, index) => {
            return (
              <AssignJob
                onView={() => history.push(`/artisans/details/${item._id}`)}
                key={index}
                title={item.name}
                color="success"
                rating={item.rating}
                image={item.imageUrl}
                status="Assign"
                onAssign={() => assignJob(item._id)} />
            )
          })}

          {artisanList?.length === 0 && (
            <React.Fragment>
              <div className="row justify-content-center align-items-center">
                <img src="/empty.svg" alt="No jobs" className='col-md-5 col-10' />
                <p className='text-center mt-3 text-light w-100'>No artisan in this category.</p>
                <div className="col-md-12 text-center mb-3">
                  <button className="btn" style={{
                    backgroundColor: PrimaryTheme.active,
                    color: PrimaryTheme.white
                  }} onClick={() => history.push('/artisans/add')}>Add Artisan</button>
                </div>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      </AlertDialog>
    </div>
  )
}
