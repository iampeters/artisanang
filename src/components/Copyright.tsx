
import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
       {'Copyright '} <FontAwesomeIcon icon={faCopyright} className='mr-2' />
      <Link color="inherit" href="https://artisana.ng/" target="_blank" rel='noopener noreferer'>
        Artisana
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
