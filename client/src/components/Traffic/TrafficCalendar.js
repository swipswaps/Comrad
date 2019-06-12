import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

class TrafficCalendar extends Component {
  state = {
    newShow: null,
    shows: [],
  };

  startAccessorCalc(show) {
    const { show_start_time_utc } = show;
    //Basic check for shows that start and end at midnight.
    if (
      moment(show_start_time_utc).format('HH') === '00' &&
      moment(show_start_time_utc).format('MM') === '00'
    ) {
      return new Date(moment(show_start_time_utc).add(1, 'second'));
    }
    return new Date(moment(show_start_time_utc));
  }

  endAccessorCalc(show) {
    const { show_end_time_utc } = show;
    if (
      moment(show_end_time_utc).format('HH') === '00' &&
      moment(show_end_time_utc).format('MM') === '00'
    ) {
      return new Date(moment(show_end_time_utc).add(-1, 'second'));
    }
    return new Date(moment(show_end_time_utc));
  }

  eventStyleGetter = event => {
    let className = event.traffic_type
      ? 'event--' + event.traffic_type
      : 'event--show';

    return {
      className,
    };
  };

  slotPropGetter = date => {
    let className;
    if (date.getHours() == 0 && date.getMinutes() == 0) {
      className = 'sleepless sleepless--start';
    } else if (date.getHours() == 2 && date.getMinutes() == 30) {
      className = 'sleepless sleepless--end';
    } else if (date.getHours() >= 0 && date.getHours() < 3) {
      className = 'sleepless';
    }
    return {
      className,
    };
  };

  handleNavigate = date => {
    if (typeof this.props.onDateChange == 'function') {
      this.props.onDateChange(date);
    }
  };

  render() {
    const { date } = this.props;
    const localizer = BigCalendar.momentLocalizer(moment);

    const events = [
      //sample traffic
      {
        show_details: {
          guests: [null],
          title: 'Legal ID',
          summary: 'Late night freeform radio',
          description:
            '<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>',
          producer: null,
          host: null,
          custom: {
            record_audio: '1',
            url: 'sleepless',
            source: 'KGNU',
          },
        },
        status: 'active',
        _id: '5cd4dcfe3d74d84d7ca975ad-1556863200000',
        show_start_time_utc: '2019-05-13T06:00:00.000Z',
        show_end_time_utc: '2019-05-13T06:01:00.000Z',
        is_recurring: true,
        created_at: '2019-05-10T02:07:58.633Z',
        updated_at: '2019-05-10T02:07:58.633Z',
        __v: 0,
        master_show_uid: '5cd4dcfe3d74d84d7ca975ad',
        traffic_type: 'legal_id',
      },
      {
        show_details: {
          guests: [null],
          title: 'Legal ID',
          summary: 'Late night freeform radio',
          description:
            '<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>',
          producer: null,
          host: null,
          custom: {
            record_audio: '1',
            url: 'sleepless',
            source: 'KGNU',
          },
        },
        status: 'active',
        _id: '5cd4dcfe3d74d84d7ca975ad-1556863200000',
        show_start_time_utc: '2019-05-13T06:30:00.000Z',
        show_end_time_utc: '2019-05-13T06:31:00.000Z',
        is_recurring: true,
        created_at: '2019-05-10T02:07:58.633Z',
        updated_at: '2019-05-10T02:07:58.633Z',
        __v: 0,
        master_show_uid: '5cd4dcfe3d74d84d7ca975ad',
        traffic_type: 'legal_id',
      },
      {
        show_details: {
          guests: [null],
          title: 'Legal ID',
          summary: 'Late night freeform radio',
          description:
            '<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>',
          producer: null,
          host: null,
          custom: {
            record_audio: '1',
            url: 'sleepless',
            source: 'KGNU',
          },
        },
        status: 'active',
        _id: '5cd4dcfe3d74d84d7ca975ad-1556863200000',
        show_start_time_utc: '2019-05-13T07:00:00.000Z',
        show_end_time_utc: '2019-05-13T07:01:00.000Z',
        is_recurring: true,
        created_at: '2019-05-10T02:07:58.633Z',
        updated_at: '2019-05-10T02:07:58.633Z',
        __v: 0,
        master_show_uid: '5cd4dcfe3d74d84d7ca975ad',
        traffic_type: 'legal_id',
      },
      {
        show_details: {
          guests: [null],
          title: 'Avenue Theater',
          summary: 'Late night freeform radio',
          description:
            '<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>',
          producer: null,
          host: null,
          custom: {
            record_audio: '1',
            url: 'sleepless',
            source: 'KGNU',
          },
        },
        status: 'active',
        exclude_dates: ['2015-02-18T00:00:00.000Z', '2017-08-20T00:00:00.000Z'],
        _id: '5cd4dcfe3d74d84d7ca975ad-1556863200000',
        show_start_time_utc: '2019-05-13T06:30:00.000Z',
        show_end_time_utc: '2019-05-13T06:31:00.000Z',
        is_recurring: true,
        created_at: '2019-05-10T02:07:58.633Z',
        updated_at: '2019-05-10T02:07:58.633Z',
        __v: 0,
        master_show_uid: '5cd4dcfe3d74d84d7ca975ad',
        traffic_type: 'underwriting',
      },
      {
        show_details: {
          guests: [null],
          title: 'Denver Philharmonic',
          summary: 'Late night freeform radio',
          description:
            '<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>',
          producer: null,
          host: null,
          custom: {
            record_audio: '1',
            url: 'sleepless',
            source: 'KGNU',
          },
        },
        status: 'active',
        exclude_dates: ['2015-02-18T00:00:00.000Z', '2017-08-20T00:00:00.000Z'],
        _id: '5cd4dcfe3d74d84d7ca975ad-1556863200000',
        show_start_time_utc: '2019-05-13T06:35:00.000Z',
        show_end_time_utc: '2019-05-13T06:36:00.000Z',
        is_recurring: true,
        created_at: '2019-05-10T02:07:58.633Z',
        updated_at: '2019-05-10T02:07:58.633Z',
        __v: 0,
        master_show_uid: '5cd4dcfe3d74d84d7ca975ad',
        traffic_type: 'underwriting',
      },
    ];
    // sample show data
    //{		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1556863200000",		"show_start_time_utc": "2019-05-03T06:00:00.000Z",		"show_end_time_utc": "2019-05-03T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1556949600000",		"show_start_time_utc": "2019-05-04T06:00:00.000Z",		"show_end_time_utc": "2019-05-04T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1557036000000",		"show_start_time_utc": "2019-05-05T06:00:00.000Z",		"show_end_time_utc": "2019-05-05T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1557122400000",		"show_start_time_utc": "2019-05-06T06:00:00.000Z",		"show_end_time_utc": "2019-05-06T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1557208800000",		"show_start_time_utc": "2019-05-07T06:00:00.000Z",		"show_end_time_utc": "2019-05-07T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1557295200000",		"show_start_time_utc": "2019-05-08T06:00:00.000Z",		"show_end_time_utc": "2019-05-08T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1557381600000",		"show_start_time_utc": "2019-05-09T06:00:00.000Z",		"show_end_time_utc": "2019-05-09T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1557468000000",		"show_start_time_utc": "2019-05-10T06:00:00.000Z",		"show_end_time_utc": "2019-05-10T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1557554400000",		"show_start_time_utc": "2019-05-11T06:00:00.000Z",		"show_end_time_utc": "2019-05-11T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1557640800000",		"show_start_time_utc": "2019-05-12T06:00:00.000Z",		"show_end_time_utc": "2019-05-12T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1557727200000",		"show_start_time_utc": "2019-05-13T06:00:00.000Z",		"show_end_time_utc": "2019-05-13T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1557813600000",		"show_start_time_utc": "2019-05-14T06:00:00.000Z",		"show_end_time_utc": "2019-05-14T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1557900000000",		"show_start_time_utc": "2019-05-15T06:00:00.000Z",		"show_end_time_utc": "2019-05-15T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1557986400000",		"show_start_time_utc": "2019-05-16T06:00:00.000Z",		"show_end_time_utc": "2019-05-16T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1558072800000",		"show_start_time_utc": "2019-05-17T06:00:00.000Z",		"show_end_time_utc": "2019-05-17T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1558159200000",		"show_start_time_utc": "2019-05-18T06:00:00.000Z",		"show_end_time_utc": "2019-05-18T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1558245600000",		"show_start_time_utc": "2019-05-19T06:00:00.000Z",		"show_end_time_utc": "2019-05-19T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1558332000000",		"show_start_time_utc": "2019-05-20T06:00:00.000Z",		"show_end_time_utc": "2019-05-20T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1558418400000",		"show_start_time_utc": "2019-05-21T06:00:00.000Z",		"show_end_time_utc": "2019-05-21T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1558504800000",		"show_start_time_utc": "2019-05-22T06:00:00.000Z",		"show_end_time_utc": "2019-05-22T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1558591200000",		"show_start_time_utc": "2019-05-23T06:00:00.000Z",		"show_end_time_utc": "2019-05-23T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1558677600000",		"show_start_time_utc": "2019-05-24T06:00:00.000Z",		"show_end_time_utc": "2019-05-24T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1558764000000",		"show_start_time_utc": "2019-05-25T06:00:00.000Z",		"show_end_time_utc": "2019-05-25T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1558850400000",		"show_start_time_utc": "2019-05-26T06:00:00.000Z",		"show_end_time_utc": "2019-05-26T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1558936800000",		"show_start_time_utc": "2019-05-27T06:00:00.000Z",		"show_end_time_utc": "2019-05-27T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1559023200000",		"show_start_time_utc": "2019-05-28T06:00:00.000Z",		"show_end_time_utc": "2019-05-28T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1559109600000",		"show_start_time_utc": "2019-05-29T06:00:00.000Z",		"show_end_time_utc": "2019-05-29T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Sleepless Nights",			"summary": "Late night freeform radio",			"description": "<p>This freeform show makes room for everything, combining the aesthetics of the Morning and Afternoon shows and leaving the door open for more extreme and intense audio excursions.</p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "sleepless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": [],			"repeat_start_date": "2011-03-27T06:00:00.000Z",			"frequency": 3,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2017-08-20T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ad-1559196000000",		"show_start_time_utc": "2019-05-30T06:00:00.000Z",		"show_end_time_utc": "2019-05-30T09:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.633Z",		"updated_at": "2019-05-10T02:07:58.633Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ad"	}, {		"show_details": {			"guests": [null],			"title": "Honky Tonk Heroes",			"summary": "Classic Country and New Music Steeped in That Tradition.",			"description": "<p><span style=\"font-family: Arial,sans-serif;\">Recognized as a true American tradition, It's country music from its beginnings into the future.</span></p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "honkytonk",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": ["SU"],			"repeat_start_date": "2011-04-02T12:00:00.000Z",			"frequency": 2,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": [],		"_id": "5cd4dcfe3d74d84d7ca975af-1557057600000",		"show_start_time_utc": "2019-05-05T12:00:00.000Z",		"show_end_time_utc": "2019-05-05T15:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.634Z",		"updated_at": "2019-05-10T02:07:58.634Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975af"	}, {		"show_details": {			"guests": [null],			"title": "Honky Tonk Heroes",			"summary": "Classic Country and New Music Steeped in That Tradition.",			"description": "<p><span style=\"font-family: Arial,sans-serif;\">Recognized as a true American tradition, It's country music from its beginnings into the future.</span></p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "honkytonk",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": ["SU"],			"repeat_start_date": "2011-04-02T12:00:00.000Z",			"frequency": 2,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": [],		"_id": "5cd4dcfe3d74d84d7ca975af-1557662400000",		"show_start_time_utc": "2019-05-12T12:00:00.000Z",		"show_end_time_utc": "2019-05-12T15:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.634Z",		"updated_at": "2019-05-10T02:07:58.634Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975af"	}, {		"show_details": {			"guests": [null],			"title": "Honky Tonk Heroes",			"summary": "Classic Country and New Music Steeped in That Tradition.",			"description": "<p><span style=\"font-family: Arial,sans-serif;\">Recognized as a true American tradition, It's country music from its beginnings into the future.</span></p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "honkytonk",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": ["SU"],			"repeat_start_date": "2011-04-02T12:00:00.000Z",			"frequency": 2,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": [],		"_id": "5cd4dcfe3d74d84d7ca975af-1558267200000",		"show_start_time_utc": "2019-05-19T12:00:00.000Z",		"show_end_time_utc": "2019-05-19T15:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.634Z",		"updated_at": "2019-05-10T02:07:58.634Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975af"	}, {		"show_details": {			"guests": [null],			"title": "Honky Tonk Heroes",			"summary": "Classic Country and New Music Steeped in That Tradition.",			"description": "<p><span style=\"font-family: Arial,sans-serif;\">Recognized as a true American tradition, It's country music from its beginnings into the future.</span></p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "honkytonk",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": ["SU"],			"repeat_start_date": "2011-04-02T12:00:00.000Z",			"frequency": 2,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": [],		"_id": "5cd4dcfe3d74d84d7ca975af-1558872000000",		"show_start_time_utc": "2019-05-26T12:00:00.000Z",		"show_end_time_utc": "2019-05-26T15:00:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.634Z",		"updated_at": "2019-05-10T02:07:58.634Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975af"	}, {		"show_details": {			"guests": [null],			"title": "Restless Mornings",			"summary": "The proving ground for new talent",			"description": "<p><span style=\"font-family: Arial,sans-serif;\">Anything can happen as new DJs get their chops behind the mixing board.<br /></span></p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "restless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": ["SU", "WE", "TH", "FR", "SA", "MO", "TU"],			"repeat_start_date": "2011-03-27T09:00:00.000Z",			"frequency": 2,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2011-06-11T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ae-1556874000000",		"show_start_time_utc": "2019-05-03T09:00:00.000Z",		"show_end_time_utc": "2019-05-03T11:30:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.634Z",		"updated_at": "2019-05-10T02:07:58.634Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ae"	}, {		"show_details": {			"guests": [null],			"title": "Restless Mornings",			"summary": "The proving ground for new talent",			"description": "<p><span style=\"font-family: Arial,sans-serif;\">Anything can happen as new DJs get their chops behind the mixing board.<br /></span></p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "restless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": ["SU", "WE", "TH", "FR", "SA", "MO", "TU"],			"repeat_start_date": "2011-03-27T09:00:00.000Z",			"frequency": 2,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2011-06-11T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ae-1556960400000",		"show_start_time_utc": "2019-05-04T09:00:00.000Z",		"show_end_time_utc": "2019-05-04T11:30:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.634Z",		"updated_at": "2019-05-10T02:07:58.634Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ae"	}, {		"show_details": {			"guests": [null],			"title": "Restless Mornings (Instance Version)",			"summary": "The proving ground for new talent",			"description": "<p><span style=\"font-family: Arial,sans-serif;\">Anything can happen as new DJs get their chops behind the mixing board.<br /></span></p>",			"producer": null,			"host": {				"profile": {					"first_name": "Comrad",					"last_name": "Develpment"				},				"station": {					"on_air_name": null				},				"_id": "5cd4dc5c3d74d84d7ca795b5"			},			"custom": {				"record_audio": "1",				"url": "restless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": ["SU", "WE", "TH", "FR", "SA", "MO", "TU"],			"repeat_start_date": "2019-05-05T09:00:00.000Z",			"frequency": 2,			"repeat_end_date": "2019-05-05T11:30:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2011-06-11T00:00:00.000Z"],		"_id": "5cd5fe322eac560324dff298",		"show_start_time_utc": "2019-05-05T09:00:00.000Z",		"show_end_time_utc": "2019-05-05T11:30:00.000Z",		"is_recurring": false,		"created_at": "2019-05-10T22:41:54.945Z",		"updated_at": "2019-05-10T22:41:54.945Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ae",		"replace_show_date": "2019-05-05T09:00:00.000Z"	}, {		"show_details": {			"guests": [null],			"title": "Restless Mornings",			"summary": "The proving ground for new talent",			"description": "<p><span style=\"font-family: Arial,sans-serif;\">Anything can happen as new DJs get their chops behind the mixing board.<br /></span></p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "restless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": ["SU", "WE", "TH", "FR", "SA", "MO", "TU"],			"repeat_start_date": "2011-03-27T09:00:00.000Z",			"frequency": 2,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2011-06-11T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ae-1557133200000",		"show_start_time_utc": "2019-05-06T09:00:00.000Z",		"show_end_time_utc": "2019-05-06T11:30:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.634Z",		"updated_at": "2019-05-10T02:07:58.634Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ae"	}, {		"show_details": {			"guests": [null],			"title": "Restless Mornings (Instance Version)",			"summary": "The proving ground for new talent",			"description": "<p><span style=\"font-family: Arial,sans-serif;\">Anything can happen as new DJs get their chops behind the mixing board.<br /></span></p>",			"producer": null,			"host": {				"profile": {					"first_name": "Comrad",					"last_name": "Develpment"				},				"station": {					"on_air_name": null				},				"_id": "5cd4dc5c3d74d84d7ca795b5"			},			"custom": {				"record_audio": "1",				"url": "restless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": ["SU", "WE", "TH", "FR", "SA", "MO", "TU"],			"repeat_start_date": "2019-05-07T09:00:00.000Z",			"frequency": 2,			"repeat_end_date": "2019-05-07T11:30:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2011-06-11T00:00:00.000Z"],		"_id": "5cd5fe262eac560324dff297",		"show_start_time_utc": "2019-05-07T09:00:00.000Z",		"show_end_time_utc": "2019-05-07T11:30:00.000Z",		"is_recurring": false,		"created_at": "2019-05-10T22:41:42.608Z",		"updated_at": "2019-05-10T22:41:42.608Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ae",		"replace_show_date": "2019-05-07T09:00:00.000Z"	}, {		"show_details": {			"guests": [null],			"title": "Restless Mornings",			"summary": "The proving ground for new talent",			"description": "<p><span style=\"font-family: Arial,sans-serif;\">Anything can happen as new DJs get their chops behind the mixing board.<br /></span></p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "restless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": ["SU", "WE", "TH", "FR", "SA", "MO", "TU"],			"repeat_start_date": "2011-03-27T09:00:00.000Z",			"frequency": 2,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2011-06-11T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ae-1557306000000",		"show_start_time_utc": "2019-05-08T09:00:00.000Z",		"show_end_time_utc": "2019-05-08T11:30:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.634Z",		"updated_at": "2019-05-10T02:07:58.634Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ae"	}, {		"show_details": {			"guests": [null],			"title": "Restless Mornings",			"summary": "The proving ground for new talent",			"description": "<p><span style=\"font-family: Arial,sans-serif;\">Anything can happen as new DJs get their chops behind the mixing board.<br /></span></p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "restless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": ["SU", "WE", "TH", "FR", "SA", "MO", "TU"],			"repeat_start_date": "2011-03-27T09:00:00.000Z",			"frequency": 2,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2011-06-11T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ae-1557392400000",		"show_start_time_utc": "2019-05-09T09:00:00.000Z",		"show_end_time_utc": "2019-05-09T11:30:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.634Z",		"updated_at": "2019-05-10T02:07:58.634Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ae"	}, {		"show_details": {			"guests": [null],			"title": "Restless Mornings",			"summary": "The proving ground for new talent",			"description": "<p><span style=\"font-family: Arial,sans-serif;\">Anything can happen as new DJs get their chops behind the mixing board.<br /></span></p>",			"producer": null,			"host": null,			"custom": {				"record_audio": "1",				"url": "restless",				"source": "KGNU"			}		},		"repeat_rule": {			"byweekday": ["SU", "WE", "TH", "FR", "SA", "MO", "TU"],			"repeat_start_date": "2011-03-27T09:00:00.000Z",			"frequency": 2,			"repeat_end_date": "9999-01-01T07:00:00.000Z"		},		"status": "active",		"exclude_dates": ["2015-02-18T00:00:00.000Z", "2011-06-11T00:00:00.000Z"],		"_id": "5cd4dcfe3d74d84d7ca975ae-1557478800000",		"show_start_time_utc": "2019-05-10T09:00:00.000Z",		"show_end_time_utc": "2019-05-10T11:30:00.000Z",		"is_recurring": true,		"created_at": "2019-05-10T02:07:58.634Z",		"updated_at": "2019-05-10T02:07:58.634Z",		"__v": 0,		"master_show_uid": "5cd4dcfe3d74d84d7ca975ae"	}];

    //if date provided in properties, always have the calendar display that date
    let calendarDateProperty = typeof date == 'undefined' ? {} : { date: date };

    const formats = {
      eventTimeRangeFormat: function(data) {
        const { start } = data;
        let timeString = '';
        let minutesString =
          start.getMinutes() < 10
            ? '0' + start.getMinutes()
            : start.getMinutes();
        if (start.getHours() == 0) {
          timeString = '12:' + minutesString;
        } else if (start.getHours() < 12) {
          timeString = start.getHours() + ':' + minutesString;
        } else if (start.getHours() == 12) {
          timeString = '12:' + minutesString;
        } else if (start.getHours() >= 12) {
          timeString = start.getHours() - 12 + minutesString;
        }
        return timeString;
      },
    };

    return (
      <div className="traffic-calendar">
        <BigCalendar
          selectable
          localizer={localizer}
          events={events}
          formats={formats}
          defaultView={BigCalendar.Views.WEEK}
          defaultDate={new Date()}
          {...calendarDateProperty}
          titleAccessor={show => show.show_details.title}
          startAccessor={show => this.startAccessorCalc(show)}
          endAccessor={show => this.endAccessorCalc(show)}
          eventPropGetter={this.eventStyleGetter}
          slotPropGetter={this.slotPropGetter}
          onNavigate={date => this.handleNavigate(date)}
          step="10"
          components={{
            eventWrapper: this.customEventWrapper,
          }}
        />
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  {},
)(TrafficCalendar);
