import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import moment from 'moment';

import Button from '../../Button';
import Card, { CardBody } from '../../Card';
import { DatePicker__React } from '../../DatePicker';
import DropdownHost from '../../DropdownHost';
import Input from '../../Input';
import ModalClose from '../../Modal/Modal__Button_Close';
import RepeatDropdown from './RepeatDropdown';

import { getShowSelected, getSearchDate } from '../../../redux/show';
import { requiredValidate } from '../../../utils/validation';

class NewShowForm extends Component {
  render() {
    const { props } = this;
    const { isRepeat, handleSubmit } = props;

    return (
      <Card>
        <CardBody>
          <form className="new-show-form" onSubmit={handleSubmit}>
            <div className="new-show-form__grid">
              <Field
                className="grid-span--2"
                component={Input}
                label="Title"
                name="title"
                type="text"
                validate={[requiredValidate]}
              />

              <Field
                className="z-index--250"
                component={DatePicker__React}
                label="From"
                name="show_start_time_utc"
                type="time"
                validate={[requiredValidate]}
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
              />

              <Field
                className="z-index--250"
                component={DatePicker__React}
                label="To"
                name="show_end_time_utc"
                validate={[requiredValidate]}
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
              />

              <Field
                className="z-index--200"
                component={DatePicker__React}
                label="Start"
                name="repeat_start_date"
                validate={[requiredValidate]}
              />

              <Field
                component={Input}
                dirtyOverride
                label="Repeat"
                name="repeat"
                type="checkbox"
              />

              {isRepeat && (
                <>
                  <Field
                    className="z-index--150"
                    component={DatePicker__React}
                    label="End"
                    name="repeat_end_date"
                    placeholderText="Never"
                    isClearable={true}
                    allowNullDate
                  />

                  <RepeatDropdown />
                </>
              )}

              <Field
                className="grid-span--2"
                component={Input}
                label="Summary"
                name="summary"
                type="text"
              />
              {/**
                  *Example of text area.  Needs to be turned into a full component to use with redux-forms.
                  <textarea
                    name=""
                    id=""
                    style={{ resize: 'none', width: '100%' }}
                    rows="7"
                  />*/}

              <Field
                className="grid-span--2"
                component={Input}
                label="Description"
                name="description"
                type="text"
              />

              <Field
                label="Producer"
                name="producer"
                component={Input}
                type="text"
              />

              <Field label="Host" name="host" component={DropdownHost} />
            </div>

            <div className="new-show-form__buttons">
              <Button color="primary" type="submit">
                Save
              </Button>

              <ModalClose />
            </div>
          </form>
        </CardBody>
      </Card>
    );
  }
}

const selector = formValueSelector('newShow');

function mapStateToProps(state) {
  //console.log(state);
  const initialValues = state => {
    const selectedShow = getShowSelected(state.show);
    const searchDates = getSearchDate(state.show);

    return {
      show_start_time_utc: moment(selectedShow.start),
      show_end_time_utc: moment(selectedShow.end),
      repeat_start_date: moment(selectedShow.start),
      repeat_end_date: moment(selectedShow.end),
      startDate: searchDates.start,
      endDate: searchDates.end,
      repeat: false,
    };
  };

  const isRepeat = selector(state, 'repeat');

  return {
    initialValues: initialValues(state),
    isRepeat,
  };
}

NewShowForm = reduxForm({
  form: 'newShow',
})(NewShowForm);

export default connect(
  mapStateToProps,
  {},
)(NewShowForm);
