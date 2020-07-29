import ArtisanService from '../../Services/ArtisanService';
import { Pagination, Artisans, ResponseDetails } from '../../interfaces/interface';
import { Dispatch } from 'redux';


export const createArtisan = (state: Artisans) => {
  const api = new ArtisanService().createArtisan(state);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        const result = res;
        if (result.successful) {
          dispatch({
            type: 'ALERT',
            payload: {
              message: 'Artisan added successfully',
              successful: true,
            },
          });
        } else {
          dispatch({
            type: 'ALERT',
            payload: res,
          });
        }
      })
      .catch(() => {
        // send err to application
        dispatch({
          type: 'ALERT',
          payload: {
            message: 'Network request failed',
            successful: false,
          },
        });
      }).finally(() => {
        dispatch({
          type: 'LOADING',
          payload: false,
        });

      });
  };
};

export const getArtisans = (state: Pagination) => {
  const api = new ArtisanService().getArtisans(state);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'GET_ARTISANS',
            payload: res,
          });
        } else {
          dispatch({
            type: 'ALERT',
            payload: res,
          });
        }
      })
      .catch(() => {
        // send err to application
        dispatch({
          type: 'ALERT',
          payload: {
            message: 'Network request failed',
            successful: false,
          },
        });
      }).finally(() => {
        dispatch({
          type: 'LOADING',
          payload: false,
        });

      });
  };
};

export const getArtisanDetails = (id: string) => {
  const api = new ArtisanService().getArtisanDetails(id);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'GET_ARTISAN',
            payload: res,
          });
        } else {
          dispatch({
            type: 'ALERT',
            payload: res,
          });
        }
      })
      .catch(() => {
        // send err to application
        dispatch({
          type: 'ALERT',
          payload: {
            message: 'Network request failed',
            successful: false,
          },
        });
      }).finally(() => {
        dispatch({
          type: 'LOADING',
          payload: false,
        });

      });
  };
};