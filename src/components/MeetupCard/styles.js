import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { colors } from "../../styles";

import Icon from "react-native-vector-icons/FontAwesome5";

const { width } = Dimensions.get("window");

export const Container = styled.View`
  border-radius: 4px;

  margin-bottom: ${props => (props.horizontal ? 0 : "20px;")};
  margin-right: ${props => (props.horizontal ? "20px;" : 0)};
  margin-left: ${props => (props.horizontal ? "30px;" : 0)};
  overflow: hidden;
`;

export const ImageContainer = styled.View`
  background-color: ${colors.light};
  justify-content: center;
  align-items: center;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const StyledImage = styled.Image`
  height: 130px;
  width: ${props => (props.horizontal ? "270px;" : `${width - 40}px`)};
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  background-color: ${colors.white};
  padding: 20px;
`;

export const TextContainer = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: ${colors.darker};
`;

export const LightText = styled.Text`
  font-size: 14px;
  color: ${colors.regular};
  margin-top: 5px;
`;

export const DetailsIconContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: ${colors.primary};
  margin-left: 15px;
`;

export const DetailsIcon = styled(Icon)`
  color: ${colors.white};
`;
