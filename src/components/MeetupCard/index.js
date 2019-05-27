import React from "react";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";

import {
  Container,
  ImageContainer,
  StyledImage,
  InfoContainer,
  TextContainer,
  Title,
  LightText,
  DetailsIconContainer,
  DetailsIcon
} from "./styles";

const MeetupCard = ({ navigation, item, horizontal, inscricao }) => (
  <Container horizontal={horizontal}>
    <ImageContainer>
      <StyledImage
        horizontal={horizontal}
        source={{
          uri: item.urlimagem
        }}
      />
    </ImageContainer>
    <InfoContainer>
      <TextContainer>
        <Title>{item.title}</Title>
        <LightText>
          {`${item.__meta__.subscriptions_count} membro(s)`}
        </LightText>
      </TextContainer>
      <DetailsIconContainer
        onPress={() =>
          navigation.navigate("DetalheMeetup", {
            meetup: item,
            inscricao: inscricao
          })
        }
      >
        <DetailsIcon name="chevron-right" size={14} />
      </DetailsIconContainer>
    </InfoContainer>
  </Container>
);

MeetupCard.defaultProps = {
  horizontal: false
};

MeetupCard.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
  item: PropTypes.shape({
    title: PropTypes.string,
    file: PropTypes.shape({ id: PropTypes.number }),
    __meta__: PropTypes.shape({ subscriptions_count: PropTypes.number })
  }).isRequired,
  horizontal: PropTypes.bool,
  inscricao: PropTypes.bool
};

export default withNavigation(MeetupCard);
