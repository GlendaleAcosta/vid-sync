import React, { Component } from 'react';
import YouTube from 'react-youtube';
import PlayerControls from 'components/PlayerControls';
import {selectVideo} from 'actions/youtubeActions';

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      youtube: null
    }
  }

  onPlay = (player) => {
    this.setState({ youtube: player.target});
  }

  onPause = (player) => {
    this.setState({ youtube: player.target});
  }

  onReady = (player) => {
    const {socket, dispatch, youtubeReducer} = this.props;
    const youtube = player.target;
    this.setState({ youtube: youtube});


    if (!youtubeReducer.initData.isPlaying) {
      youtube.seekTo(youtubeReducer.initData.time);
      youtube.pauseVideo();
    } else {
      const lastTime = youtubeReducer.initData.timestamp;
      const now = Date.now();
      const timeDifference = (now - lastTime) / 1000;
      const currPlayTime = youtubeReducer.initData.time + timeDifference;
      youtube.seekTo(currPlayTime);
      youtube.playVideo();
    }

    socket.on('server-play', function(time){
      youtube.seekTo(time);
      youtube.playVideo();
    });

    socket.on('server-pause', function(time){
      youtube.seekTo(time);
      youtube.pauseVideo();
    });

    socket.on('server-seekTo', function(time) {
      youtube.seekTo(time);
    })

    socket.on('server-change-video', function(video){
      dispatch(selectVideo(video));
    });

    // youtube.target.hideVideoInfo();
  }



  render() {
    const {socket, youtubeReducer} = this.props;
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: {
        autoplay: 1,
        iv_load_policy: 3,
        controls: 0,
        modestbranding: 1,
        disablekb: 1,
        showInfo:0
      },
    };
    return (
      <div>
        <div className="video-player">
          {
          youtubeReducer.currVideo ? <YouTube
            className=""
            videoId={youtubeReducer.currVideo.id.videoId}
            opts={opts}
            onReady={this.onReady}
            onPlay={this.onPlay}
            onPause={this.onPause}
            onStateChange={this.onStateChange}
          />
          : null
        }

        </div>
        {this.state.youtube ? <PlayerControls socket={socket} {...this.state} /> : null }
      </div>
    );
  }

}

export default Video;
