import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import PrimaryTheme from '../themes/Primary';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog(props: DialogProps) {

  return (
    <div className="position-relative">
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        scroll="body"
        fullWidth
        onClose={props.onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="position-relative">
          <div className="p-4">
            <h5 style={{
              fontFamily: PrimaryTheme.fonts?.RubikRegular
            }}>List of {props.categoryName}</h5>
          </div>

          <div className="form-group  mr-auto ml-auto pl-5 pr-5">
            <label htmlFor="duration">Set request timeout duration in hours</label>
            <input type="number" className="form-control" onChange={props.onSetInput} value={props.inputValue} id="duration" placeholder="Timeout Duration" />
          </div>

          <div onClick={props.onClose} style={{
            width: 50,
            height: 50,
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: PrimaryTheme.danger,
            color: PrimaryTheme.black,
            fontSize: PrimaryTheme.fontSizes?.subtitle,
            borderBottomLeftRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            zIndex: 5000
          }}>
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
              <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
            </svg>
          </div>

          {props.children}

        </div>

      </Dialog>
    </div>
  );
}

interface DialogProps {
  children?: React.ReactElement;
  open: boolean;
  categoryName: string;
  onClose: any;
  hasInput?:boolean;
  onSetInput?: any;
  inputValue?: any;
}
