import React, { Component } from "react";
import { Alert } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "../../components/Button";
import CheckBox from "../../components/Checkbox";
import FormInput from "../../components/FormInput";
import Header from "../../components/Header";
import Warning from "../../components/Warning";
import PreferencesActions from "../../store/ducks/preferences";
import UserActions from "../../store/ducks/user";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Container, Title, Screen } from "./styles";

const TabIcon = ({ tintColor }) => (
  <Icon name="plus-square" size={20} color={tintColor} />
);

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

class Perfil extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon
  };

  static propTypes = {
    preferences: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        type: PropTypes.string
      })
    ).isRequired,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }).isRequired,
    updateUserRequest: PropTypes.func.isRequired,
    loadPreferencesRequest: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      name: props.user.username,
      email: props.user.email,
      checkboxItems: {},
      password: "",
      passwordConfirmation: "",
      checkboxes_preference: []
    };
  }

  componentDidMount() {
    //const { loadPreferencesRequest } = this.props;
    //loadPreferencesRequest();
    //Marcar as preferencias gravadas
    console.tron.log("DIDMOUNT");
    console.tron.log(this.props.user);
    console.tron.log(this.props.user.preferences);
    this.savedCheckboxes();
  }

  savedCheckboxes() {
    const { checkboxItems } = this.state;
    const { preferences } = this.props;
    console.tron.log("estou aqui");
    console.tron.log(preferences);
    if (!Object.keys(checkboxItems).length) {
      preferences.forEach(item => {
        let var_checked = false;
        this.props.user.preferences.forEach(item2 => {
          if (item.id == item2.id) {
            var_checked = true;
          }
        });
        checkboxItems[item.id] = { isChecked: var_checked };
      });
    }
    console.tron.log(checkboxItems);
    this.setState({ checkboxItems });
  }

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
    const { updateUserRequest } = this.props;
    const { checkboxItems, name, password, passwordConfirmation } = this.state;
    let continuar = true;
    let mensagem = "";
    const selectedPreferences = [];

    Object.keys(checkboxItems).forEach(key => {
      if (checkboxItems[key].isChecked) {
        selectedPreferences.push(key);
      }
    });

    if (name == "") {
      continuar = false;
      mensagem = "Por favor informe seu nome!";
    } else {
      let validar_senha = true;
      if (password == "") {
        validar_senha = false;
        continuar = false;
        mensagem = "Por favor informe sua senha!";
      } else {
        if (passwordConfirmation == "") {
          validar_senha = false;
          continuar = false;
          mensagem = "Por favor informe a confirmação de senha!";
        }
      }
      if (validar_senha) {
        if (password != passwordConfirmation) {
          continuar = false;
          mensagem = "A senha e a confirmação de senha devem ser iguais!";
        }
      }
    }

    if (selectedPreferences.length == 0) {
      continuar = false;
      mensagem = "Você precisa selecionar pelo menos 1 preferência!";
    }

    if (continuar) {
      const userPreferences = {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        preferences: selectedPreferences
      };

      updateUserRequest(userId, userPreferences);
    } else {
      Alert.alert("PERFIL", mensagem, [{ text: "FECHAR" }], {
        cancelable: false
      });
    }
  };

  render() {
    const { preferences, loading, user } = this.props;
    const { checkboxItems, name, password, passwordConfirmation } = this.state;

    return (
      <Screen>
        <Header title="Perfil" back={true} />
        <Container>
          <FormInput
            small
            label={"Nome"}
            placeholder=""
            value={name}
            clearTextOnFocus
            onChangeText={value => this.setState({ name: value })}
          />
          <FormInput
            small
            label="Senha"
            placeholder="Sua senha secreta"
            value={password}
            clearTextOnFocus
            secureTextEntry
            onChangeText={value => this.setState({ password: value })}
          />
          <FormInput
            small
            label="Confirmação de senha"
            placeholder="Sua senha secreta"
            value={passwordConfirmation}
            clearTextOnFocus
            secureTextEntry
            onChangeText={value =>
              this.setState({ passwordConfirmation: value })
            }
          />
          <Title>Preferências</Title>
          <CheckBox
            items={preferences}
            checkboxItems={checkboxItems}
            onItemClick={this.onItemClick}
          />
          <Button
            children={"Continuar"}
            onPress={() => this.saveUserPreferences(user.id)}
            loading={loading}
          />
          {this.props.error && (
            <Warning>Houve um erro ao tentar gravar seu perfil!</Warning>
          )}
        </Container>
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  preferences: state.preferences.data,
  user: state.user.data,
  loading: state.user.loading,
  error: state.user.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...UserActions, ...PreferencesActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Perfil);
