import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StatusBar, Alert } from "react-native";
import PropTypes from "prop-types";

import Button from "../../components/Button";
import CheckBox from "../../components/Checkbox";
import Warning from "../../components/Warning";
import UserActions from "../../store/ducks/user";

import { Container, Greeting, Description, Title, Screen } from "./styles";

class Preferencias extends Component {
  static propTypes = {
    preferences: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        type: PropTypes.string
      })
    ).isRequired,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string
    }).isRequired,
    updateUserRequest: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
  };

  state = {
    checkboxItems: {}
  };

  onItemClick = itemId => {
    const { checkboxItems } = this.state;

    if (!Object.keys(checkboxItems).length) {
      const { preferences } = this.props;
      preferences.forEach(item => {
        checkboxItems[item.id] = { isChecked: false };
      });
    }

    checkboxItems[itemId].isChecked = !checkboxItems[itemId].isChecked;
    this.setState({ checkboxItems });
  };

  saveUserPreferences = userId => {
    const { updateUserRequest, user } = this.props;
    const { checkboxItems } = this.state;

    const selectedPreferences = [];

    Object.keys(checkboxItems).forEach(key => {
      if (checkboxItems[key].isChecked) {
        selectedPreferences.push(key);
      }
    });

    if (selectedPreferences.length > 0) {
      const userPreferences = {
        preferences: selectedPreferences
      };
      updateUserRequest(userId, userPreferences);
    } else {
      Alert.alert(
        "PREFERÊNCIAS",
        "Você precisa selecionar pelo menos 1 preferência!",
        [{ text: "FECHAR" }],
        {
          cancelable: false
        }
      );
    }
  };

  render() {
    const { preferences, user, loading } = this.props;
    const { checkboxItems } = this.state;
    return (
      <Screen>
        <StatusBar barStyle="light-content" />
        <Container>
          <Greeting>Olá,{user.username}</Greeting>
          <Description>
            Parece que é seu primeiro acesso por aqui, comece escolhendo algumas
            preferências para selecionarmos os melhores meetups pra você:
          </Description>
          <Title>Preferências</Title>
          <CheckBox
            items={preferences}
            checkboxItems={checkboxItems}
            onItemClick={this.onItemClick}
          />
          <Button
            onPress={() => this.saveUserPreferences(user.id)}
            loading={loading}
          >
            Continuar
          </Button>
          {this.props.error && (
            <Warning>Houve um erro ao tentar gravar suas preferências!</Warning>
          )}
        </Container>
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  preferences: state.preferences.data,
  loading: state.signIn.loading,
  user: state.user.data,
  error: state.signIn.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preferencias);
