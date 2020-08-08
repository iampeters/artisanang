import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';


export default function SwipeableTemporaryDrawer(props: DrawerProps | any | boolean) {

  return (
    <div className='col-md-12'>
      <React.Fragment>
        <SwipeableDrawer
          anchor={props.anchor}
          open={props.state}
          onClose={props.toggleDrawer}
          onOpen={props.toggleDrawer}
        >
          {props.children}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}

interface DrawerProps {
  anchor: any;
  toggleDrawer: any;
  state: boolean;
}
