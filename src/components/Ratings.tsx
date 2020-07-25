import React from 'react';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Box from '@material-ui/core/Box';
import PrimaryTheme from '../themes/Primary';
import { Ratings } from '../interfaces/interface';

export default function CustomizedRatings(props: Ratings) {
  return (
    <div>
      <Box component="fieldset" borderColor="transparent">
        <Rating
          name="rating"
          defaultValue={props.rating}
          precision={0.5}
          readOnly
          style={{color: PrimaryTheme.rating}}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
      </Box>
    </div>
  );
}
