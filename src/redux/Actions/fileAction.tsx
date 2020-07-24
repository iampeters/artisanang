import FileService from "../../Services/FileService";
import { ResponseDetails } from "../../interfaces/interface";

export const fileUpload = (state: FormData) => {
  const api = new FileService().fileUpload(state);

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