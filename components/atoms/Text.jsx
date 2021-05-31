import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Text = ({ text, size }) => {
  return (
    <>
      <P size={size}>{text}</P>
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
`;

export default Text;
