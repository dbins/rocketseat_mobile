import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StatusBar, Alert } from "react-native";
import PropTypes from "prop-types";

import { Container, Logo, Screen, Form } from "./styles";
import SignUpActions from "../../store/ducks/signUp";

import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import TextButton from "../../components/TextButton";
import Warning from "../../components/Warning";

import validacao from "../../util";

class Cadastro extends Component {
  static propTypes = {
    signUpRequest: PropTypes.func.isRequired,
    navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
    error: PropTypes.bool,
    loading: PropTypes.bool
  };

  state = {
    name: "",
    email: "",
    password: ""
  };

  signUp = () => {
    const { name, email, password } = this.state;
    const { signUpRequest } = this.props;
    let continuar = true;
    let mensagem = "";
    if (name == "" || email == "" || password == "") {
      continuar = false;
      mensagem = "Por favor informe TODOS os campos!";
    } else {
      if (!validacao.email_validate(email)) {
        continuar = false;
        mensagem = "O e-mail digitado é inválido";
      }
    }
    if (continuar) {
      signUpRequest(name, email, password);
    } else {
      Alert.alert("CADASTRO", mensagem, [{ text: "FECHAR" }], {
        cancelable: false
      });
    }
  };

  render() {
    const { name, email, password, passwordConfirmation } = this.state;
    const { navigation, loading } = this.props;
    return (
      <Screen>
        <StatusBar barStyle="light-content" />
        <Container>
          <Logo>M</Logo>
          <Form>
            <FormInput
              label="Nome"
              placeholder="Digite seu nome"
              value={name}
              onChangeText={text => this.setState({ name: text })}
            />
            <FormInput
              label="E-mail"
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={text => this.setState({ email: text.trim() })}
            />
            <FormInput
              label="Senha"
              placeholder="Sua senha secreta"
              value={password}
              secureTextEntry
              onChangeText={text => this.setState({ password: text.trim() })}
            />

            <Button onPress={this.signUp} loading={loading}>
              Criar conta
            </Button>
            <TextButton onPress={() => navigation.navigate("Login")}>
              Já tenho conta
            </TextButton>
            {this.props.error && (
              <Warning>Houve um erro ao tentar fazer cadastro!</Warning>
            )}
          </Form>
        </Container>
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.signUp.loading,
  error: state.signUp.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(SignUpActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cadastro);
