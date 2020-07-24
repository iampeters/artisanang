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

export default function Dashboard() {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const alert = useSelector((state: Reducers) => state.alert);
  const artisans = useSelector((state: Reducers) => state.artisan);

  const [page, setPage] = React.useState(1)
  const pageSize = React.useState(50)[0]

  let filter = {};
  let paginationConfig = {
    page,
    pageSize,
    whereCondition: JSON.stringify(filter)
  }

  const handleClick = () => {
    history.push('/artisans/add')
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
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
  }, [dispatch, enqueueSnackbar, alert]);

  return (
    <div className='animated fadeIn'>
      <div className="col-md-7 ml-auto mr-auto p-0 mb-5 searchBar">
        <SearchBar />
      </div>
      <div className="col-md-9 col-lg-7 ml-auto mr-auto p-0 mb-5">
        {artisans.items && artisans.items.map((item: Artisans, key) => {
          return (
            <ArtisanList
              firstname={item.firstname}
              lastname={item.lastname}
              imageUrl={item.imageUrl}
              rating={item.rating}
              specialization={item.specialization}
              state={item.state}
              country={item.country}
            />
          )
        })}
      </div>

      <div style={{ ...styles.fab, position: 'fixed' }}>
        <div className="row m-0 justify-content-between align-items-center">
          <PaginationControlled onChange={handleChange} page={page} total={artisans.total && artisans.total} />
          <FloatingActionButtons onClick={handleClick} />
        </div>
      </div>
    </div>
  )
}

const styles = {
  fab: {
    bottom: 0,
    right: 0,
    left: '25%',
    width: "auto",
  }
}