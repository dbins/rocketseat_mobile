import React from "react";
import PropTypes from "prop-types";

import { Container, Text } from "./styles";

const Warning = ({ children }) => (
  <Container>
    <Text>{children}</Text>
  </Container>
);

Warning.propTypes = {
  children: PropTypes.string.isRequired
};

export default Warning;
