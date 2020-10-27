import React from 'react';

import Modal from './modal';
import Button from '../formelements/Button';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header={props.header}
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
