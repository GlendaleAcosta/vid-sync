import React, { Component } from 'react';
import {Col} from 'reactstrap';

class ChatMessageBox extends Component {
  renderMessages = () => {
   const {chatMessages} = this.props;
   return (chatMessages.length > 0)
     ? chatMessages.map((chat) => {
      return (
        <p key={chat.id} className="small m-0 text-muted">
          <span className="font-weight-bold">
            {chat.user}:
          </span>
          {` ${chat.message}`}
        </p>
      );
    })
    : null;
  }

  componentDidMount() {

  }

  render() {
    return (
      <Col sm="12" className="p-0 chat-messages-container">
        {this.renderMessages()}
      </Col>
    );
  }

}

export default ChatMessageBox;
