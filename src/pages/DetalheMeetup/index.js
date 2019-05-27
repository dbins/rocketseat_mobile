import React, { Component } from "react";
import { View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome5";
import PropTypes from "prop-types";
import {
  StyledImage,
  Container,
  Title,
  Info,
  Description,
  Location,
  Screen,
  ButtonContainer
} from "./styles";

import Button from "../../components/Button";
import Header from "../../components/Header";
import Warning from "../../components/Warning";
import UserMeetupsActions from "../../store/ducks/userMeetups";
import moment from "moment/min/moment-with-locales";

moment.locale("pt-BR");
const TabIcon = ({ tintColor }) => (
  <Icon name="plus-square" size={20} color={tintColor} />
);

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

class DetalheMeetup extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon
  };

  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number
    }).isRequired,
    registerInMeetupRequest: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
  }

  state = {
    meetup: {},
    subscriptions: 0,
    inscricao: false
  };

  componentDidMount() {
    const { navigation } = this.props;
    const meetup = navigation.getParam("meetup", {});
    const inscricao = navigation.getParam("inscricao", {});
    this.setState({
      meetup,
      subscriptions: meetup.__meta__.subscriptions_count,
      inscricao
    });
  }

  register = meetupId => {
    const { registerInMeetupRequest, user } = this.props;

    registerInMeetupRequest(user.id, meetupId);
  };

  render() {
    const { meetup, subscriptions } = this.state;
    const { loading } = this.props;
    const dataMeetup = moment(meetup.datetime).format("LLL");
    return (
      <Screen>
        <Header title={meetup.title} back={true} />
        <StyledImage
          source={{
            uri: meetup.urlimagem
          }}
        />
        <Container>
          <Title>{meetup.title}</Title>
          <Info>{`${subscriptions} membro(s)`}</Info>
          <Description>{meetup.description}</Description>
          <Info>Realizado em:</Info>
          <Location>{meetup.location}</Location>
          <Info>Quando?</Info>
          <Location>{dataMeetup}</Location>
          {this.state.inscricao && (
            <ButtonContainer>
              <Button
                onPress={() => this.register(meetup.id)}
                loading={loading}
              >
                Inscreva-se
              </Button>
            </ButtonContainer>
          )}
          {this.props.error && (
            <Warning>Houve um erro ao tentar se inscrever no meetup!</Warning>
          )}
        </Container>
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  loading: state.userMeetups.loading,
  error: state.userMeetups.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UserMeetupsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetalheMeetup);
