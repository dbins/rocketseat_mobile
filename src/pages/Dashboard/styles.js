import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { colors } from "../../styles";
const { height } = Dimensions.get("window");

export const Container = styled.ScrollView`
  padding: 40px 60px 40px;
  background-color: ${colors.background};
`;

export const LoadingContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const SectionTitle = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${colors.white};
  margin-top: 30px;
  margin-bottom: 20px;
  padding-left: 30px;
`;

export const EmptyStateContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Screen = styled.ScrollView`
  flex: 1;
`;

export const EmptyStateText = styled.Text`
  font-size: 14px;
  color: ${colors.whiteTransparent};
`;
