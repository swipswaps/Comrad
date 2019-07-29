import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { requiredValidate } from '../../../utils/validation';
import { playlistActions } from '../../../redux';

import Button from '../../Button';
import RichTextArea from '../../RichTextArea';

class FormShowBuilderComment extends Component {
  handleReduxFormSubmit = values => {
    const { playlist, playlistActions, reset } = this.props;
    if (values.submitAction === 'saved_items') {
      playlistActions.addCommentToSavedItems(playlist.doc._id, values.comment);
      reset();
    } else if (values.submitAction === 'scratchpad') {
      playlistActions.addCommentToScratchpad(playlist.doc._id, values.comment);
      reset();
    }
  };

  handleAddToSavedItems = () => {
    this.props.change('submitAction', 'saved_items');
  };

  handleAddToScratchpad = () => {
    this.props.change('submitAction', 'scratchpad');
  };

  render() {
    const { props, handleReduxFormSubmit } = this;
    const { handleSubmit } = props;

    return (
      <form
        className="form-show-builder-comment"
        onSubmit={handleSubmit(handleReduxFormSubmit)}
      >
        <Field
          component={RichTextArea}
          label="Comment"
          name="comment"
          autoFocus
          validate={requiredValidate}
        />
        <div>
          <Button type="submit" onClick={this.handleAddToScratchpad}>
            Add to Scratchpad
          </Button>
          <Button type="submit" onClick={this.handleAddToSavedItems}>
            Add to Saved Items
          </Button>
        </div>
      </form>
    );
  }
}

function mapStateToProps({ playlist }) {
  return { playlist };
}

function mapDispatchToProps(dispatch) {
  return {
    playlistActions: bindActionCreators({ ...playlistActions }, dispatch),
  };
}

const ReduxFormShowBuilderComment = reduxForm({
  form: 'showBuilderComment',
})(FormShowBuilderComment);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormShowBuilderComment);
