import styled from "styled-components/native";
import { colors } from "../../styles";
import CheckBox from "react-native-check-box";

export const Container = styled.View`
  margin-bottom: 16px;
`;

export const CheckBoxItem = styled(CheckBox).attrs({
  checkedCheckBoxColor: colors.primary,
  uncheckedCheckBoxColor: colors.darkerWhiteTransparent,
  rightTextStyle: {
    fontSize: 18,
    color: colors.white
  }
})`
  margin-bottom: 14px;
  border: 0;
`;

export const CheckedImage = styled.View`
  height: 20px;
  width: 20px;
  background-color: ${colors.primary};
  border-radius: 4px;
`;

export const UncheckedImage = styled.View`
  height: 20px;
  width: 20px;
  background-color: ${colors.lighterWhiteTransparent};
  border-radius: 4px;
`;
