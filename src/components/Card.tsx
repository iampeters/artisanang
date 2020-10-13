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
import { useSelector } from 'react-redux';
import { Reducers } from '../interfaces/interface';
import { useHistory } from 'react-router-dom';
import PrimaryTheme from '../themes/Primary';

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
  },
});

export default function ImgMediaCard(props: CardProps) {
  const classes = useStyles();
  const user = useSelector((state: Reducers) => state.user);
  const history = useHistory();

  return (
    <Card className={classes.root + ' col-md-12 ml-auto mr-auto'}>
      <div className="row m-0 justify-content-between align-items-center pt-3 pb-3">
        {props.artisanImage && <div>
          <CardHeader className="btn text-dark"
            avatar={
              <Avatar src={props.artisanImage} alt={props.artisan} />
            }
            subheader={props.artisan} onClick={() => history.push(`/artisans/details/${props.artisanId && props.artisanId._id}`)} />
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

          {props.status !== "PENDING" && props.status !== "NEW" && props.status !== "TIMEOUT" && user.userType === 2 && <React.Fragment>
            <Typography gutterBottom variant="h6" component="h2" className="mt-3">
              {"Contact"}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.phoneNumber}
            </Typography>

            <Typography gutterBottom variant="h6" component="h2" className="mt-3">
              {"Address"}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.address}
            </Typography>
          </React.Fragment>}


          {user.userType === 1 && <React.Fragment>
            <Typography gutterBottom variant="h6" component="h2" className="mt-3">
              {"Contact"}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.phoneNumber}
            </Typography>

            <Typography gutterBottom variant="h6" component="h2" className="mt-3">
              {"Address"}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.address}
            </Typography>
          </React.Fragment>}

          <Typography gutterBottom variant="h6" component="h2" className="mt-3">
            {"LGA"}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.lga}
          </Typography>

          <Typography gutterBottom variant="h6" component="h2" className="mt-3">
            {"State"}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.state}
          </Typography>

        </CardContent>

      </CardActionArea>
      {props.status === "NEW" && user.userType !== 2 && <CardActions className="pt-3 pb-3">
        <Button onClick={props.onClick} size="medium" style={{
          color: props.actionButtonColor,
          backgroundColor: props.actionButtonBgColor
        }} variant="contained">
          {props.actionButton}
        </Button>
        {/* <Button onClick={props.onEdit} size="medium" style={{
          color: props.secondActionButtonColor,
          backgroundColor: props.secondActionButtonBgColor
        }}>
          {props.secondActionButton}
        </Button> */}
      </CardActions>}

      {props.status === "NEW" && user.userType === 2 && props.type === "request" && <CardActions className="pt-3 pb-3">
        <Button onClick={props.onAccept} size="medium" style={{
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

      {props.status === "ASSIGNED" && user.userType !== 2 && <CardActions className="pt-3 pb-3">
        <Button onClick={props.onComplete} size="medium" style={{
          color: props.completeActionButtonColor,
          backgroundColor: props.completeActionButtonBgColor
        }} variant="contained">
          {props.completeAction}
        </Button>
      </CardActions>}

      {props.status === "COMPLETED" && user.userType !== 2 && <CardActions className="pt-3 pb-3">
        <Button onClick={props.goto} size="medium" style={{
          color: props.completeActionButtonColor,
          backgroundColor: PrimaryTheme.success
        }} variant="contained">
          {props.navigationText}
        </Button>
      </CardActions>}
    </Card>
  );
}


interface CardProps {
  title: string;
  image?: string;
  description?: string;
  status?: "NEW" | "PENDING" | "ASSIGNED" | "ACCEPTED" | "COMPLETED" | "TIMEOUT";
  category?: string;
  date?: string;
  artisan?: string;
  phoneNumber?: string;
  artisanImage?: string;
  artisanId?: any;
  color?: "warning" | "success" | "danger" | "info" | "light" | "primary";
  onClick?: any;
  onEdit?: any;
  showActions?: boolean;
  actionButton?: "Assign" | "Accept";
  secondActionButton?: "Edit" | "Reject";
  secondActionButtonColor?: string;
  secondActionButtonBgColor?: string;
  actionButtonColor?: string;
  actionButtonBgColor?: string;
  completeAction?: "Complete";
  completeActionButtonColor?: string;
  completeActionButtonBgColor?: string;
  onComplete?: any;
  onAccept?: any;
  goto?: any;
  navigationText?: string;
  type?: "request" | "job";
  address?: string;
  state?: string;
  country?: string;
  lga?: string;
}