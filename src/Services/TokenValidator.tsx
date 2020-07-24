import { decode } from 'jsonwebtoken';
import { Tokens } from '../interfaces/interface';
import { Dispatch } from 'redux';
import API from '../APIs/Apis';


export function TokenValidator() {
  let refresh_token = API.identity + 'refresh';

  let store = JSON.parse(localStorage.getItem('persist:root') || '{}');
  const tokens: Tokens = JSON.parse(store.tokens)
  const decoded: any = decode(tokens.auth_token);

  if (Date.now() >= decoded.exp * 1000) {

    const api = refreshToken(tokens);

    return (dispatch: Dispatch) => {
      dispatch({
        type: 'LOADING',
        payload: true,
      });

      api
        .then((res: any) => {
          if (res.token) {
            dispatch({
              type: 'AUTH_TOKEN',
              payload: { auth_token: res.token, refresh_token: res.refresh_token },
            });
          } else {
            sessionStorage.clear();
            localStorage.clear();
          }
        })
        .catch(() => {
          // send err to application
          sessionStorage.clear();
          localStorage.clear();
        }).finally(() => {
          dispatch({
            type: 'LOADING',
            payload: false,
          });

        });
    };
  }

  async function refreshToken(tokens: Tokens) {
    try {
      let response = await fetch(refresh_token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.refresh_token}`
        },
        body: JSON.stringify({ auth_token: tokens.auth_token }),
      });

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

}
