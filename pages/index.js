import Head from "next/head";
import styled from "styled-components";
import { WorkContents, Typing } from "../components/molecules";

const texts = {
  1: `はじめまして。横山翔一です。`,
  2: `御覧頂き有難う御座います。
  未経験からフロントエンドエンジニアを目指し勉強しています。`,
  3: `このサイトはNext.js,microCMS,styled-componentsを使って製作しました。`,
};

export default function Home({ posts }) {
  const end = () => console.log("END");
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
                speed={40}
                typeEnd={end}
                size={20}
                start={true}
                delaySec={0}
              />
              <Typing
                message={texts[2]}
                speed={30}
                typeEnd={end}
                size={20}
                start={true}
                delaySec={1000}
              />
              <Typing
                message={texts[3]}
                speed={40}
                typeEnd={end}
                size={20}
                start={true}
                delaySec={3000}
              />
            </TypingContainer>
          </Wrapper>
        </Hero>
        <Space />
        {posts.contents.map((content, i) => {
          return (
            <WorkContents
              title={content.title}
              thumbnail={content.thumbnail.url}
              key={i}
              color={content.color}
              num={i}
              id={content.id}
            />
          );
        })}
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
      posts: data,
    },
  };
};

const HomeS = styled.div`
  width: 100%;
  position: relative;
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

const Space = styled.div`
  height: 40vh;
`;
