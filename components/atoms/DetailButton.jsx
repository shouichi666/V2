import React from "react";
// import DetailsIcon from "@material-ui/icons/Details";
import styled, { keyframes } from "styled-components";
import Link from "next/link";

const DetailButton = ({ text, sulg }) => {
  return (
    <>
      <Button>
        <Link href='/posts/[sulg]' as={`/posts/${sulg}`}>
          <A>{text}</A>
        </Link>
      </Button>
    </>
  );
};

const Button = styled.button`
  width: 300px;
  height: 90px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const A = styled.a`
  position: relative;
  margin: 0 15px;
  padding: 10px 30px;
  color: #fff;
  text-decoration: none;
  font-size: 20px;
  letter-spacing: 3px;
  overflow: hidden;
  transition: 0.5s;
  text-shadow: 0px 0px 5px rgba(163, 130, 255, 0.8);
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    border-top: 1px solid #fff;
    border-left: 1px solid #fff;
    content: "";
    transition: 0.2s;
  }

  &::after {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 10px;
    height: 10px;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    content: "";
    transition: 0.2s;
  }

  &:hover::before {
    width: 100%;
    height: 100%;
  }

  &:hover::after {
    width: 100%;
    height: 100%;
  }
`;

export default DetailButton;
