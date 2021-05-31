import React from "react";
import styled, { keyframes } from "styled-components";

const AnimationButton = ({ href, color }) => {
  return (
    <AnimationButtonS href={href} color={color}>
      <span>GO</span>
    </AnimationButtonS>
  );
};

const Animation = keyframes`
  0%{
     transform: translate(-50%, -50%) rotate(0);
    }
  100%{
     transform: translate(-50%, -50%) rotate(360deg); 
    }
`;

const fontAnimation = keyframes`
  0%{
     transform: scale(1,1);
    }
  50%{
     transform: scale( 1.2 , 1.2 ); 
    }
  70%{
    transform: scale( 1.4 , 1.4 ); 
    }
  850%{
    transform: scale( 1.2 , 1.2 ); 
    }
  100%{
     transform: scale( 1.3 , 1.2 ); 
    }
`;

const borderAnimation = keyframes`
  0%{
    width: 80%; 
    height: 80%;
    transform: translate(-50%, -50%) rotate(0);
    
  }
  50%{
    width: 80%; 
    height: 80%; 
  }
  70%{
    width: 110%; 
    height: 110%; 
  }
  85%{
    width: 105%; 
    height: 105%; 
  }
  100%{
    width: 100%; 
    height: 100%; 
  }
`;
const AnimationButtonS = styled.a.attrs((props) => ({
  href: props.href,
}))`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  position: relative;
  display: inline-block;
  border-radius: 50%; 

  &:hover{
    &::before{
      width: 70%;
      height: 70%;
      transition:0.5s;
    }
    &::after{
      width: 100%;
      height: 100%;
      transition:0.5s;
      animation: ${borderAnimation} 1 0.5s ease-in-out;

    }

    span{
      animation: ${fontAnimation} 1 0.5s ease-in-out;
      transform: scale(1.2,1.2);
      text-shadow: 1px 1px 10px ${(props) => props.color} ;
    }
  }

  &:: before {
    border: 1.4px dotted;
    position: absolute;
    top: 50%;
    left: 50%;
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: ${Animation} infinite 40s linear;
    z-index: 1;
    transition: 0.5s;
  }

  &:: after {
    border: 2px solid;
    position: absolute;
    top: 50%;
    left: 50%;
    content: "";
    width: 80%;
    height: 80%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    transition: 0.5s;
  }

  span {
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 5;
    }
  }
`;

export default AnimationButton;
