import React, { Component } from 'react';
import {Slider, Direction} from 'react-player-controls';
import SliderBar from 'components/SliderBar';
import SliderHandle from 'components/SliderHandle';
import PlayIcon from 'components/PlayIcon';

class PlayerControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastIntent: 0,
      value: 0,
      lastValueStart: 0,
      lastValueEnd: 0,
      isEnabled: true,
      direction: Direction.HORIZONTAL,
      isDragging: false
    };
  }

  // onIntent={intent => console.log(`hovered at ${intent}`)}
  // onChange={newValue => console.log(`clicked at ${newValue}`)}
  // onChangeStart={startValue => console.log(`started dragging at ${startValue}`)}
  // onChangeEnd={endValue => console.log(`stopped dragging at ${endValue}`)}

  onChangeStart = (startValue) => {
    this.setState({
      lastValueStart: startValue,
      isDragging: true,
    })
  }

  onChangeEnd = (endValue) => {
    this.setState({
      lastValueEnd: endValue,
      isDragging: false,
    });
    const {youtube, socket} = this.props;
    const time = youtube.getDuration() * endValue;
    youtube.seekTo(time);
    socket.emit('client-seekTo', time);
  }

  _onChange = (newValue) => {
    this.setState({ value: newValue })
  }

  componentDidMount() {
    const that = this;
    const {youtube} = this.props;
    setInterval(() => {
      that.setState({
        currTime: youtube.getCurrentTime()
      });
    }, 100)

  }


  render() {
    const {youtube} = this.props;
    const {isDragging} = this.state;
    const duration = youtube.getDuration(); // 300
    const currTime = youtube.getCurrentTime(); // 0.023
    return (
      <div className="player-controls-container d-flex align-items-center">
        <PlayIcon {...this.props}/>
        <Slider
          direction={this.state.direction}
          isEnabled
          onIntent={intent => this.setState(() => ({ lastIntent: intent }))}
          onChange={(newValue) => this._onChange(newValue)}
          onChangeStart={(startValue) => this.onChangeStart(startValue)}
          onChangeEnd={endValue => this.onChangeEnd(endValue)}
          className="slider mr-3"
        >
          <SliderBar
            direction={this.state.direction}
            value={this.state.value}
            duration={duration}
            currTime={currTime}
            isDragging={isDragging}
            youtube={youtube}
          />
          <SliderHandle
            direction={this.state.direction}
            value={this.state.value}
            duration={duration}
            currTime={currTime}
            isDragging={isDragging}
            youtube={youtube}
          />
        </Slider>
      </div>
    )
  }

}

export default PlayerControls;
