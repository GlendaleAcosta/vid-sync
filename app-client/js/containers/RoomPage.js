import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
import NavigationBar from 'components/NavigationBar';
import ChatForm from 'components/ChatForm';
import ChatMessageBox from 'components/ChatMessageBox';
import Video from 'components/Video';
import VideoDetails from 'components/VideoDetails';
import YTSearchModal from 'components/YTSearchModal';
import io from "socket.io-client";
import {connect} from 'react-redux';
import {initRoom} from 'actions/youtubeActions';
import ChooseUsernameModal from 'components/ChooseUsernameModal';
import {reset} from 'redux-form';

class RoomPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      chatMessages: []
    }
  }

  componentDidMount() {
    const {match} = this.props;
    const socket = io('/', {query: {roomId: match.params.roomId}});
    const that = this;

    this.setState({
      socket: socket
    });

    socket.on('server-chat', (chatLine) => {
      const { chatMessages } = that.state;
      const newMessages = chatMessages.push(chatLine);
      that.setState({
        messages: newMessages
      })
    });
  }

  componentDidUpdate() {
    const { dispatch } = this.props;
    if (this.state.socket) {
      this.state.socket.on('init', function(initData) {
        dispatch(initRoom(initData));
      });
    }
  }


  handleSubmit = (values) => {
    const {socket} = this.state;
    const {dispatch} = this.props;
    const data = {
      ...values,
      user: window.localStorage.getItem('username')
    }
    if (socket) {
      socket.emit('client-chat', data);
    }
    dispatch(reset('chatForm'));
  }

  render() {
    const { socket, chatMessages} = this.state;
    const { youtubeReducer} = this.props;
    return socket ? (
      <div>
        <NavigationBar />
        <Container fluid>
          <Row className="room-page">
            <Col className="pr-5 pl-5 pt-3"sm="9">
              { youtubeReducer.currVideo && youtubeReducer.initData ? <Video {...this.props} socket={socket} /> : null }
              { youtubeReducer.currVideo ? <VideoDetails {...this.props} /> : null }
            </Col>
            <Col className="chat-container d-flex flex-column" sm="3">
              <ChatMessageBox chatMessages={chatMessages} {...this.props} socket={socket} />
              <ChatForm onSubmit={this.handleSubmit} />
            </Col>
          </Row>
        </Container>
        <YTSearchModal {...this.props} socket={socket} className="yt-search-modal col-md-5"/>
        <ChooseUsernameModal {...this.props} />
      </div>
    ) : null;
  }

}

function mapStateToProps(state) {
  return {
    modalReducer: state.modalReducer,
    roomReducer: state.roomReducer,
    youtubeReducer: state.youtubeReducer
  };
}
export default connect(mapStateToProps)(RoomPage);
