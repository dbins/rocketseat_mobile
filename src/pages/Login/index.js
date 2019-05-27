import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StatusBar, Alert } from "react-native";
import PropTypes from "prop-types";

import { Container, Logo, Form, Screen } from "./styles";
import SignInActions from "../../store/ducks/signIn";

import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import TextButton from "../../components/TextButton";
import Warning from "../../components/Warning";

import validacao from "../../util";

class Login extends Component {
  static propTypes = {
    signInRequest: PropTypes.func.isRequired,
    navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
    error: PropTypes.bool,
    loading: PropTypes.bool
  };

  state = {
    email: "",
    password: ""
  };

  signIn = () => {
    const { email, password } = this.state;
    const { signInRequest } = this.props;
    let continuar = true;
    let mensagem = "";
    if (email == "" || password == "") {
      continuar = false;
      mensagem = "Por favor informe o e-mail e a senha!";
    } else {
      if (!validacao.email_validate(email)) {
        continuar = false;
        mensagem = "O e-mail digitado é inválido";
      }
    }
    if (continuar) {
      signInRequest(email, password);
    } else {
      Alert.alert("LOGIN", mensagem, [{ text: "FECHAR" }], {
        cancelable: false
      });
    }
  };

  render() {
    const { email, password } = this.state;
    const { navigation, loading } = this.props;
    return (
      <Screen>
        <StatusBar barStyle="light-content" />
        <Container>
          <Logo>M</Logo>
          <Form>
            <FormInput
              label="E-mail"
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={value => this.setState({ email: value })}
            />
            <FormInput
              label="Senha"
              placeholder="Sua senha secreta"
              value={password}
              secureTextEntry
              onChangeText={value => this.setState({ password: value })}
            />
            <Button onPress={this.signIn} loading={loading}>
              Entrar
            </Button>
            <TextButton onPress={() => navigation.navigate("Cadastro")}>
              Criar conta grátis
            </TextButton>
            {this.props.error && (
              <Warning>Houve um erro ao tentar fazer login!</Warning>
            )}
          </Form>
        </Container>
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.signIn.loading,
  error: state.signIn.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(SignInActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
