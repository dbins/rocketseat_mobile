import React from "react";
import PropTypes from "prop-types";

import { ActivityIndicator } from "react-native";
import { colors } from "../../styles";
import { Container, Text } from "./styles";

const Button = ({ children, onPress, loading }) => (
  <Container onPress={onPress}>
    {loading ? (
      <ActivityIndicator size="small" color={colors.white} />
    ) : (
      <Text>{children}</Text>
    )}
  </Container>
);

Button.defaultProps = {
  loading: false
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default Button;
