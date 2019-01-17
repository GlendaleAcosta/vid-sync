import React, { Component } from 'react';
import { Container, Row , Button } from 'reactstrap';
import NavigationBar from 'components/NavigationBar';
import Banner from 'components/Banner'
import banner from 'images/Rectangle.png';
import VideoCard from 'components/VideoCard';
import CreateRoomModal from 'components/CreateRoomModal'
import {toggleModal} from 'actions/modalActions';
import {createRoom, getOpenRooms} from 'actions/roomActions';
import {connect} from 'react-redux';

class Home extends Component {
  constructor(props) {
      super(props);
      props.dispatch(getOpenRooms());
    }

  toggleModal = () => {
    this.props.dispatch(toggleModal());
  }

  handleSubmit = values => {
    const {username} = values;
    const {dispatch, history} = this.props;
    window.localStorage.setItem('username', username);
    dispatch(createRoom(username))
      .then((room) => {
        this.props.dispatch(toggleModal());
        history.push(`/room/${room.id}`);
      })
  }

  renderVideoCards = () => {
    const {rooms} = this.props.roomReducer;
    return rooms ? rooms.map(room => {

      return <VideoCard {...room} />;
    }) : null
  }

  render() {
    return (
      <div>
        <NavigationBar />
        <Banner img={banner} height="40vh" />
        <Container className="pt-4">
          <Row>
            <h1 className="col-md-12 pb-4 ">Featured Rooms
              <span className="font-weight-light text-muted ml-4 small">
                Rooms people are in now
              </span>
              <Button onClick={this.toggleModal} color="danger" className="float-right">Create Room</Button>
            </h1>

            {this.renderVideoCards()}

            <CreateRoomModal onSubmit={this.handleSubmit} {...this.props} />
          </Row>
        </Container>

      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    modalReducer: state.modalReducer,
    roomReducer: state.roomReducer
  };
}
export default connect(mapStateToProps)(Home);
