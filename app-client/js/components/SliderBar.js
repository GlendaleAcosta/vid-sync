import React, { Component } from 'react';

class SliderBar extends Component {

  render() {
    const value = this.props.value;
    const width = this.props.isDragging ? value * 100 : (this.props.currTime / this.props.duration) * 100;
    const style = {
      width: `${width}%`
    }
    return (
      <div style={style} className="slider-bar-current" />
    );
  }

}

export default SliderBar;
