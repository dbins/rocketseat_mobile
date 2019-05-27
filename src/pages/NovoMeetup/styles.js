import styled from "styled-components/native";
import { colors } from "../../styles";

import Icon from "react-native-vector-icons/FontAwesome5";

export const Container = styled.ScrollView`
  padding: 30px 20px;
  background-color: ${colors.background};
`;

export const SectionTitle = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: ${colors.white};
  margin: 20px 0px;
`;

export const Label = styled.Text`
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  color: ${colors.white};
  margin: 20px 0px;
`;

export const Screen = styled.ScrollView`
  flex: 1;
`;

export const ImageUploadContainer = styled.View`
  height: 80px;
  border: 1px dashed ${colors.whiteTransparent};
  justify-content: center;
  align-items: center;
`;

export const PictureIcon = styled(Icon)`
  color: ${colors.white};
`;

export const ButtonContainer = styled.View`
  margin-bottom: 60px;
`;
