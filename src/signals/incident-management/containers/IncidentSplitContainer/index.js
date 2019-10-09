import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { Row, Column, Heading } from '@datapunt/asc-ui';
import { goBack } from 'react-router-redux';
import styled from '@datapunt/asc-core';

import { makeSelectCategories } from 'containers/App/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import LoadingIndicator from 'shared/components/LoadingIndicator';
import { requestIncident, requestAttachments } from 'models/incident/actions';
import makeSelectIncidentModel from 'models/incident/selectors';

import { splitIncident } from './actions';

import reducer from './reducer';
import saga from './saga';

import SplitDetail from './components/SplitDetail';
import SplitForm from './components/SplitForm';

const StyledH1 = styled(Heading)`
  font-weight: normal;
  margin-bottom: 30px;
`;

const StyledWrapper = styled.div`
  min-height: 800px;
`;


export class IncidentSplitContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.props.onRequestIncident(this.props.id);
    this.props.onRequestAttachments(this.props.id);
  }

  handleSubmit(splitForm) {
    this.props.onSplitIncident(splitForm);
  }

  handleCancel() {
    this.props.onGoBack();
  }

  render() {
    const { categories } = this.props;
    const { incident, attachments, loading, stadsdeelList, priorityList } = this.props.incidentModel;
    return (
      <StyledWrapper>
        <Row>
          {loading ? <LoadingIndicator /> :
          <Fragment>
            <Column span={12}>
              <StyledH1 $as="h1">Splitsen</StyledH1>
            </Column>

            <Column
              span={7}
            >
              <SplitForm
                incident={incident}
                attachments={attachments}
                subcategories={categories.sub}
                priorityList={priorityList}
                handleSubmit={this.handleSubmit}
                handleCancel={this.handleCancel}
              />
            </Column>
            <Column
              span={4}
              push={1}
            >
              <SplitDetail
                incident={incident}
                stadsdeelList={stadsdeelList}
              />
            </Column>
          </Fragment>
          }
        </Row>
      </StyledWrapper>
    );
  }
}

IncidentSplitContainer.propTypes = {
  id: PropTypes.string.isRequired,
  categories: PropTypes.object,
  incidentModel: PropTypes.object,
  onRequestIncident: PropTypes.func.isRequired,
  onRequestAttachments: PropTypes.func.isRequired,
  onSplitIncident: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  incidentModel: makeSelectIncidentModel(),
  categories: makeSelectCategories()
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  onRequestIncident: requestIncident,
  onRequestAttachments: requestAttachments,
  onSplitIncident: splitIncident,
  onGoBack: goBack
}, dispatch);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'incidentSplitContainer', reducer });
const withSaga = injectSaga({ key: 'incidentSplitContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(IncidentSplitContainer);
