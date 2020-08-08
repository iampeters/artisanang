import React from 'react'
import { useHistory } from 'react-router-dom';

export default function Unauthorized() {
  const history = useHistory();

  return (
    <div className='bg-white'>
      <div className="container">
        <div className="row">
          <h3>Either You are not Unauthorized to view this page or your token has expired.</h3>
          <button className='btn btn-primary' onClick={() => history.push('/sign-in')}>Back to login</button>
        </div>
      </div>
    </div>
  )
}
