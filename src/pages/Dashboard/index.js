import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome5";
import PropTypes from "prop-types";

import Header from "../../components/Header";
import List from "../../components/List";
import UserMeetupsActions from "../../store/ducks/userMeetups";
import PreferencesActions from "../../store/ducks/preferences";
import { ActivityIndicator, RefreshControl } from "react-native";
import {
  Container,
  SectionTitle,
  LoadingContainer,
  EmptyStateContainer,
  Screen,
  EmptyStateText
} from "./styles";

const TabIcon = ({ tintColor }) => (
  <Icon name="home" size={20} color={tintColor} />
);

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

class Dashboard extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon
  };

  static propTypes = {
    meetupsData: PropTypes.objectOf(PropTypes.array).isRequired,
    user: PropTypes.shape({
      id: PropTypes.number
    }).isRequired,
    loadUserMeetupsRequest: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const { loadUserMeetupsRequest, user } = this.props;
    loadUserMeetupsRequest(user.id);
    const { loadPreferencesRequest } = this.props;
    loadPreferencesRequest();
  }

  renderMeetups = (meetupsData, meetupsType, inscricao) =>
    meetupsData[meetupsType].length > 0 ? (
      <List horizontal data={meetupsData[meetupsType]} inscricao={inscricao} />
    ) : (
      <EmptyStateContainer>
        <EmptyStateText>Nenhum meetup encontrado.</EmptyStateText>
      </EmptyStateContainer>
    );

  refreshItems = () => {
    const { loadUserMeetupsRequest, user } = this.props;

    loadUserMeetupsRequest(user.id);
  };

  render() {
    const { meetupsData, loading } = this.props;
    return (
      <Screen>
        <Header title="Início" />
        <Container
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this.refreshItems}
            />
          }
        >
          <SectionTitle>Inscrições</SectionTitle>
          {loading ? (
            <LoadingContainer>
              <ActivityIndicator size="small" color="#fff" />
            </LoadingContainer>
          ) : (
            this.renderMeetups(meetupsData, "registrations", false)
          )}

          <SectionTitle>Próximos meetups</SectionTitle>
          {loading ? (
            <LoadingContainer>
              <ActivityIndicator size="small" color="#fff" />
            </LoadingContainer>
          ) : (
            this.renderMeetups(meetupsData, "next", true)
          )}

          <SectionTitle>Recomendados</SectionTitle>
          {loading ? (
            <LoadingContainer>
              <ActivityIndicator size="small" color="#fff" />
            </LoadingContainer>
          ) : (
            this.renderMeetups(meetupsData, "recomended", true)
          )}
        </Container>
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  meetupsData: state.userMeetups.data,
  loading: state.userMeetups.loading,
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...UserMeetupsActions, ...PreferencesActions },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
