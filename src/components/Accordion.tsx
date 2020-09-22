import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PrimaryTheme from '../themes/Primary';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);

export default function SimpleAccordion(props: AccordionProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion elevation={0} className='border'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{
            fontFamily: PrimaryTheme.fonts?.lightFont
          }}>
            {props.body}
          </Typography>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}


interface AccordionProps {
  title: string;
  body: string;
}