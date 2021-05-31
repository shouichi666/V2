import {
  css,
  CSSObject,
  FlattenSimpleInterpolation,
  SimpleInterpolation,
} from "styled-components";

export const sp = () => css`
  @media (max-width: 560px) {
    ${css(first, ...interpolations)}
  }
`;

export const tab = () => css`
  @media (min-width: 561px) and (max-width: 1024px) {
    ${css(first, ...interpolations)}
  }
`;
export const pc = () => css`
  @media (min-width: 1025px) {
    ${css(first, ...interpolations)}
  }
`;
