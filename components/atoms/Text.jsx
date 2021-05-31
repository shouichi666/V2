import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Text = ({ text, size, center }) => {
  return (
    <>
      <P size={size} center={center}>
        {text}
      </P>
    </>
  );
};

Text.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.number,
  center: PropTypes.bool,
};

const P = styled.p.attrs((props) => ({
  size: props.size,
  center: props.center,
}))`
  font-size: ${(props) => props.size}px;
  text-align: ${(props) => props.center && "center"};
`;

export default Text;
