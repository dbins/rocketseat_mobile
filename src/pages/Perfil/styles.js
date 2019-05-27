import styled from "styled-components/native";
import { colors } from "../../styles";
import { Dimensions } from "react-native";
var height = Dimensions.get("window").height * 1.2;

export const Container = styled.View`
  padding: 30px 20px;
  background-color: ${colors.background};
`;

export const Screen = styled.ScrollView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  color: ${colors.white};
  margin-bottom: 20px;
`;
