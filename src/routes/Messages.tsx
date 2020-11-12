import React from 'react';
import PrimaryTheme from '../themes/Primary';
import { useHistory } from 'react-router-dom';
import { Avatar, Icon, ListItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Chats, Reducers } from '../interfaces/interface';
import { useSnackbar } from 'notistack';
import { getActiveChats } from '../redux/Actions/chatActions';
import PaginationControlled from '../components/Pagination';
import Placeholder from '../components/Skeleton';
import Functions from '../helpers/Functions';

export default function Messages() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const alert = useSelector((state: Reducers) => state.alert);
  const user = useSelector((state: Reducers) => state.user);
  const chats = useSelector((state: Reducers) => state.activeChats);

  let chatList: any = chats.items && chats.items;


  const [page, setPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(50)
  // const [state, setState]: any = React.useState('');

  let filter: any = {};
  let paginationConfig = {
    page: page + 1,
    pageSize,
    whereCondition: JSON.stringify(filter)
  }

  const handleClick = (userId: any) => {
    history.push(`/messages/${userId}`);
  }

  const handleRefresh = () => {
    dispatch({
      type: 'LOADING',
      payload: true
    });

    dispatch(getActiveChats(paginationConfig));
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePageSizeChange = (event: React.MouseEvent<HTMLButtonElement> | null, value: any) => {
    setPageSize(value.props.value);

    paginationConfig.pageSize = value.props.value;
    dispatch(getActiveChats(paginationConfig))
  };

  React.useEffect(() => {
    dispatch(getActiveChats(paginationConfig));

    return () => {
      dispatch({
        type: 'GET_ACTIVE_CHATS',
        payload: {}
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page,]);


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
      <div className='col-md-12'>

        <div className="row">
          <div className="col-7">
            <h4 className='mb-0' style={{ color: PrimaryTheme.appBar, fontFamily: PrimaryTheme.fonts?.mediumFont }}> Messages</h4>
          </div>

          <div className="col-5 text-right">
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

      <div className="col-md-9 ml-auto mr-auto p-0 mb-5 mt-5">

        <div className="row w-100 justify-content-center align-items-center">
          {chatList ? (
            <React.Fragment>

              {chatList.length !== 0 && chatList?.map((item: Chats, index: number) => {
                return (
                  <div className=" col-md-10 mb-3 pointer"
                    key={index}
                    onClick={() => handleClick(item.userId._id === user._id ? item.sender._id : item.userId._id)}>
                    <ListItem button className='p-0 border-radius-10'>
                      <div className="w-100 p-3 bg-white box-shadow border-radius-10">
                        <div className="row m-0 align-items-center">
                          <div className="col">
                            <div className="row m-0 justify-content-start align-items-center">
                              <Avatar
                                src={item.userId._id === user._id ? item.sender.imageUrl : item.userId.imageUrl}
                                alt={item.userId._id === user._id ? item.sender.name : item.userId.name}
                                style={{
                                  width: 50,
                                  height: 50,
                                }} />

                              <div style={{ marginLeft: 10 }}>
                                <h5 style={{
                                  fontFamily: PrimaryTheme.fonts?.primaryFont,
                                  color: PrimaryTheme.appBar,
                                  margin: 0
                                }} className='mb-0 d-inline'>{item.userId._id === user._id ? item.sender.name : item.userId.name}</h5>
                                <h6 style={{
                                  fontFamily: PrimaryTheme.fonts?.primaryFont,
                                  color: PrimaryTheme.appBar,
                                  margin: 0
                                }} className='mb-0 text-right text-light'>{Functions.getDateTime(item.createdOn)}</h6>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <h6 style={{
                              fontFamily: PrimaryTheme.fonts?.primaryFont,
                              color: PrimaryTheme.appBar,
                              margin: 0
                            }} className='mb-0 text-center text-light'>{item.message.length > 50 ? item.message.slice(0, 50) + '...' : item.message}</h6>
                          </div>
                        </div>
                      </div>
                    </ListItem>
                  </div>
                )
              })}

              {chatList.length === 0 &&
                <React.Fragment>
                  <img src="/opened.svg" alt="No jobs" className='col-md-5 col-10' />
                  <h5 className='text-center mt-3 text-light w-100'>No messages</h5>
                </React.Fragment>
              }


              <div className='col-md-12 p-0 mt-3'>
                {chats.total > pageSize && <PaginationControlled onPageSizeChange={handlePageSizeChange} onChange={handleChange} page={page} total={chats.total && chats.total} pageSize={pageSize} />}
              </div>
            </React.Fragment>
          ) : (
              <React.Fragment>
                <div className="col-md-2 col-md-12 text-center">
                  <Placeholder variant="text" width={'100%'} height={120} animation='wave' className="display-inline" />
                </div>
                <div className="col-md-2 col-md-12 text-center">
                  <Placeholder variant="text" width={'100%'} height={120} animation='wave' className="display-inline" />
                </div>
                <div className="col-md-2 col-md-12 text-center">
                  <Placeholder variant="text" width={'100%'} height={120} animation='wave' className="display-inline" />
                </div>
              </React.Fragment>
            )}
        </div>

      </div>
    </div>
  )
}
