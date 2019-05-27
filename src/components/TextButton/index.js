import React from "react";
import PropTypes from "prop-types";

import { Container, Text } from "./styles";

const TextButton = ({ children, onPress }) => (
  <Container onPress={onPress}>
    <Text>{children}</Text>
  </Container>
);

TextButton.defaultProps = {
  onPress: () => {}
};

TextButton.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func
};

export default TextButton;
