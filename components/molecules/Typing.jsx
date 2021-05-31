import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { media } from "../../assets/media";

const Typing = ({
  message,
  typeEnd,
  // cursor = true,
  speed,
  delaySec,
  size,
  start,
  center,
}) => {
  const [text, setText] = useState("");
  const msgEl = useRef();

  // 指定された間隔でstateを更新する
  useEffect(() => {
    // マウント時の処理
    if (start && text.length === 0) {
      const charItr = message[Symbol.iterator]();
      let delay;
      let timerId;

      function showChar() {
        const nextChar = charItr.next();
        if (nextChar.done) {
          typeEnd();
          return;
        }
        setText((current) => current + nextChar.value);
        timerId = setTimeout(showChar, speed);
      }

      (function start() {
        delay = setTimeout(showChar, delaySec);
      })();

      // アンマウント時に念のためタイマー解除
      return () => {
        clearTimeout(timerId);
        clearTimeout(delay);
      };
    }
  }, [start]);

  // レンダリングのたびに表示エリアをスクロールする
  useEffect(() => {
    const el = msgEl.current;
    if (el.clientHeight < el.scrollHeight) {
      el.scrollTop = el.scrollHeight - el.clientHeight;
    }
  });

  return (
    <Text center={center} size={size} ref={msgEl}>
      {text}
    </Text>
  );
};

Typing.propTypes = {
  message: PropTypes.string.isRequired,
  typeEnd: PropTypes.func.isRequired,
  cursor: PropTypes.bool,
  speed: PropTypes.number,
  size: PropTypes.number,
  start: PropTypes.bool,
};

const Text = styled.p.attrs((props) => ({
  size: props.size,
}))`
  font-size: ${(props) => props.size}px;
  white-space: pre-line;
  text-align: ${(props) => (props.center ? "center" : "left;")};

  ${media.tab`
    font-size: ${(props) => (props.size > 30 ? 25 : props.size / 1.3)}px;
  `}

  ${media.sp`
  font-size: ${(props) => (props.size > 30 ? 20 : props.size / 1.4)}px;
  `}
`;

export default Typing;
