import styled from "styled-components/native";
import { colors } from "../../styles";

export const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: ${colors.whiteTransparent};
`;
