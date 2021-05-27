import Head from "next/head";
import styled from "styled-components";
import Typing from "../components/molecules/Typing";

const texts = {
  1: `はじめまして。横山翔一です。`,
  2: `御覧頂き有難う御座います。
  未経験からフロントエンドエンジニアを目指し勉強しています。`,
  3: `このサイトはNext.js,microCMS,styled-componentsを使って製作しました。`,
};

export default function Home({ post }) {
  const end = () => console.log("END");
  console.log(process.env.NEXT_PUBLIC_API_URL);
  console.log(process.env.NEXT_PUBLIC_API_KEY);
  console.log(post);

  return (
    <>
      <HomeS>
        <Hero>
          <Wrapper>
            <LargeText>HI!</LargeText>
            <LargeText>I'M</LargeText>
            <LargeText>SHOUICHI YOKOYAMA</LargeText>
            <TypingContainer>
              <Typing
                message={texts[1]}
                speed={50}
                typeEnd={end}
                size={20}
                delaySec={0}
              />
              <Typing
                message={texts[2]}
                speed={40}
                typeEnd={end}
                size={20}
                delaySec={1000}
              />
              <Typing
                message={texts[3]}
                speed={50}
                typeEnd={end}
                size={20}
                delaySec={3000}
              />
            </TypingContainer>
          </Wrapper>
        </Hero>
      </HomeS>
    </>
  );
}

export const getStaticProps = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY },
  };
  const data = await fetch(process.env.NEXT_PUBLIC_API_URL, key)
    .then((res) => res.json())
    .catch(() => null);
  return {
    props: {
      post: data,
    },
  };
};

const HomeS = styled.div`
  width: 100%;
`;

const Hero = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  width: 80%;
`;

const LargeText = styled.p`
  font-size: 120px;
  font-weight: 600;
  line-height: 1.2em;
`;

const TypingContainer = styled.div`
  width: calc(100% / 1.4);
  position: absolute;
  top: 10%;
  right: 0;
`;
