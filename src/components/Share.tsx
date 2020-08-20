import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import {
  FacebookIcon,
  LinkedinIcon,
  FacebookShareButton,
  TwitterIcon,
  WhatsappIcon,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props: Modal) {

  let shareUrl = window.location.href;

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Share Artisan"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">

            <TwitterShareButton
              url={shareUrl}
              title={props.title}
              className="d-inline-block mr-1"

            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <FacebookShareButton
              url={shareUrl}
              title={props.title}
              className="d-inline-block mr-1"
              quote={props.description}
              hashtag="artisana"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <LinkedinShareButton
              url={shareUrl}
              title={props.title}
              className="d-inline-block mr-1"
              summary={props.description}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <WhatsappShareButton
              url={shareUrl}
              title={`${props.title} | ${props.description}`}
              className="d-inline-block mr-1"

            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="default">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


interface Modal {
  onClose: any;
  onOpen?: any;
  title?: string;
  description?: string;
  open: boolean;
}