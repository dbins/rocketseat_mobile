import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { colors } from "../../styles";
var screen_height = Dimensions.get("window").height;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 30px;
  height: ${screen_height};
  background-color: ${colors.background};
`;

export const Form = styled.View`
  width: 100%;
  margin-top: 30px;
`;

export const Screen = styled.View`
  flex: 1;
`;

export const Logo = styled.Text`
  color: ${colors.primary};
  font-size: 48px;
  font-weight: 500;
`;
