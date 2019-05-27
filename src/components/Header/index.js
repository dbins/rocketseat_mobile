import React from "react";
import { StatusBar } from "react-native";
import PropTypes from "prop-types";
import { Container, LeftItem, Title, RightItem, CustomIcon } from "./styles";
import { withNavigation } from "react-navigation";

const Header = ({ navigation, back, title }) => (
  <Container>
    <StatusBar barStyle="light-content" />

    <LeftItem>
      {back && (
        <CustomIcon
          name="chevron-left"
          size={16}
          onPress={() => navigation.goBack()}
        />
      )}
    </LeftItem>

    <Title>{title}</Title>
    <RightItem>
      <CustomIcon
        name="user"
        size={16}
        onPress={() => navigation.navigate("Perfil")}
      />
    </RightItem>
  </Container>
);

Header.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
  title: PropTypes.string,
  back: PropTypes.bool
};

export default withNavigation(Header);
