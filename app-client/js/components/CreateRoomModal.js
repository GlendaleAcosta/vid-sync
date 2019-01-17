import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import {toggleModal} from 'actions/modalActions';
import { reduxForm, Field } from 'redux-form';
import RenderField from 'components/RenderField';
import {requiredVal, maxLength15, minLength3} from 'util/formValidations';

class CreateRoomModal extends Component {
    toggle = () => {
      this.props.dispatch(toggleModal());
    }

    render() {
      const { handleSubmit } = this.props;
      return (
        <Modal isOpen={this.props.modalReducer.modal} toggle={this.toggle} className={this.props.className}>
          <Form onSubmit={handleSubmit}>
            <ModalHeader toggle={this.toggle}>Choose Username</ModalHeader>
            <ModalBody>

                <Field
                  component={RenderField}
                  type="text"
                  label="Username"
                  name="username"
                  placeholder="Enter username"
                  validate={[requiredVal, minLength3, maxLength15]}
                />

            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary" className="submit">Create Room</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      );
    }

}

export default CreateRoomModal = reduxForm({
  form: 'CreateRoomModal'
})(CreateRoomModal);
