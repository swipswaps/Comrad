const moment = require('moment');
const { RRule } = require('rrule');
const _ = require('lodash');
const db = require('../../../models');
const keys = require('../../../config/keys');

const {
  master_time_id,
  master_time_id__byShowType,
} = require('./utils__mongoose');

function getModelForEventType(eventType) {
  switch (eventType) {
    case 'shows':
      return db.Show;
    case 'traffic':
      return db.Traffic;
    default:
      return null;
  }
}

function showList(shows, startDate, endDate) {
  //Perform this check as the create route is an object, and the find route is an array.
  //This makes sure everything is an iterable array before going into the reducers.
  if (!Array.isArray(shows)) {
    shows = [shows];
  }
  //Filter all shows that are series
  const allSeriesShows = reduceShowsByRepeatProperty(shows, true);

  const allSeriesShowsExpanded = allSeriesShows.map(show => {
    return allShowInstancesInDateRange(show, startDate, endDate);
  });

  //Filter all shows that are instances
  const allInstanceShows = reduceShowsByRepeatProperty(shows, false);
  const allInstanceShowsExpanded = returnInstanceShowsArray(allInstanceShows);

  //Replace repeat shows with instance shows here
  const seriesFlattened = _.flatten(allSeriesShowsExpanded);
  const seriesKeyBy = _.keyBy(seriesFlattened, 'master_time_id');

  const instanceKeyBy = _.keyBy(allInstanceShowsExpanded, o => {
    return o.master_time_id;
  });

  //Combined series and instance shows by object ID and then return the final array
  let showsToReturn = { ...seriesKeyBy, ...instanceKeyBy };

  //transform the object back to an array
  let showsToReturnArray = [];
  _.mapKeys(showsToReturn, function(show) {
    if (show.status === 'active') {
      showsToReturnArray.push(show);
    }
  });

  //sort the array by event start time
  showsToReturnArray = showsToReturnArray.sort(function(a, b) {
    if (new Date(a.start_time_utc) > new Date(b.start_time_utc)) {
      return 1;
    } else if (new Date(a.start_time_utc) === new Date(b.start_time_utc)) {
      return 0;
    } else {
      return -1;
    }
  });

  return showsToReturnArray;
}

function allShowInstancesInDateRange(show, startDate, endDate) {
  const allShowDates = returnDatesArrayByRepeatRule(show, startDate, endDate);
  const allSeriesShowsExpandedByDates = returnSeriesShowsArrayWithNewDates(
    allShowDates,
    show,
  );

  return allSeriesShowsExpandedByDates;
}

function createRRule(show) {
  const { replace_event_date } = show;
  const {
    frequency,
    repeat_start_date,
    repeat_end_date,
    interval,
    count,
    byweekday,
    bymonth,
    bysetpos,
    bymonthday,
  } = show.repeat_rule;

  let newRRule = {};

  if (frequency) {
    newRRule.freq = frequency;
  }

  if (repeat_start_date != null) {
    newRRule.dtstart = new Date(repeat_start_date);
  } else if (replace_event_date != null) {
    newRRule.dtstart = new Date(replace_event_date);
  }

  if (repeat_end_date != null) {
    newRRule.until = new Date(repeat_end_date);
  } else if (replace_event_date != null) {
    newRRule.until = new Date(replace_event_date);
  }

  if (count) {
    newRRule.count = count;
  }

  if (interval) {
    newRRule.interval = interval;
  }

  if (byweekday) {
    newRRule.byweekday = byweekday.map(day => {
      return RRule[day];
    });
  }

  if (bymonth) {
    newRRule.bymonth = [bymonth];
  }

  if (bysetpos) {
    newRRule.bysetpos = [bysetpos];
  }

  if (bymonthday) {
    newRRule.bymonthday = [bymonthday];
  }

  newRRule.tzid = keys.stationTimeZone;

  return newRRule;
}

function reduceShowsByRepeatProperty(shows, recurringCheckValue) {
  const reducer = (accShows, currentShow) => {
    if (
      currentShow.is_recurring === recurringCheckValue ||
      (currentShow.is_recurring === undefined && recurringCheckValue === false)
    ) {
      return [...accShows, currentShow];
    }
    return accShows;
  };

  const reducedShowList = shows.reduce(reducer, []);

  return reducedShowList;
}

function returnDatesArrayByRepeatRule(show, startDate, endDate) {
  const rule = new RRule(createRRule(show));
  try {
    let showDuration = show.end_time_utc - show.start_time_utc;
    let adjustedStartDate = new Date(
      moment(startDate).add(-1 * showDuration, 'milliseconds'),
    ); //between searches on START times, and we want to get anything in progress in this date range, so subtract the show duration from the start time
    let shows = rule.between(adjustedStartDate, new Date(endDate));

    return shows;
  } catch (e) {
    console.log('Error in returnDatesArrayByRepeatRule');
    console.log(e);
    return null;
  }
}

function combineDayAndTime(
  desiredDate,
  desiredTime,
  format = 'MOMENT',
  type = 'START',
) {
  const desiredTime__hours = moment(desiredTime).hours();
  const desiredTime__minutes = moment(desiredTime).minutes();
  const desiredDate__hours = moment(desiredDate).hours();
  const desiredDate__minutes = moment(desiredDate).minutes();

  let returnedValue = null;

  if (
    //Both date and time happen at midnight, so need to subtract 1 minute
    type === 'END' &&
    desiredTime__hours === 0 &&
    desiredTime__minutes === 0 &&
    desiredDate__hours === 0 &&
    desiredDate__minutes === 0
  ) {
    returnedValue = moment(desiredDate)
      .subtract(1, 'minute')
      .seconds(0)
      .utc();
  } else if (
    //Only Time is at midnight, so take date and set 1 minute before midnight
    type === 'END' &&
    desiredTime__hours === 0 &&
    desiredTime__minutes === 0
  ) {
    returnedValue = moment(desiredDate)
      .hours(23)
      .minutes(59)
      .seconds(0)
      .utc();
  } else {
    //Neither date or time is at midnight, so set hours
    returnedValue = moment(desiredDate)
      .hours(desiredTime__hours)
      .minutes(desiredTime__minutes)
      .seconds(0)
      .utc();
  }

  if (format === 'MOMENT') {
    return returnedValue;
  } else if (format === 'STRING') {
    return returnedValue.format();
  } else {
    console.error('Date string format does not exist in case check');
    return null;
  }
}

function returnSeriesShowsArrayWithNewDates(dateArray, show) {
  const returnedShows = dateArray.map((date, i) => {
    let newShow = { ...show.toObject() };
    let { start_time_utc, end_time_utc } = newShow;

    start_time_utc = combineDayAndTime(date, start_time_utc, 'STRING');

    end_time_utc = combineDayAndTime(date, end_time_utc, 'STRING', 'END');

    end_time_utc = combineDayAndTime(date, end_time_utc, 'STRING', 'END');

    const series_event_id = newShow._id;
    newShow = { ...newShow, master_event_id: { _id: series_event_id } };
    newShow.master_time_id = master_time_id(series_event_id, start_time_utc);

    newShow.start_time_utc = start_time_utc;
    newShow.end_time_utc = end_time_utc;
    return newShow;
  });
  return returnedShows;
}

function returnInstanceShowsArray(shows) {
  const allInstances = shows.map(show => {
    let instanceShow = { ...show.toObject() };
    const { master_event_id } = instanceShow;

    //This will merge any show details from the master show that are not on the instance.
    if (master_event_id) {
      instanceShow.show_details = {
        ...instanceShow.master_event_id.show_details,
        ...instanceShow.show_details,
      };
    }

    const date = instanceShow.start_time_utc;

    //Update properties of the instance show
    instanceShow.start_time_utc = combineDayAndTime(
      date,
      instanceShow.start_time_utc,
      'STRING',
    );
    instanceShow.end_time_utc = combineDayAndTime(
      date,
      instanceShow.end_time_utc,
      'STRING',
      'END',
    );

    instanceShow.master_event_id = master_event_id ? master_event_id : null;
    instanceShow.master_time_id = master_time_id__byShowType(instanceShow);

    return instanceShow;
  });
  return allInstances;
}

module.exports = {
  allShowInstancesInDateRange,
  getModelForEventType,
  showList,
};
