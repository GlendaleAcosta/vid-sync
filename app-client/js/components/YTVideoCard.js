import React, { Component } from 'react';
import { Col } from 'reactstrap';
import {selectVideo} from 'actions/youtubeActions';
import {toggleModal} from 'actions/modalActions';

class YTVideoCard extends Component {
  selectVideo = () => {
    const {id, socket, snippet, match} = this.props;
    const video = {
      id: id,
      snippet: snippet
    }

    socket.emit('client-change-video', video);
    this.props.dispatch(selectVideo(video, match.params.roomId));
    this.props.dispatch(toggleModal());
  }

  render() {
    const {snippet} = this.props;

    const thumbnailURL = snippet.thumbnails.medium.url;
    return (
      <Col sm="3">
        <div onClick={this.selectVideo} className="video-card-img" style={{backgroundImage: `url(${thumbnailURL})`}}/>
        <p className="pl-2 text-muted mb-1">{snippet.title}</p>
          <div className="ml-1 yt-video-card-icon mb-4 d-inline-block float-left" />
          <p className="ml-2 float-left text-muted small font-weight-bold">{snippet.channelTitle}</p>
      </Col>
    );
  }

}

export default YTVideoCard;
