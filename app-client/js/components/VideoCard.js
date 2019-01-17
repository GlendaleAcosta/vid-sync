import React, { Component } from 'react';
import { Col } from 'reactstrap';
import {Link} from 'react-router-dom';

class VideoCard extends Component {
  render() {
    const {host, id, thumbnail, title} = this.props;
    return (
      <Col sm="4">
        <Link to={`/room/${id}`}>
          <div style={{backgroundImage: `url(${thumbnail})`}} className="video-card-img" />
        </Link>
        <p className="lead pl-2 text-muted mb-2">{title}</p>
          <div className="ml-1 video-card-icon mb-4 d-inline-block float-left" />
          <p className="ml-2 float-left text-muted">{host}</p>
      </Col>
    );
  }

}

export default VideoCard;
