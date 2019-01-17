import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input } from 'reactstrap';
import { reduxForm } from 'redux-form';

class ChooseUsernameModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      submitted: false
    };
  }

  handleChange = (e) => {
    this.setState({ username: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    window.localStorage.setItem('username', this.state.username);
    this.setState({
      submitted: true
    })
  }

  render() {
    const username = window.localStorage.getItem('username');
    return (
      <Modal isOpen={!username} className={this.props.className}>
        <Form onSubmit={this.handleSubmit}>
          <ModalHeader>Choose Username</ModalHeader>
          <ModalBody>

            <FormGroup className="d-flex flex-row">
              <Input
                value={this.state.username}
                onChange={this.handleChange}
                className=""
                type="text"
                name="search"
                placeholder="Enter Username"
              />
            </FormGroup>

            <Button type="submit" color="primary" className="submit float-right mb-3">Submit</Button>
          </ModalBody>
        </Form>

      </Modal>
    );
  }

}

export default ChooseUsernameModal = reduxForm({
  form: 'ChooseUsernameModal'
})(ChooseUsernameModal);
