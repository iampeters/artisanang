import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar, CardHeader } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
  },
});

export default function ImgMediaCard(props: CardProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root + ' col-md-12 ml-auto mr-auto'}>
      <div className="row m-0 justify-content-between align-items-center pt-3 pb-3">
       {props.artisanImage &&  <div>
          <CardHeader className="btn btn-link"
            avatar={
              <Avatar src={props.artisanImage} alt={props.artisan} />
            }
            subheader={props.artisan} />
        </div>}
        <div>
          <span className={"badge badge-pill p-2 pl-3 pr-3 badge-" + props.color}>{props.status}</span>
        </div>
      </div>
      {/* <span className="badge badge-warning">hell{props.status}</span>
      </CardHeader> */}
      <CardActionArea onClick={props.onClick}>
        <CardMedia
          component="img"
          alt={props.title}
          height="140"
          image="/empty.svg"
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>

          <Typography gutterBottom variant="h6" component="h2" className="mt-3">
            {props.category && "Category"}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.category}
          </Typography>

          <Typography gutterBottom variant="h6" component="h2" className="mt-3">
            {"Date"}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.date}
          </Typography>

        </CardContent>
      </CardActionArea>
      {props.status === "NEW" && <CardActions className="pt-3 pb-3">
        <Button onClick={props.onClick} size="medium" style={{
          color: props.actionButtonColor,
          backgroundColor: props.actionButtonBgColor
        }} variant="contained">
          {props.actionButton}
        </Button>
        <Button onClick={props.onEdit} size="medium" style={{
          color: props.secondActionButtonColor,
          backgroundColor: props.secondActionButtonBgColor
        }}>
          {props.secondActionButton}
        </Button>
      </CardActions>}
    </Card>
  );
}


interface CardProps {
  title: string;
  image?: string;
  description?: string;
  status?: "NEW" | "PENDING" | "ASSIGNED" | "ACCEPTED";
  category?: string;
  date?: string;
  artisan?: string;
  artisanImage?: string;
  artisanId?: string;
  color?: "warning" | "success" | "danger" | "info" | "light" | "primary";
  onClick?: any;
  onEdit?: any;
  showActions?: boolean;
  actionButton: "Assign" | "Accept";
  secondActionButton?: "Edit" | "Reject";
  secondActionButtonColor?: string;
  secondActionButtonBgColor?: string;
  actionButtonColor?: string;
  actionButtonBgColor?: string;

}