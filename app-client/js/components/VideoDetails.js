import React, { Component } from 'react';
import {toggleModal} from 'actions/modalActions';

class VideoDetails extends Component {


  toggleModal = () => {
    this.props.dispatch(toggleModal());
  }

  render() {
    const {youtubeReducer} = this.props;
    return (
      <div>
        <p className="lead ml-1 mt-2 mb-2">
            {youtubeReducer.currVideo.snippet.title}
          <span className="clipboard small btn-info btn float-right">C</span>
          <span onClick={this.toggleModal} className="clipboard small btn-info btn float-right mr-1">Add Video</span>

        </p>
        <div className="ml-1 video-card-icon mb-4 d-inline-block float-left mb-0" />
        <p className="ml-2 float-left text-muted mb-0">{youtubeReducer.currVideo.snippet.channelTitle}</p>
      </div>
    );
  }

}

export default VideoDetails;
