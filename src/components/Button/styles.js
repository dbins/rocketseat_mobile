import styled from "styled-components/native";
import { colors } from "../../styles";

export const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 50px;
  border-radius: 25px;
  background-color: ${colors.primary};
`;

export const Text = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  font-weight: bold;
`;
