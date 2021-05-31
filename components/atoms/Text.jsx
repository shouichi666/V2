import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { media } from "../../assets/media";

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
}))`
  font-size: ${(props) => props.size}px;
  text-align: ${(props) => (props.center ? "center" : "left")};

  ${media.tab`
  font-size: ${(props) => (props.size > 30 ? 25 : props.size / 1.3)}px;
`}

  ${media.sp`
font-size: ${(props) => (props.size > 30 ? 20 : props.size / 1.4)}px;
`}
`;

export default Text;
