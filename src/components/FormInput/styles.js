import styled from "styled-components/native";
import { colors } from "../../styles";

export const Container = styled.View`
  margin-bottom: ${props => (props.small ? 20 : 40)}px;
  margin-top: 5px;
`;

export const Label = styled.Text`
  color: ${colors.white};
  font-size: ${props => (props.small ? 16 : 18)}px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 5px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.whiteTransparent
})`
  color: ${colors.light};
  font-size: ${props => (props.small ? 18 : 20)}px;
`;
