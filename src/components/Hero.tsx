import React from 'react'

export default function Hero(props: HeroProps) {
  return (
    <div style={{
      backgroundImage: props.backgroundImage,
      backgroundSize: 'cover',
      backgroundPosition: 'top center',
      backgroundRepeat: 'no-repeat',
      height: 'auto',
      backgroundAttachment: props.parallax ? 'fixed' : '',
      position: 'relative',
      minHeight: 40,
    }}>
      <div style={{
        backgroundColor: 'rgba(0,0,0, 70%)',
        padding: '50px 0',
        height: props.height,
      }}>

        {props.children}

      </div>
    </div>
  )
}

interface HeroProps {
  height?: string | number | undefined
  children?: any
  background?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  parallax: boolean;
  color?: string;
}