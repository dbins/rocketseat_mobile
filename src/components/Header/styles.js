import styled from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { colors } from "../../styles";

export const Container = styled.View`
  height: 50px;
  padding-top: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.primary};
  padding-right: 30px;
  padding-left: 30px;
`;

export const LeftItem = styled.TouchableOpacity``;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.white};
`;

export const RightItem = styled.TouchableOpacity``;

export const CustomIcon = styled(Icon)`
  color: ${colors.white};
`;
