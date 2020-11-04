import React from 'react'
import ArtisanList from '../components/ArtisanList';
import FloatingActionButtons from '../components/Fab';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Reducers, Artisans } from '../interfaces/interface';
import { useSnackbar } from 'notistack';
import { getArtisans } from '../redux/Actions/artisanActions';
import PaginationControlled from '../components/Pagination';
import Placeholder from '../components/Skeleton';
import PrimaryTheme from '../themes/Primary';
import { Icon } from '@material-ui/core';
import { States } from '../helpers/States';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField/TextField';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';


export default function Dashboard() {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const params: any = useParams();

  const alert = useSelector((state: Reducers) => state.alert);
  const artisans = useSelector((state: Reducers) => state.artisan);

  const [page, setPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(25)
  const [canFilter, showFilter] = React.useState(false);
  const [state, setState]: any = React.useState('');

  let filter: Artisans = { categoryId: params.id };
  let paginationConfig = {
    page: page + 1,
    pageSize,
    whereCondition: JSON.stringify(filter)
  }

  const handleClick = () => {
    history.push('/artisans/add')
  }
  const handleRefresh = () => {
    dispatch({
      type: 'LOADING',
      payload: true
    })
    dispatch(getArtisans(paginationConfig));
  }

  const navigate = (route: string) => {
    history.push(route)
  }

  React.useEffect(() => {
    if (state !== '') {
      filter.state = state;
      paginationConfig.whereCondition = JSON.stringify(filter)
      dispatch(getArtisans(paginationConfig));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, state]);


  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePageSizeChange = (event: React.MouseEvent<HTMLButtonElement> | null, value: number) => {
    setPageSize(value);
  };

  React.useEffect(() => {
    dispatch(getArtisans(paginationConfig));

    return () => {
      dispatch({
        type: 'GET_ARTISANS',
        payload: {}
      })
    }

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
      <div className='col-md-12 p-0'>
        <div className="row">
          <div className="col-md-8">
            <h4 className='mb-0' style={{ color: PrimaryTheme.appBar, fontFamily: PrimaryTheme.fonts?.mediumFont }}>{params.category}</h4>
            <p className="small text-light">Here is a list of {params.category}s.</p>
          </div>

          <div className="col-md-4 text-right">
            <Tooltip title="Go back">
              <button className='btn btn-dark btn-sm mr-1' type="button" onClick={() => showFilter(!canFilter)}>
                <div className="row m-0 justify-content-between align-items-center">
                  <Icon style={{
                    fontSize: 20
                  }}>filter_list</Icon>
                </div>
              </button>
            </Tooltip>

            <Tooltip title="Reload">
              <button className='btn btn-dark btn-sm' type="reset" onClick={handleRefresh}>
                <div className="row m-0 justify-content-between align-items-center">
                  <Icon style={{
                    fontSize: 20
                  }}>refresh</Icon>
                </div>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {canFilter && <div className="col-md-9 col-lg-8 ml-auto mr-auto p-0 mb-5 mt-3">
        <div className="p-2 bg-white animated fadeIn border-radius">
          <h5 style={{
            color: PrimaryTheme.black,
            fontFamily: PrimaryTheme.fonts?.primaryFont
          }}>Filter</h5>
          <div className="form-group col-sm-6">
            <Autocomplete
              id="state"
              options={States}
              getOptionLabel={(option) => option.name}
              fullWidth
              onChange={(e, option) => setState(option?.name)}
              renderInput={(params) => <TextField {...params}
                label="State"
                variant="outlined"
                required
                name='state'
                value={state}
                autoComplete='state'
              // onChange={e => setState(e.target.value)}
              // disabled={submitted}
              />}
            />
          </div>
        </div>
      </div>}

      <div className="col-md-9 col-lg-8 ml-auto mr-auto p-0 mb-5">
        {artisans.items ? (
          <React.Fragment>
            {artisans.items?.length !== 0 && artisans.items.map((item: Artisans, key) =>

              <ArtisanList
                firstname={item.firstname}
                lastname={item.lastname}
                imageUrl={item.imageUrl}
                rating={item.rating}
                reviews={item.reviews}
                specialization={item.specialization}
                state={item.state}
                country={item.country}
                onClick={() => navigate(`/artisans/details/${item._id}`)}
                key={key}
              />

            )}

            {artisans.items?.length === 0 &&

              <div className='col-md-12 text-center'>
                <p className='text-center mt-3 text-light'>No artisans yet. Be the first to onboard an artisan</p>
                <button className='btn btn-dark' onClick={handleClick}>Get started</button>
              </div>
            }

            {/* pagination component */}
            {artisans.total > pageSize && <PaginationControlled onChange={handleChange} onPageSizeChange={handlePageSizeChange} page={page} total={artisans.total && artisans.total} pageSize={pageSize} />}
          </React.Fragment>
        ) : (
            <React.Fragment>
              <div className="col-md-12 p-0 text-center">
                <Placeholder variant="text" width={'100%'} height={90} animation='wave' className="display-inline" />
                <Placeholder variant="text" width={'100%'} height={90} animation='pulse' className="display-inline" />
                <Placeholder variant="text" width={'100%'} height={90} animation='wave' className="display-inline" />
              </div>
            </React.Fragment>
          )}
      </div>

      <div style={{ ...styles.fab, position: 'fixed' }}>
        <div className="row m-0 justify-content-end align-items-center">
          <FloatingActionButtons
            marginRight={5}
            IconName="add"
            IconText="Add Artisan"
            variant="extended"
            onClick={handleClick}
            customColor={PrimaryTheme.warn}
            IconColor={PrimaryTheme.black} />
        </div>
      </div>
    </div>
  )
}

const styles = {
  fab: {
    bottom: 0,
    right: 20,
    width: "auto",
  }
}