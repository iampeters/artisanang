import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default function Placeholder(props: Skeleton) {
  return (
    <div>
      <Skeleton
        variant={props.variant}
        width={props.width}
        height={props.height}
        animation={props.animation}
        className={props.classes} />
    </div>
  );
}

interface Skeleton {
  variant: "text" | "circle" | "rect" | undefined;
  width: number | string | undefined;
  height: number | string | undefined;
  animation: false | "wave" | "pulse" | undefined;
  classes: string;
}