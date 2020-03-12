import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { alertActions, trafficActions } from '../../redux';

import Button from '../../components/Button';
import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';

class TrafficViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false,
      showEditModal: false,
    };
  }

  componentDidMount() {
    const { match, trafficActions } = this.props;
    const { masterTimeId } = match.params;

    if (!this.isDocumentLoaded()) {
      trafficActions.findById(masterTimeId);
    }
  }

  handleEditInstance = () => {
    const { history, traffic } = this.props;
    history.push('/traffic/edit/' + traffic.doc.master_time_id);
  };

  handleEditSeries = () => {
    const { history, traffic } = this.props;
    let seriesId =
      traffic.doc.master_event_id != null
        ? traffic.doc.master_event_id._id
        : traffic.doc._id;
    history.push('/traffic/edit/' + seriesId);
  };

  handleDeleteInstance = () => {
    const { alertActions, trafficActions, history, traffic } = this.props;
    trafficActions.deleteInstance(traffic.doc, function() {
      history.push('/traffic');
      alertActions.show(
        'success',
        'Success',
        'The traffic instance has been deleted',
      );
    });
  };

  handleDeleteSeries = () => {
    const { alertActions, trafficActions, history, traffic } = this.props;
    trafficActions.deleteSeries(
      traffic.doc.master_event_id != null
        ? traffic.doc.master_event_id._id
        : traffic.doc._id,
      function() {
        history.push('/traffic');
        alertActions.show(
          'success',
          'Success',
          'The traffic series has been deleted',
        );
      },
    );
  };

  isDocumentLoaded = () => {
    const { match, traffic } = this.props;
    const { doc, loading } = traffic;
    const { masterTimeId } = match.params;
    if (loading) {
      return false;
    }
    if (doc != null) {
      if (
        masterTimeId === doc.master_time_id ||
        doc._id === masterTimeId ||
        doc._id === masterTimeId.substring(0, masterTimeId.indexOf('-'))
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  render() {
    const { traffic } = this.props;
    const { doc } = traffic;

    let formattedTime = '';
    if (this.isDocumentLoaded()) {
      formattedTime = moment(doc.start_time_utc).format('ddd, MMM D h:ma');
    }

    return (
      <div className="traffic-view-page">
        {!this.isDocumentLoaded() && <Loading />}
        {this.isDocumentLoaded() && (
          <>
            <Card>
              <CardBody>
                <h1>{doc.traffic_details.title}</h1>
                {doc.master_event_id != null &&
                  doc.master_event_id._id !== doc._id && (
                    <span>
                      This instance has been modified from the other traffic
                      events in the series.
                    </span>
                  )}
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="traffic-view-page__datetime">
                  {formattedTime}
                </div>
                <div>
                  <b>Type:</b> {doc.traffic_details.type}
                </div>
                <div>
                  <b>Description:</b>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: doc.traffic_details.description,
                    }}
                  />
                </div>
                {doc.traffic_details.type === 'Feature' && (
                  <div>Producer: {doc.traffic_details.producer}</div>
                )}
                {doc.traffic_details.type === 'Underwriting' && (
                  <div>
                    Underwriter Name: {doc.traffic_details.underwriter_name}
                  </div>
                )}

                {doc.traffic_details.type === 'Giveaway' && (
                  <>
                    <div>
                      Event Name:{' '}
                      {doc.traffic_details.giveaway_details.event_name}
                    </div>
                    <div>
                      Event Date:{' '}
                      {doc.traffic_details.giveaway_details.event_date}
                    </div>
                    <div>
                      Venue: {doc.traffic_details.giveaway_details.venue}
                    </div>
                    <div>
                      Winner:
                      {doc.traffic_details.giveaway_details.no_winner && (
                        <>No Winner</>
                      )}
                      {!doc.traffic_details.giveaway_details.no_winner &&
                        (typeof doc.traffic_details.giveaway_details.winner ===
                          'undefined' ||
                          doc.traffic_details.giveaway_details.winner ===
                            null) && (
                          <>Giveaway result has not been entered yet</>
                        )}
                      {doc.traffic_details.giveaway_details.winner != null && (
                        <ul>
                          <li>
                            {doc.traffic_details_giveaway_details.winner.name}
                          </li>
                          <li>
                            {doc.traffic_details_giveaway_details.winner.phone}
                          </li>
                          <li>
                            {doc.traffic_details_giveaway_details.winner.email}
                          </li>
                          <li>
                            {
                              doc.traffic_details_giveaway_details.winner
                                .address
                            }
                          </li>
                        </ul>
                      )}
                    </div>
                  </>
                )}

                <Button
                  className="mr-1"
                  onClick={() => this.setState({ showEditModal: true })}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  onClick={() => this.setState({ showDeleteModal: true })}
                >
                  Delete
                </Button>
              </CardBody>
            </Card>
          </>
        )}
        {this.state.showDeleteModal && (
          <Modal>
            <div className="delete-traffic-modal">
              Delete only this occurrence, or the whole series of traffic
              events?
              <div>
                <Button className="mr-1" onClick={this.handleDeleteSeries}>
                  Delete Series
                </Button>
                <Button className="mr-1" onClick={this.handleDeleteInstance}>
                  Delete Instance
                </Button>
                <Button
                  color="neutral"
                  onClick={() => this.setState({ showDeleteModal: false })}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>
        )}
        {this.state.showEditModal && (
          <Modal>
            <div className="edit-traffic-modal">
              Edit only this occurrence, or the whole series of traffic events?
              <div>
                <Button className="mr-1" onClick={this.handleEditSeries}>
                  Edit Series
                </Button>
                <Button className="mr-1" onClick={this.handleEditInstance}>
                  Edit Instance
                </Button>
                <Button
                  color="neutral"
                  onClick={() => this.setState({ showEditModal: false })}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

function mapStateToProps({ traffic }) {
  return {
    traffic,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators({ ...alertActions }, dispatch),
    trafficActions: bindActionCreators({ ...trafficActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrafficViewPage);
