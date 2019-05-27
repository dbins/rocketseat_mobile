import React from "react";
import PropTypes from "prop-types";

import {
  Container,
  CheckBoxItem,
  CheckedImage,
  UncheckedImage
} from "./styles";

const CheckBox = ({ items, onItemClick, checkboxItems }) => (
  <Container>
    {items &&
      items.map(item => (
        <CheckBoxItem
          onClick={() => onItemClick(item.id)}
          isChecked={
            !Object.keys(checkboxItems).length
              ? false
              : typeof checkboxItems[item.id] === "undefined"
              ? false
              : checkboxItems[item.id].isChecked
          }
          rightText={item.name}
          key={item.id.toString()}
          checkedImage={<CheckedImage />}
          unCheckedImage={<UncheckedImage />}
        />
      ))}
  </Container>
);

CheckBox.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string
    })
  ).isRequired,
  checkboxItems: PropTypes.objectOf(
    PropTypes.shape({
      isChecked: PropTypes.bool
    })
  ).isRequired,
  onItemClick: PropTypes.func.isRequired
};

export default CheckBox;
