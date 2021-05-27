import React from "react";
import styled from "styled-components";
import Header from "../molecules/Header";

const Layout = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
`;

export default Layout;
