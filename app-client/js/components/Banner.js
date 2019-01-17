import React from 'react';

const Banner = ({img, height}) => (
  <div style={{background: `url(${img})`, height: height, backgroundSize: 'cover'}} className="w-100"/>
);

export default Banner;
