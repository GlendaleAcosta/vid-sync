import React from 'react';
import { FormGroup, Label, Input} from 'reactstrap';

const RenderField = ({ input, label, type, name, placeholder, meta: { touched, error, warning } }) => {
  return (
    <FormGroup className="pt-3 mb-3">
      {label ? (
        <div className="label-container">
          <Label for="name" className="w-100 font-weight-bold m-0 label">
            {label}
          </Label>
        </div>
      ): null
    }
      <Input
        className={`${error && touched ? 'border-danger' : null} ${!error && touched ? 'border-success': null}`}
        {...input}
        type={type}
        name={name}
        placeholder={placeholder}
      />
      <p className="mb-0 ml-2 text-danger float-right small">{ touched && error ? `*${error}` : null}</p>
  </FormGroup>
  );
}

export default RenderField;
