import React from "react";
import styled from "styled-components";
import { Text } from "../atoms";

const Footer = () => {
  return (
    <>
      <Container>
        <FooterS>
          <Text text={"@YOKO"} size={16} />
        </FooterS>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 20px 0;
  background-color: #313131;
`;
const FooterS = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Footer;
