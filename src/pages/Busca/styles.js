import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { colors } from "../../styles";
var height = Dimensions.get("window").height;

import Icon from "react-native-vector-icons/FontAwesome5";

export const Container = styled.View`
  padding: 40px 30px 40px;
  background-color: ${colors.background};
  height: ${height};
`;

export const SearchBarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.lighterWhiteTransparent};
  border-radius: 4px;
  height: 50px;
  padding: 0px 10px;
  margin-bottom: 20px;
`;

export const SearchIcon = styled(Icon)`
  color: ${colors.darkerWhiteTransparent};
  margin-right: 10px;
`;

export const SearchText = styled.TextInput`
  font-size: 18px;
  color: ${colors.darkerWhiteTransparent};
`;

export const EmptyStateContainer = styled.View`
  margin-top: 30px;
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
