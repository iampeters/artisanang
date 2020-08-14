import React from 'react'
import ArtisanList from '../components/ArtisanList';
import SearchBar from '../components/SearchBar';
import FloatingActionButtons from '../components/Fab';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Reducers, Artisans } from '../interfaces/interface';
import { useSnackbar } from 'notistack';
import { getArtisans } from '../redux/Actions/artisanActions';
import PaginationControlled from '../components/Pagination';
import Placeholder from '../components/Skeleton';
import PrimaryTheme from '../themes/Primary';
import { Icon } from '@material-ui/core';

export default function MyArtisans() {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const alert = useSelector((state: Reducers) => state.alert);
  const artisans = useSelector((state: Reducers) => state.artisan);
  const user = useSelector((state: Reducers) => state.user);

  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(25)
  const [search, setSearch] = React.useState('');

  let filter: any = { userId: user._id };
  let paginationConfig = {
    page,
    pageSize,
    whereCondition: JSON.stringify(filter)
  }

  const handleClick = () => {
    history.push('/artisans/add')
  }

  const navigate = (route: string) => {
    history.push(route)
  }

  const handleSearch = () => {
    if (search.length !== 0) {
      filter.name = search.trim();
      paginationConfig.whereCondition = JSON.stringify(filter)

      dispatch(getArtisans(paginationConfig));
    }
  }

  const handleRefresh = () => {
    dispatch({
      type: 'LOADING',
      payload: true
    })
    dispatch(getArtisans(paginationConfig));
  }

  React.useEffect(() => {
    if (search.length >= 5) {
      filter.name = search.trim();
      paginationConfig.whereCondition = JSON.stringify(filter)

      dispatch(getArtisans(paginationConfig));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, search]);


  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePageSizeChange = (event: React.MouseEvent<HTMLButtonElement> | null, value: number) => {
    setPageSize(value);
  };

  React.useEffect(() => {
    dispatch(getArtisans(paginationConfig))

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
        <div className="row m-0">
          <div className="col-md-8">
            <h4 className='mb-0' style={{ color: PrimaryTheme.appBar, fontFamily: PrimaryTheme.fonts?.RubikMedium }}>My Artisans</h4>
            <p className="small text-light">Here is a list of all your artisans so far.</p>
          </div>

          <div className="col-md-4 text-right">
            <button className='btn btn-color btn-sm' type="reset" onClick={handleRefresh}>
              <div className="row m-0 justify-content-between align-items-center">
                <Icon style={{
                  fontSize: 18
                }}>refresh</Icon>
                <span>Reload</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-9 col-lg-8 ml-auto mr-auto p-0 mb-3 searchBar">
        {artisans.items ? (
          <SearchBar onClick={handleSearch} onChange={(e: any) => setSearch(e.target.value)} value={search} placeholder='Search Artisans' />
        ) : (
            <React.Fragment>
              <Placeholder variant="text" width={'100%'} height={90} animation='pulse' className="display-inline" />
            </React.Fragment>
          )}
      </div>

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
                <p className='text-center mt-3 text-light'>You have not added any artisan</p>
                <button className='btn btn-color' onClick={handleClick}>+ Add Artisan</button>
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
            customColor={PrimaryTheme.primary}
            IconColor={PrimaryTheme.white} />
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