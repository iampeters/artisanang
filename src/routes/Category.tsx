import React from 'react'
import PrimaryTheme from '../themes/Primary'
import { useHistory } from 'react-router-dom'
import { Icon } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Reducers, Category } from '../interfaces/interface';
import { getCategory } from '../redux/Actions/categoryActions';
import { useSnackbar } from 'notistack';
import PaginationControlled from '../components/Pagination';
import Placeholder from '../components/Skeleton';
import { ListItem } from '@material-ui/core';
import SearchBar from '../components/SearchBar';


export default function CategoryComponent() {
  const category = useSelector((state: Reducers) => state.category);
  const alert = useSelector((state: Reducers) => state.alert);

  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(25)
  const [search, setSearch] = React.useState('');

  let categoryList: any = category.items && category.items;


  let filter: any = {};
  let paginationConfig = {
    page: page + 1,
    pageSize,
    whereCondition: JSON.stringify(filter)
  }

  const handleClick = (name: string, id: string) => {
    history.push(`/category/${name}/${id}`)
  }

  const handleRefresh = () => {
    dispatch({
      type: 'LOADING',
      payload: true
    })
    dispatch(getCategory(paginationConfig));
  }

  const handleSearch = (event: any) => {
    let text = event.target.value;
    setSearch(text)
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePageSizeChange = (event: React.MouseEvent<HTMLButtonElement> | null, value: any) => {
    setPageSize(value.props.value);

    paginationConfig.pageSize = value.props.value;
    dispatch(getCategory(paginationConfig))
  };

  React.useEffect(() => {
    if (search.length >= 2) {
      filter.name = search.trim();
      paginationConfig.whereCondition = JSON.stringify(filter)

      dispatch(getCategory(paginationConfig));
    } else {

      if (search.length === 0) {
        delete filter.name;
        dispatch(getCategory(paginationConfig));
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
            <h4 className='mb-0' style={{ color: PrimaryTheme.appBar, fontFamily: PrimaryTheme.fonts?.mediumFont }}>Category</h4>
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

      <div className="col-md-12 p-4 mb-5 searchBar border-radius-10" style={{
        backgroundColor: PrimaryTheme.appBar,
        backgroundImage: 'url(/bg.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
        color: 'white',

      }}>
        <SearchBar onClick={handleSearch} onChange={handleSearch} value={search} placeholder='Search for Category' />
        {/* {categoryList && categoryList.length !== 0 ? (
        ) : (
            <React.Fragment>
              <Placeholder variant="text" width={'100%'} height={90} animation='pulse' className="display-inline" />
            </React.Fragment>
          )} */}
      </div>

      <div className="col-md-12 ml-auto mr-auto p-0 mb-3">
        <div className="row w-100 justify-content-center align-items-center">
          {categoryList ? (
            <React.Fragment>

              {categoryList.length !== 0 && categoryList?.map((item: Category, index: number) => {
                return (
                  <div className=" col-md-3 col-6 col-sm-3 mb-3 pointer" key={index} onClick={() => handleClick(item.name, item._id)}>
                    <ListItem button className='p-0 border-radius-10'>
                      <div className="box w-100 p-3 bg-white box-shadow border-radius-10 text-center">
                        <img src={item.imageUrl} alt={item.name} width='60' className='mb-3' />
                        <h6 style={{
                          fontFamily: PrimaryTheme.fonts?.RubikRegular,
                          color: PrimaryTheme.appBar
                        }} className='mb-0 text-center'>{item.name}</h6>
                      </div>
                    </ListItem>
                  </div>
                )
              })}

              {categoryList.length === 0 &&
                <React.Fragment>
                  <img src="/empty.svg" alt="No jobs" className='col-md-5 col-10' />
                  <p className='text-center mt-3 text-light w-100'>No category.</p>
                </React.Fragment>
              }


              <div className='col-md-12 p-0 mt-3'>
                {category.total > pageSize && <PaginationControlled onPageSizeChange={handlePageSizeChange} onChange={handleChange} page={page} total={category.total && category.total} pageSize={pageSize} />}
              </div>
            </React.Fragment>
          ) : (
              <React.Fragment>
                <div className="col-md-2 col-6 text-center">
                  <Placeholder variant="text" width={'100%'} height={120} animation='wave' className="display-inline" />
                </div>
                <div className="col-md-2 col-6 text-center">
                  <Placeholder variant="text" width={'100%'} height={120} animation='wave' className="display-inline" />
                </div>
                <div className="col-md-2 col-6 text-center">
                  <Placeholder variant="text" width={'100%'} height={120} animation='wave' className="display-inline" />
                </div>
                <div className="col-md-2 col-6 text-center">
                  <Placeholder variant="text" width={'100%'} height={120} animation='wave' className="display-inline" />
                </div>
                <div className="col-md-2 col-6 text-center">
                  <Placeholder variant="text" width={'100%'} height={120} animation='wave' className="display-inline" />
                </div>
                <div className="col-md-2 col-6 text-center">
                  <Placeholder variant="text" width={'100%'} height={120} animation='wave' className="display-inline" />
                </div>
              </React.Fragment>
            )}
        </div>
      </div>
    </div>
  )
}
