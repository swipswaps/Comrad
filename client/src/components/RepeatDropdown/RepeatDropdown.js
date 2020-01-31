import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, change } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';
import RRule from 'rrule';
import { DatePicker__React } from '../DatePicker';
import { InputLabel } from '../Input';
import { requiredValidate } from '../../utils/validation';

class RepeatDropdown extends Component {
  componentWillMount() {
    const { change, formSelectorName, initialValues } = this.props;
    if (initialValues != null && initialValues.repeat_rule != null) {
      let rules = this.definedRepeatRules(this.props.date);
      let repeatRule = initialValues.repeat_rule;
      Object.keys(rules).forEach(function(k) {
        let i = rules[k];
        if (
          i.frequency === repeatRule.frequency &&
          JSON.stringify(i.byweekday) ===
            JSON.stringify(repeatRule.byweekday) &&
          i.bysetpos === repeatRule.bysetpos &&
          JSON.stringify(i.bymonthday) === JSON.stringify(repeatRule.bymonthday)
        ) {
          change(
            formSelectorName,
            'repeat_rule_dropdown_value',
            JSON.stringify(i),
          );
        }
      });
    }
  }

  definedRepeatRules = date => {
    const dateSpelled = moment(date).format('dddd');
    const dateNumber = moment(date).date();

    const dayToRRule = {
      Monday: 'MO',
      Tuesday: 'TU',
      Wednesday: 'WE',
      Thursday: 'TH',
      Friday: 'FR',
      Saturday: 'SA',
      Sunday: 'SU',
    };

    const rules = {
      daily: {
        name: 'Every Day',
        frequency: RRule.DAILY,
      },
      weekdays: {
        name: 'Every Weekday (Mon-Fri)',
        frequency: RRule.WEEKLY,
        byweekday: ['MO', 'TU', 'WE', 'TH', 'FR'],
      },
      weekends: {
        name: 'Weekends (Sat/Sun)',
        frequency: RRule.WEEKLY,
        byweekday: ['SA', 'SU'],
      },
      weekly: {
        name: `Weekly on ${dateSpelled}`,
        frequency: RRule.WEEKLY,
        byweekday: [dayToRRule[dateSpelled]],
      },
      byposition_FirstOfMonth: {
        name: `First ${dateSpelled} of the Month`,
        frequency: RRule.MONTHLY,
        byweekday: [dayToRRule[dateSpelled]],
        bysetpos: 1,
      },
      byposition_LastOfMonth: {
        name: `Last ${dateSpelled} of the Month`,
        frequency: RRule.MONTHLY,
        byweekday: [dayToRRule[dateSpelled]],
        bysetpos: -1,
      },
      byday: {
        name: `On day ${dateNumber} of the month`,
        frequency: RRule.MONTHLY,
        bymonthday: dateNumber,
      },
    };

    return rules;
  };

  render() {
    const { definedRepeatRules, props } = this;
    const { date, meta } = props;
    const repeatDropdownList = _.map(definedRepeatRules(date), option => {
      // Dropdown values are using string of JSON instead of object. Inconclusive whether they can be set as object. See https://github.com/codefordenver/Comrad/issues/492
      return (
        <option key={option.name} value={JSON.stringify(option)}>
          {option.name}
        </option>
      );
    });

    // TODO Componentize the select component
    //https://stackoverflow.com/questions/40075281/how-to-create-custom-dropdown-field-component-with-redux-form-v6
    return (
      <>
        <Field
          className="z-index--200"
          component={DatePicker__React}
          label="Start"
          name="repeat_rule.repeat_start_date"
          validate={[requiredValidate]}
          disabled={date != null ? true : false}
          controlledDate={date != null ? date : null}
        />

        <div className="form-group">
          <Field
            name="repeat_rule_dropdown_value"
            component="select"
            className="input"
            validate={[requiredValidate]}
          >
            <option />
            {repeatDropdownList}
          </Field>

          <InputLabel {...meta} dirtyOverride={true}>
            {`Repeat Type`}
          </InputLabel>
        </div>

        <Field
          className="z-index--150"
          component={DatePicker__React}
          label="End"
          name="repeat_rule.repeat_end_date"
          placeholderText="Never"
          isClearable={true}
          allowNullDate
        />
      </>
    );
  }
}

export default connect(
  null,
  { change },
)(RepeatDropdown);
