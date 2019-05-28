import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome5";
import PropTypes from "prop-types";

import Header from "../../components/Header";
import List from "../../components/List";
import UserMeetupsActions from "../../store/ducks/userMeetups";

import {
  Container,
  SearchBarContainer,
  SearchIcon,
  SearchText,
  EmptyStateContainer,
  Screen,
  EmptyStateText
} from "./styles";

const TabIcon = ({ tintColor }) => (
  <Icon name="search" size={20} color={tintColor} />
);

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

class Busca extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon
  };

  state = {
    mensagem: ""
  };

  static propTypes = {
    searchMeetupsRequest: PropTypes.func.isRequired,
    meetups: PropTypes.objectOf(PropTypes.array).isRequired
  };

  onChangeText = term => {
    const { searchMeetupsRequest } = this.props;

    const searchTerm = term || "";
    if (searchTerm.length > 3) {
      searchMeetupsRequest(searchTerm);
      this.setState({ mensagem: "Nenhum meetup encontrado" });
    } else {
      this.setState({ mensagem: "" });
    }
  };

  render() {
    const { meetups } = this.props;
    return (
      <Screen>
        <Header title="Busca" />
        <Container>
          <SearchBarContainer>
            <SearchIcon name="search" size={18} />
            <SearchText
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              autoCorrect={false}
              clearTextOnFocus
              placeholder="Buscar meetups"
              onChangeText={value => this.onChangeText(value)}
            />
          </SearchBarContainer>
          {meetups && meetups.search.length > 0 ? (
            <List data={meetups.search} inscricao={true} />
          ) : (
            <EmptyStateContainer>
              <EmptyStateText>{this.state.mensagem}</EmptyStateText>
            </EmptyStateContainer>
          )}
        </Container>
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  meetups: state.userMeetups.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UserMeetupsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Busca);
