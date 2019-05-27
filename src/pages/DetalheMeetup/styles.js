import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { colors } from "../../styles";

const { width, height } = Dimensions.get("window");
export const StyledImage = styled.Image`
  height: 210px;
  width: ${width};
`;

export const Container = styled.ScrollView`
  padding: 30px 20px;
  background-color: ${colors.background};
  height: ${height};
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.white};
  margin-bottom: 5px;
`;

export const Screen = styled.ScrollView`
  flex: 1;
  height: ${height};
`;

export const Info = styled.Text`
  font-size: 14px;
  color: ${colors.whiteTransparent};
  margin-bottom: 10px;
`;

export const Description = styled.Text`
  font-size: 16px;
  color: ${colors.darkerWhiteTransparent};
  line-height: 28px;
  margin-bottom: 30px;
  margin-top: 10px;
`;

export const Location = styled.Text`
  font-size: 16px;
  color: ${colors.darkerWhiteTransparent};
  margin-bottom: 30px;
`;

export const ButtonContainer = styled.View`
  margin-bottom: 60px;
`;
