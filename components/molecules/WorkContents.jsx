import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Image from "next/image";
import { Typing } from "./";
import { DetailButton } from "../atoms";

const WorkContents = ({ title, thumbnail, color, num, id }) => {
  const end = () => console.log("HOGE");
  const [view, setView] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const targetTopPosition = ref.current.getBoundingClientRect().top;
    const showTarget = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      if (scrollPosition > targetTopPosition + 390) {
        setView(true);
      } else {
        setView(false);
      }
    };
    showTarget();
    const onScroll = () => {
      showTarget();
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  console.log(view);

  return (
    <Container
      ref={ref}
      onView={view}
      colorS={color}
      reverse={num % 2 === 0 ? true : false}
    >
      <TitleWrapper reverse={num % 2 === 0 ? true : false}>
        <Typing
          message={title}
          typeEnd={end}
          speed={20}
          delaySec={100}
          start={view}
          size={55}
        />
      </TitleWrapper>
      <ImageWrapper onView={view}>
        <Image
          src={thumbnail}
          width={980}
          height={580}
          objectFit='cover'
          className='borderRadius'
        />
      </ImageWrapper>
      <ButtonWrapper>
        <DetailButton text={"詳しく見る"} sulg={id} />
      </ButtonWrapper>
    </Container>
  );
};

WorkContents.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

const Container = styled.div`
  width: 100%;
  height: 90vh;
  position: relative;
  margin: 0 0 15vh;
  overflow: hidden;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    opacity: 0;
    transition: 0.3s;
    // transform: rotate(0deg) scale(0, 0);
    transform: scale(0, 1);

    ${({ onView, colorS }) =>
      onView
        ? typeof colorS === "string" &&
          `
      background-color: ${colorS};
      transition: 0.7s;
      opacity:0.9;
      transform: scale(4,1);
    `
        : `
      background-color: ${colorS};
      transition: 0.7s;
      opacity:0.9;
      transform: scale(0,1);
      transform-origin: top right;

    `};

    ${({ reverse }) =>
      reverse
        ? `
        transform-origin: top left;
      `
        : `
        transform-origin: top right;
    `}
  }
`;

const TitleWrapper = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ImageWrapper = styled.div`
  width: auto;
  display: inline-block;
  position: absolute;
  top: 200%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;

  ${({ onView }) =>
    onView &&
    `
    left: 50%;
    transition: 0.4s;
    transition-delay:0.1s;
    opacity: 1;
    filter: drop-shadow(5px 5px 9px rgba(19, 19, 19, 0.761));
    top:53%;
  `};
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default WorkContents;
