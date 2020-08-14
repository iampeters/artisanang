
import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import PrimaryTheme from '../themes/Primary';

export default function Copyright(props: CopyrightProps) {
  return (
    <Typography variant="body2" color={props.color} align="center" style={{
      fontFamily: PrimaryTheme.fonts?.ProductSansRegular
    }}>
      {'Copyright © '}
      <Link color="inherit" href="https://artisana.ng/" target="_blank" rel='noopener noreferer'>
        Artisana
      </Link>{' '}
      {new Date().getFullYear()}
      {' | '}
      <Link color="inherit" href="https://artisana.ng/" target="_blank" rel='noopener noreferer'>
        Terms
      </Link>{' '}

      {' | '}
      <Link color="inherit" href="https://artisana.ng/" target="_blank" rel='noopener noreferer'>
        Privacy Policy
      </Link>{' '}
    </Typography>
  );
}

interface CopyrightProps {
  color: "inherit" | "initial" | "error" | "primary" | "secondary" | "textPrimary" | "textSecondary" | undefined;
}