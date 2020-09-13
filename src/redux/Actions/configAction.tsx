import ConfigService from "../../Services/ConfigService";
import { ResponseDetails } from "../../interfaces/interface";

export const fileUpload = (state: FormData) => {
  const api = new ConfigService().fileUpload(state);

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'FILE_UPLOAD',
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

export const getArtisanDashboard = () => {
  const api = new ConfigService().getArtisanDashboard();

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'DASHBOARD',
            payload: res.result,
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


export const getUserDashboard = () => {
  const api = new ConfigService().getUserDashboard();

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'DASHBOARD',
            payload: res.result,
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