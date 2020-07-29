import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const labels: { [index: string]: string } = {
  0.5: 'Very useless',
  1: 'Useless',
  1.5: 'Very Poor',
  2: 'Poor',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles({
  root: {
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end'
  },
});

export default function Ratings(props: Rating) {

  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Rating
        name="Rate Artisan"
        value={props.value}
        precision={0.5}
        onChange={props.onChange}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {props.value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : props.value]}</Box>}
    </div>
  );
}

interface Rating {
  onChange: any;
  value: any;

}
