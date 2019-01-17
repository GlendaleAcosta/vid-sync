import React, { Component } from 'react';

class SliderHandle extends Component {

  render() {
    const value = this.props.value;
    const left = this.props.isDragging ? value * 100 : (this.props.currTime / this.props.duration) * 100;
    return (
      <div style={{left: `${left}%`}}className="slider-handle" />
    );
  }

}

export default SliderHandle;
