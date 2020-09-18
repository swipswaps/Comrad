/**
 * @swagger
 *
 * /events/shows:
 *   get:
 *     tags:
 *     - Shows
 *     operationId: FindShows
 *     summary: Find
 *     security:
 *     - ApiKeyAuth: []
 *     parameters:
 *     - startDate:
 *       in: query
 *       required: true
 *       type: string
 *       format: date-time
 *       description: Retrieve events with either a start time or end time at or after this value. Should be parseable by `Date` constructor in JavaScript.
 *     - endDate:
 *       in: query
 *       required: true
 *       type: string
 *       format: date-time
 *       description: Retrieve events with either a start time or end time at or before this value. Should be parseable by `Date` constructor in JavaScript.
 *     - host:
 *       in: query
 *       required: false
 *       type: string
 *       format: id
 *       description: Return only shows hosted by the user specified by the id, or a host group containing that user
 *     - showsWithNoHost:
 *       in: query
 *       required: false
 *       type: boolean
 *       description: If true, will only return shows that have no host
 *     description: |
 *       Returns shows in a given timeframe, ordered by time from earliest to latest
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 schema:
 *                   $ref: '#/components/schemas/Show'
 *                 example:
 *                   repeat_rule:
 *                     byweekday:
 *                     - MO
 *                     - TU
 *                     - WE
 *                     - TH
 *                     - FR
 *                     repeat_start_date: '2011-03-28T15:30:00.000Z'
 *                     frequency: 2
 *                     repeat_end_date: '9999-01-01T06:00:00.000Z'
 *                   show_details:
 *                     host_type: User
 *                     guests:
 *                     -
 *                     title: Morning Sound Alternative
 *                     summary: Diverse and eclectic sounds, on the mellow side.
 *                     description: "<p>Diverse and eclectic sounds, on the mellow side. You'll hear everything
 *                       from Ambient Electronics to Reggae to Folk.</p>"
 *                     producer:
 *                     host:
 *                     custom:
 *                       my_custom_property: Custom value
 *                   status: active
 *                   _id: 5f35a6ef783e63454cd918f1
 *                   start_time_utc: '2020-09-16T15:30:00Z'
 *                   end_time_utc: '2020-09-16T18:06:00Z'
 *                   is_recurring: true
 *                   created_at: '2020-08-13T20:47:43.675Z'
 *                   updated_at: '2020-08-13T20:47:43.675Z'
 *                   __v: 0
 *                   master_event_id:
 *                     _id: 5f35a6ef783e63454cd918f1
 *                   master_time_id: 5f35a6ef783e63454cd918f1-1600270200000
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was an issue with the parameters you provided. See response for more details
 *       500:
 *         description: Server error. Check the response for more details.
 * /events/traffic:
 *   get:
 *     tags:
 *     - Traffic
 *     operationId: FindTraffic
 *     summary: Find
 *     security:
 *     - ApiKeyAuth: []
 *     parameters:
 *     - startDate:
 *       in: query
 *       required: true
 *       type: string
 *       format: date-time
 *       description: Retrieve events with either a start time or end time at or after this value. Should be parseable by `Date` constructor in JavaScript.
 *     - endDate:
 *       in: query
 *       required: true
 *       type: string
 *       format: date-time
 *       description: Retrieve events with either a start time or end time at or before this value. Should be parseable by `Date` constructor in JavaScript.
 *     - filterByTrafficType[]:
 *       in: query
 *       required: false
 *       type: array
 *       items:
 *         type: string
 *       description: Return only shows matching the specified traffic types
 *     description: |
 *       Returns traffic in a given timeframe, ordered by time from earliest to latest
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 schema:
 *                   $ref: '#/components/schemas/Traffic'
 *                 example:
 *                   _id: 5f35a719783e63454cd9a071
 *                   repeat_rule:
 *                     byweekday: []
 *                     repeat_start_date: '2011-03-29T16:00:00.000Z'
 *                     frequency: 3
 *                     repeat_end_date: '9999-01-01T06:00:00.000Z'
 *                   traffic_details:
 *                     type: Legal ID
 *                     title: Legal Id
 *                     description: '"KGNU, Boulder, Denver and Fort Collins"'
 *                     producer:
 *                     custom:
 *                       custom_property: A custom value
 *                   status: active
 *                   start_time_utc: '2020-09-16T16:00:00Z'
 *                   end_time_utc: '2020-09-16T16:01:00Z'
 *                   is_recurring: true
 *                   created_at: '2020-08-13T20:48:25.305Z'
 *                   updated_at: '2020-08-13T20:48:25.305Z'
 *                   __v: 0
 *                   MasterEvent: []
 *                   master_event_id:
 *                     _id: 5f35a719783e63454cd9a071
 *                   master_time_id: 5f35a719783e63454cd9a071-1600272000000
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was an issue with the parameters you provided. See response for more details
 *       500:
 *         description: Server error. Check the response for more details.
 */

const {
  utils: { getModelForEventType, eventList },
  utils__mongoose: {
    findEventQueryByDateRange,
    populateShowHost,
    populateMasterEvent,
    populateMasterEventShowDetails,
  },
} = require('../utils');

function find(req, res) {
  let {
    endDate,
    host,
    showsWithNoHost,
    startDate,
    filterByTrafficType,
  } = req.query;
  const { eventType } = req.params;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  if (!startDate || !endDate) {
    return res
      .status(422)
      .json({ message: 'startDate and endDate must be provided' });
  }

  //This date filter allows the same endpoint to be used to find all shows or return a subset if both startDate and endDate are provided.
  let filter = findEventQueryByDateRange(startDate, endDate);

  let promiseChain = []; // an array of promises that we will run before the main show query (in case we need to gather addt'l data for filters)

  if (host != null) {
    //only query shows where any instance or the series has the provided host
    //we will filter this list down farther after the show list has been generated
    //from the series and instances
    if (Array.isArray(host)) {
      promiseChain.push(
        dbModel.find(
          { 'show_details.host': { $in: host } },
          { _id: 1, master_event_id: 1 },
        ),
      );
    } else {
      promiseChain.push(
        dbModel.find(
          { 'show_details.host': host },
          { _id: 1, master_event_id: 1 },
        ),
      );
    }
  }

  Promise.all(promiseChain)
    .then(promiseResults => {
      if (host != null) {
        let retrieveAllInstancesForSeries = [];
        let retrieveSeries = [];
        promiseResults[0].forEach(function(val) {
          if (val.master_event_id != null) {
            retrieveSeries.push(val.master_event_id);
          } else {
            retrieveAllInstancesForSeries.push(val._id);
          }
        });

        filter = {
          $and: [
            filter,
            {
              $or: [
                //show has the host:
                {
                  'show_details.host': Array.isArray(host)
                    ? { $in: host }
                    : host,
                },
                //one of the series instance's has the matching host, we'll get the series:
                { _id: { $in: retrieveSeries } },
                //the series has the matching host, we will get all instances:
                { master_event_id: { $in: retrieveAllInstancesForSeries } },
              ],
            },
          ],
        };
      }

      const processEventResults = dbShow => {
        //populateMasterEvent
        let showResults = eventList(dbShow, startDate, endDate);
        //apply filters, if they were provided
        //these filters can't be applied on the initial query because of series + instances possibly having
        //different values. For example, if we search for a show with a host of "Sean" and a series has
        //a host of "Sean" but the June 1 instance has a host of "Josh", the instance would be excluded from the initial
        //query, and this function would incorrectly return the June 1 instance thinking it has a hos a host of "Sean"
        if (host != null) {
          showResults = showResults.filter(function(val) {
            return (
              (Array.isArray(host) &&
                val.show_details.host != null &&
                host.indexOf(String(val.show_details.host._id)) !== -1) ||
              (!Array.isArray(host) &&
                val.show_details.host != null &&
                String(val.show_details.host._id) === String(host))
            );
          });
        }

        if (showsWithNoHost === 'true') {
          showResults = showResults.filter(function(val) {
            return val.show_details.host == null;
          });
        }

        res.json(showResults);
      };

      if (filterByTrafficType != null) {
        //only query traffic with a type in the list provided by filterByTrafficType

        return dbModel
          .aggregate([
            { $match: filter },
            {
              $lookup: {
                from: 'traffics',
                localField: 'master_event_id',
                foreignField: '_id',
                as: 'MasterEvent',
              },
            },
            {
              $match: {
                $or: [
                  { 'traffic_details.type': { $in: filterByTrafficType } },
                  {
                    'MasterEvent.traffic_details.type': {
                      $in: filterByTrafficType,
                    },
                  },
                ],
              },
            },
          ])
          .then(processEventResults)
          .catch(err => {
            console.log('error in events > root > find');
            console.error(err);
            return res.status(422).json(err);
          });
      } else {
        return dbModel
          .find(filter)
          .populate(populateShowHost())
          .populate(populateMasterEvent())
          .populate(populateMasterEventShowDetails())
          .then(processEventResults)
          .catch(err => {
            console.log('error in events > root > find');
            console.error(err);
            return res.status(422).json(err);
          });
      }
    })
    .catch(err => {
      console.log('error in events > root > find');
      console.error(err);
      return res.status(422).json(err);
    });
}

module.exports = find;
