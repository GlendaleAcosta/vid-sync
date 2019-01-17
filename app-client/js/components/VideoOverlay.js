import React, { Component } from 'react';

class VideoOverlay extends Component {

  playVideo = () => {
    const {socket, youtube} = this.props;
    socket.emit('client-play', youtube.getCurrentTime());
    youtube.playVideo();
  }

  pauseVideo = () => {
    const {socket, youtube} = this.props;
    socket.emit('client-pause', youtube.getCurrentTime());
    youtube.pauseVideo();
  }

  render() {
    const playerState = this.props.youtube.getPlayerState();
    return (
      <div onClick={(playerState === 1) ? this.pauseVideo : this.playVideo} className="invisible-youtube-box" />
    );
  }

}

export default VideoOverlay;
