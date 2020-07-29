import React from 'react'
import PrimaryTheme from '../themes/Primary'
import { useHistory } from 'react-router-dom'
import { Button, Icon } from '@material-ui/core';

export default function Messages() {
  const history = useHistory();

  return (
    <div className='animated fadeIn'>
      <div className='col-md-12'>
        <div className="row m-0 justify-content-between">
          <h4 className='mb-0' style={{ color: PrimaryTheme.appBar }}>Messages</h4>
          <Button variant='text' size='small' style={{ color: PrimaryTheme.appBar }} onClick={() => history.goBack()}>
            <Icon style={{ marginRight: 5 }}>arrow_back</Icon>
            Go back
          </Button>
        </div>
      </div>

      <div className="col-md-9 ml-auto mr-auto p-0 mb-5">
      </div>
    </div>
  )
}
