import React from 'react'
import PrimaryTheme from '../themes/Primary'
import Placeholder from '../components/Skeleton';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { Reducers, Reviews } from '../interfaces/interface';
import { getReviews } from '../redux/Actions/reviewAction';
import ReviewItemsList from '../components/ReviewItems';
import PaginationControlled from '../components/Pagination';

export default function MyReviews() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

  const reviews = useSelector((state: Reducers) => state.reviews);
  const alert = useSelector((state: Reducers) => state.alert);
  const user = useSelector((state: Reducers) => state.user);

  const [page, setPage] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(25)

  let reviewList: any = reviews.items && reviews.items;

  let filter: any = { userId: user._id };
  let paginationConfig = {
    page: page + 1,
    pageSize,
    whereCondition: JSON.stringify(filter)
  }

  const navigate = (route: string) => {
    history.push(route)
  }

  const handleChange = (event: React.MouseEvent<HTMLButtonElement> | null, value: number) => {
    setPage(value);
  };

  const handlePageSizeChange = (event: React.MouseEvent<HTMLButtonElement> | null, value: number) => {
    setPageSize(value);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getReviews(paginationConfig))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page])

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
        <h4 className='mb-0' style={{ color: PrimaryTheme.appBar }}>My Reviews</h4>
        <p className="small text-light">Here is a list of all your reviews so far.</p>
      </div>

      <div className="col-md-9 col-lg-7 ml-auto mr-auto p-0 mb-5">
        {reviewList ? (
          <div className="p-1 bg-white border-radius box-shadow">
            {reviewList?.map((review: Reviews, index: number) => {
              return (
                <ReviewItemsList title={review.title} description={review.description} userId={review.userId} key={index} rating={review.rating} onClick={() => navigate(`/reviews/details/${review._id}`)} />
              )
            })}
            {/* pagination component */}
            {reviews.total > pageSize && <PaginationControlled onPageSizeChange={handlePageSizeChange} onChange={handleChange} page={page} total={reviews.total && reviews.total} pageSize={pageSize} />}
          </div>
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
    </div>
  )
}