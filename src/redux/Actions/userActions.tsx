import AuthService from '../../Services/AuthService';
import { ResponseDetails } from '../../interfaces/interface';

export const userAction = (state: any) => {
  return (dispatch: any) => {
    dispatch({ type: 'TYPING', payload: state });
  };
};

export const logout = () => {
  return (dispatch: any) => {
    dispatch({
      type: 'IS_LOGGED_IN',
      payload: { isAuthenticated: false },
    });
  }
};

export const login = (state: any) => {
  const api = new AuthService().login(state);

  return (dispatch: any) => {
    api
      .then((res: any) => {
        const result = res;
        if (result.token) {
          // Todo - check if the user is an artisan or normal user. Also check if this artisan has complete his profile

          if (result.user.userType === 2 && !result.user.hasOnboarded) {
            // set authentication to true
            dispatch({
              type: 'AUTH_TOKEN',
              payload: { auth_token: result.token, refresh_token: result.refresh_token },
            });
            // set logged in user state
            dispatch({
              type: 'USER',
              payload: result.user,
            });
            // send response to login screen
            dispatch({
              type: 'ALERT',
              payload: {
                successful: true,
                message: 'unverified',
              },
            });
          } else {
            // set authentication to true
            sessionStorage.setItem('auth', 'true');
            dispatch({
              type: 'AUTH_TOKEN',
              payload: { auth_token: result.token, refresh_token: result.refresh_token },
            });
            // set logged in user state
            dispatch({
              type: 'USER',
              payload: result.user,
            });
            // send response to login screen
            dispatch({
              type: 'ALERT',
              payload: {
                successful: true,
                message: 'Logged in successfully.',
              },
            });
          }

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
      });
  };
};

export const socialAuth = (state: any) => {
  const api = new AuthService().socialAuth(state);

  return (dispatch: any) => {
    api
      .then((res: any) => {
        const result = res;
        if (result.token) {
          sessionStorage.setItem('auth', 'true');

          // set authentication to true
          dispatch({
            type: 'AUTH_TOKEN',
            payload: { auth_token: result.token, refresh_token: result.refresh_token },
          });
          // set logged in user state
          dispatch({
            type: 'USER',
            payload: result.user,
          });
          // send response to login screen
          dispatch({
            type: 'ALERT',
            payload: {
              successful: true,
              message: 'Logged in successfully.',
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


export const signUp = (state: any) => {
  const api = new AuthService().signUp(state);


  return (dispatch: any) => {
    api
      .then((res: any) => {
        const result = res;
        if (result.token) {
          sessionStorage.setItem('auth', 'true');

          // set authentication to true
          dispatch({
            type: 'AUTH_TOKEN',
            payload: { auth_token: result.token, refresh_token: result.refresh_token },
          });
          // set logged in user state
          dispatch({
            type: 'USER',
            payload: result.user,
          });
          // send response to login screen
          dispatch({
            type: 'ALERT',
            payload: {
              successful: true,
              message: 'Logged in successfully.',
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
      });
  };
};

export const getUserDetails = (id: any) => {
  const authService = new AuthService();

  const api = authService.getUser(id);

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {

          // set logged in user state
          dispatch({
            type: 'USER',
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

export const getChatUserDetails = (id: any) => {
  const authService = new AuthService();

  const api = authService.getUser(id);

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {

          // set logged in user state
          dispatch({
            type: 'CHAT_USER',
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


export const forgotPassword = (data: any) => {
  const api = new AuthService().forgotPassword(data);

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'ALERT',
            payload: {
              message: 'If the provided email is correct, we have sent you a password reset email',
              successful: true,
            }
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

export const changePassword = (data: any) => {
  const api = new AuthService().changePassword(data);

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'ALERT',
            payload: {
              message: 'Password changed successfully',
              successful: true,
            }
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


export const resetPassword = (data: any) => {
  const api = new AuthService().resetPassword(data);

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {

          dispatch({
            type: 'ALERT',
            payload: {
              message: 'Password reset successfully. Login to continue',
              successful: true,
            }
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

export const updateAccount = (data: any) => {
  const api = new AuthService().updateUser(data);

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'ALERT',
            payload: {
              message: 'Account updated successfully',
              successful: true,
            }
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

export const verifyEmail = (data: any) => {
  const api = new AuthService().verifyEmail(data);

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'ALERT',
            payload: {
              message: res.message,
              successful: true,
            }
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

export const confirmEmail = (data: any) => {
  const api = new AuthService().confirmEmail(data);

  return (dispatch: any) => {
    api
      .then((res: any) => {
        const result = res;
        if (result.token) {
          sessionStorage.setItem('auth', 'true');
          sessionStorage.setItem('userType', JSON.stringify(result.userType));

          // set authentication to true
          dispatch({
            type: 'AUTH_TOKEN',
            payload: { auth_token: result.token, refresh_token: result.refresh_token },
          });
          // set logged in user state
          dispatch({
            type: 'USER',
            payload: result.user,
          });
          // send response to login screen
          dispatch({
            type: 'ALERT',
            payload: {
              successful: true,
              message: 'Logged in successfully.',
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