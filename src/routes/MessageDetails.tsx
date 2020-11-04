import { Avatar, Icon } from '@material-ui/core'
import { useSnackbar } from 'notistack';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PaginationControlled from '../components/Pagination';
import Placeholder from '../components/Skeleton';
import Functions from '../helpers/Functions';
import { Chats, Reducers } from '../interfaces/interface';
import { getChats, sendMessage } from '../redux/Actions/chatActions';
import { getChatUserDetails, getUserDetails } from '../redux/Actions/userActions';
import PrimaryTheme from '../themes/Primary'

export default function MessageDetails() {

  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const params: any = useParams();
  const alert = useSelector((state: Reducers) => state.alert);
  const user = useSelector((state: Reducers) => state.user);
  const chatUser = useSelector((state: Reducers) => state.chatUser);

  const chats = useSelector((state: Reducers) => state.chats);

  let chatList: any = chats.items && chats.items;

  const [page, setPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(50)
  const [message, setMessage] = React.useState('');
  const [isMessageValid, setMessageValid]: any = React.useState(null);
  // const [state, setState]: any = React.useState('');

  let filter: any = {};
  let paginationConfig = {
    page: page + 1,
    pageSize,
    whereCondition: JSON.stringify(filter)
  }

  // const handleClick = (receiver: string) => {
  //   history.push(`/messages/${userId}`)
  // }

  const handleRefresh = () => {
    dispatch({
      type: 'LOADING',
      payload: true
    });

    dispatch(getChats(paginationConfig, params.id));
  }


  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlePageSizeChange = (event: React.MouseEvent<HTMLButtonElement> | null, value: any) => {
    setPageSize(value.props.value);

    paginationConfig.pageSize = value.props.value;
    dispatch(getChats(paginationConfig, params.id));
  };

  React.useEffect(() => {
    dispatch(getChats(paginationConfig, params.id));
    dispatch(getChatUserDetails(params.id));


    return () => {
      dispatch({
        type: 'GET_CHATS',
        payload: {}
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page,]);

  const handleSubmit = () => {
    let data = {
      receiver: params.id,
      message
    }

    dispatch({
      type: 'LOADING',
      payload: true
    })

    dispatch(sendMessage(data));
  };

  const handleInput = (e: string) => {
    setMessage(e);

    if (e.length > 1) {
      setMessageValid(true);
    } else {
      setMessageValid(false);
    }

  };

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

        enqueueSnackbar(alert.message, { variant: "success" });

        if (alert.message === 'Message sent') {
          dispatch(getChats(paginationConfig, params.id));
          setMessage('');
        }

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
      <div className='col-md-12'>
        <div className="row justify-content-start align-items-center">
          <div className="col-8">
            <div className="row m-0 justify-content-start align-items-center">
              <Avatar src={chatUser && chatUser.imageUrl} variant="circle" style={{
                width: 50,
                height: 50,
                marginRight: 5
              }} alt={chatUser && chatUser.firstname} />

              <h5 className='mb-0' style={{ color: PrimaryTheme.appBar, fontFamily: PrimaryTheme.fonts?.mediumFont }}>{chatUser && chatUser.firstname} {chatUser && chatUser.lastname}</h5>
            </div>
          </div>

          <div className="col-4 text-right pl-0">
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

      <div className="col-md-12 ml-auto mr-auto mt-3 p-0 mb-5 position-relative mobile-chat" style={{
        height: 'calc(100vh - 246px)',
      }}>
        <div className="row w-100 m-0" style={{
          // display: 'table',
        }}>
          <div className="region w-100 bg-white border" style={{
            height: 'calc(100vh - 246px)',
            // position: 'relative',
            // display: 'table-cell',

            verticalAlign: 'bottom',
            padding: 10,
            overflow: 'auto'

          }}>
            {chatList ? (
              <React.Fragment>

                {chatList.length !== 0 && chatList?.map((item: Chats, index: number) => {
                  return (
                    <div className="col-md-12 mb-3" key={index} style={{
                      textAlign: item.sender._id === user._id ? "right" : "left",
                    }}>
                      {item.sender._id === user._id ? (
                        <div className=" p-2 pl-3 pr-3 d-inline-block text-left" style={{
                          background: PrimaryTheme.warn,
                          borderRadius: '10px 10px 0px 10px',
                          width: 'auto',
                          maxWidth: '70%',
                        }}>
                          <p className="mb-0">{item.message}</p>
                          <p style={{
                            color: PrimaryTheme.light,
                            fontSize: 12,
                            textAlign: 'right',
                          }}>{Functions.getDateTime(item.createdOn)}</p>
                        </div>
                      ) : (
                          <div className=" p-2 pl-3 pr-3 d-inline-block" style={{
                            background: PrimaryTheme.info,
                            borderRadius: '0 10px 10px 10px',
                            width: 'auto',
                            maxWidth: '70%',
                            wordWrap: "normal",
                            // display: 'block'

                          }}>
                            <p className="mb-0">{item.message}</p>
                            <p style={{
                              color: PrimaryTheme.light,
                              fontSize: 12,
                              textAlign: 'right',
                            }}>{Functions.getDateTime(item.createdOn)}</p>
                          </div>
                        )}
                    </div>
                  )
                })}

                {chatList.length === 0 &&
                  <React.Fragment>
                    <div className="row m-0 justify-content-center align-items-center mt-5">
                      <img src="/opened.svg" alt="No Messages" className='col-md-5 col-10 mr-auto ml-auto' />
                      <h5 className='text-center mt-3 text-light w-100'>No messages</h5>
                    </div>
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


        {chatList && chatList.length !== 0 &&
          <React.Fragment>
            <div className="col-md-12 p-0 bg-light" style={{
              // position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 'auto'
            }}>
              <div className="row m-0">
                <div className="col-md-10 col-9 p-0">
                  <textarea
                    name="message"
                    className="border"
                    id="message"
                    placeholder="Type message here"
                    value={message}
                    onChange={e => handleInput(e.target.value)}
                    style={{
                      resize: 'none',
                      width: '100%',
                      height: '100%',
                      padding: 10
                    }}></textarea>
                </div>
                <div className="col-md-2 col-3 p-0">
                  <button
                    className="btn btn-success pl-3 pr-3"
                    onClick={handleSubmit}
                    disabled={!isMessageValid && isMessageValid !== null}
                    style={{
                      width: '100%',
                      height: 80,
                      borderRadius: 0
                    }}>Send</button>
                </div>
              </div>
            </div>
          </React.Fragment>
        }

      </div>
    </div>
  )
}
