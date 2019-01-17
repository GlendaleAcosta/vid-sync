import React, { Component } from 'react';
import { Button, Row, Modal, ModalHeader, ModalBody, Form, Input, FormGroup } from 'reactstrap';
import { reduxForm } from 'redux-form';
import {toggleModal} from 'actions/modalActions';
import {searchYouTube} from 'actions/youtubeActions';
import YTVideoCard from 'components/YTVideoCard';

class YTSearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }
  toggle = () => {
    this.props.dispatch(toggleModal());
  }

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  }

  search = (e) => {
    e.preventDefault();
    this.props.dispatch(searchYouTube(this.state.searchQuery));
  }

  renderVideos = () => {
    const { youtubeReducer } = this.props;
    return youtubeReducer.videos
      ? youtubeReducer.videos.map((video) => <YTVideoCard {...this.props} {...video} key={video.id.videoId} />)
      : null
  }

  render() {
    return (
      <Modal isOpen={this.props.modalReducer.modal} toggle={this.toggle} className={this.props.className}>

        <ModalHeader toggle={this.toggle}>Choose a video</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.search} className="col-md-6">
            <FormGroup className="d-flex flex-row">
              <Input
                value={this.state.searchQuery}
                onChange={this.handleChange}
                className="rounded-0 rounded-left border-right-0"
                type="text"
                name="search"
                placeholder="Search videos"
              />
              <Button className="ml-0 rounded-0 rounded-right">Search</Button>
            </FormGroup>
          </Form>

          <Row>
            {this.renderVideos()}
          </Row>
        </ModalBody>
      </Modal>
    );
  }

}

export default YTSearchModal = reduxForm({
  form: 'YTSearchModal'
})(YTSearchModal);
