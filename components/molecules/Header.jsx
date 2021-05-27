import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <Container>
      <HeaderS>
        <Flex>
          <Left>
            <Link href='/'>
              <A>
                <Image
                  src={"/images/logo.png"}
                  width={80}
                  height={70}
                  alt='logo'
                />
              </A>
            </Link>
          </Left>
          <Right>
            <Nav>
              <NavItem>
                <Link href='/q'>
                  <A>Works</A>
                </Link>
              </NavItem>
              <NavItem>
                <Link href='/https://github.com/shouichi666'>
                  <A>GitHub</A>
                </Link>
              </NavItem>
              <NavItem>
                <Link href='/https://twitter.com/YoKo_Ko_Yo'>
                  <A>Twitter</A>
                </Link>
              </NavItem>
            </Nav>
          </Right>
        </Flex>
      </HeaderS>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 5px 10px;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
`;

const HeaderS = styled.header`
  width: 100%;
`;

const A = styled.a`
  padding: 0;
  cursor: pointer;
`;

const Flex = styled.div`
  width: 100%;
  display: flex;

  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div``;

const Right = styled.div`
  position: relative;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;
const NavItem = styled.div`
  margin: 0 10px;
`;

export default Header;
