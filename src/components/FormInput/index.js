import React from "react";
import { PropTypes } from "prop-types";

import { Container, Label, Input } from "./styles";

const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  small,
  multiline,
  numberOfLines
}) => (
  <Container small>
    <Label small={small}>{label}</Label>
    <Input
      small={small}
      underlineColorAndroid="transparent"
      autoCapitalize="none"
      autoCorrect={false}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      numberOfLines={numberOfLines}
    />
  </Container>
);

FormInput.defaultProps = {
  onChangeText: () => {},
  secureTextEntry: false,
  small: false,
  multiline: false,
  numberOfLines: 1
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  value: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  small: PropTypes.bool,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number
};

export default FormInput;
