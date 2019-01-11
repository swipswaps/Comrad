import React, { Component } from 'react';
import { connect } from 'react-redux';

import NewShowForm from './NewShowForm';
import Modal from '../Modal';

const NewShowModal = props => {
  return (
    <Modal show={props.modalVisibility}>
      <NewShowForm />
    </Modal>
  );
};

export default NewShowModal;
