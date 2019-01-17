import React, { Component } from 'react';
import {Button, Col, Form} from 'reactstrap'
import { reduxForm, Field } from 'redux-form';
import RenderField from 'components/RenderField';

class ChatForm extends Component {
  
  render() {
    const {handleSubmit} = this.props;
    return (
      <Col sm="12" className="p-0 chat-form">
        <Form onSubmit={handleSubmit} className="text-right">
          <Field
            component={RenderField}
            type="textarea"
            label={null}
            name="message"
            placeholder="Enter message"
          />
          <Button color="primary" type="submit">Send Message</Button>
        </Form>
      </Col>
    );
  }

}

export default ChatForm = reduxForm({
  form: 'chatForm'
})(ChatForm);
