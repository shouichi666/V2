import React, { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { Typing, WorkContents } from "../../components/molecules";
import { darken } from "polished";
import { Text, AnimationButton } from "../../components/atoms";
import { media } from "../../assets/media";

const Post = ({ post, posts }) => {
  const [isMount, setIsMount] = useState(false);
  const [images, setImages] = useState([]);
  const [count, setCount] = useState(0);

  const end = () => console.log("ERng");
  console.log(posts);

  useEffect(() => {
    setIsMount(true);
    setImages(...images, post.images);
  }, []);

  const onClick = (e) => {
    setCount(Number(e.currentTarget.dataset.count));
  };

  console.log(count);
  return (
    <>
      <FirstView color={post.color}>
        <Container>
          <TitleWrapper>
            <Typing
              message={post.title}
              typeEnd={end}
              size={55}
              delaySec={1000}
              speed={40}
              start={isMount}
            />
          </TitleWrapper>
          <FirstViewLeft>
            <Center>
              {images.length !== 0 && (
                <Image
                  src={images[count].img.url}
                  width={900}
                  height={600}
                  objectFit='contain'
                />
              )}
            </Center>
          </FirstViewLeft>
          <FirstViewRight>
            <Inner>
              {images.map((img, i) => {
                return (
                  <ImageWrapper
                    key={i}
                    data-count={i}
                    onClick={onClick}
                    current={i === count ? true : false}
                    color={post.color}
                  >
                    <Image
                      src={img.img.url}
                      width={150}
                      height={90}
                      objectFit='contain'
                    />
                  </ImageWrapper>
                );
              })}
            </Inner>
          </FirstViewRight>
        </Container>
      </FirstView>
      <DetailWrapper>
        <DetailTitleWrapper>
          <Text text={post.title + `詳細`} size={40} center={true} />
        </DetailTitleWrapper>
        <Flex>
          <FlexLeft>
            {post.language.map((p, i) => {
              return (
                <Text key={i} text={p.language} size={45} center={false} />
              );
            })}
          </FlexLeft>
          <FlexRight>{post.detail}</FlexRight>
        </Flex>
        <ButtonContainer>
          <AnimationButton href={post.url} color={post.color} />
        </ButtonContainer>
      </DetailWrapper>
      <Work>
        {posts.contents.map((content, i) => {
          return post.id !== content.id ? (
            <WorkContents
              title={content.title}
              thumbnail={content.thumbnail.url}
              key={i}
              color={content.color}
              num={i}
              id={content.id}
            />
          ) : (
            ""
          );
        })}
      </Work>
    </>
  );
};

export const getStaticPaths = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY },
  };

  const data = await fetch(process.env.NEXT_PUBLIC_API_URL, key)
    .then((res) => res.json())
    .catch(() => null);
  const paths = data.contents.map((content) => `/posts/${content.id}`);

  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const key = {
    headers: { "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY },
  };

  const datas = await fetch(process.env.NEXT_PUBLIC_API_URL, key)
    .then((res) => res.json())
    .catch(() => null);

  const data = await fetch(process.env.NEXT_PUBLIC_API_URL + "/" + id, key)
    .then((res) => res.json())
    .catch(() => null);
  return {
    props: {
      post: data,
      posts: datas,
    },
  };
};

const FirstView = styled.div.attrs((props) => ({
  color: props.color,
}))`
  width: 100%;
  height: 100vh;
  position: relative;

  ${({ color }) =>
    typeof color === "string" &&
    `
    background-color: ${darken(0.01, color)};
  `}

  ${media.sp`
    height: 90vh;
  `}
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  align-items: stretch;

  ${media.sp`
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-end;

`}
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.sp`
  margin: 10vh 0 0 0;
  height: auto;
`}
`;

const FirstViewLeft = styled.div`
  width: 70%;
  position: relative;
  height: 75vh;

  ${media.sp`
    width: 100%;
    height: 50vh;
  `}
`;

const FirstViewRight = styled.div`
  width: 30%;
  padding: 50px 0;
  height: 75vh;

  ${media.sp`
    width: 100%;
    height: 20vh;
    padding: 0 0;
    overflow-x: scroll;
  `}
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  ${media.sp`
  width: auto;
  height: auto;
  flex-direction: row;
  padding: 0 10px 0 0;
  `}
`;

const Flex = styled.div`
  display: flex;
  max-width: 700px;
  margin: 4em auto 0;
  align-items: flex-start;

  ${media.sp`
  flex-direction: column-reverse;
  `}
`;

const FlexLeft = styled.div`
  align-content: stretch;
  flex-basis: 50%;
  position: relative;
`;

const FlexRight = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-basis: 50%;

  ${media.sp`
  margin: 0 0 40px;
  `}
`;

const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;

  ${media.sp`
  top: 40%;
  width: 90%;
  `}
`;

const ImageWrapper = styled.div`
  margin: 0 10px;
  cursor: pointer;
  position: relative;

  ${({ current, color }) =>
    current &&
    `
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    height: 100%;
    background-color: ${color};
    opacity: 0.5;
    z-index: 3;
  }
  `}

  ${media.sp`
  width: 300px;
  min-width: 100px;
  height: auto;
  `}
`;

const DetailWrapper = styled.div`
  width: 100%;
  padding: 30px;
  position: relative;
`;

const DetailTitleWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  justify-content: center;
  align-items: center;

  ${media.sp`
  flex-direction: column-reverse;
  `}
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0 30vh;
`;

const Work = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  max-width: 1500px;
  justify-content: center;
  margin: 0 auto;
`;

export default Post;
