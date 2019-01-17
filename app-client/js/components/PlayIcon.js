import React, { Component } from 'react';
import {PlayerIcon} from 'react-player-controls';

class PlayIcon extends Component {
  playVideo = () => {
    const {youtube, socket} = this.props;
    socket.emit('client-play', youtube.getCurrentTime());
    youtube.playVideo();

  }

  pauseVideo = () => {
    const {youtube, socket} = this.props;
    socket.emit('client-pause', youtube.getCurrentTime());
    youtube.pauseVideo();

  }
  render() {
    const {youtube} = this.props;
    if (youtube === null)
      return null;
    else {
      return youtube.getPlayerState() === 1
      ? <PlayerIcon.Pause onClick={() => this.pauseVideo()}className="player-icon ml-2 mr-3"/>
      : <PlayerIcon.Play onClick={() => this.playVideo()} className="player-icon ml-2 mr-3"/>
    }
  }

}

export default PlayIcon;
