import { css } from "styled-components";

export const media = {
  pc: (...args) => css`
    @media (min-width: 1025px) {
      ${css(...args)}
    }
  `,
  tab: (...args) => css`
    @media (max-width: 1024px) {
      ${css(...args)}
    }
  `,
  sp: (...args) => css`
    @media (max-width: 568px) {
      ${css(...args)}
    }
  `,
};
