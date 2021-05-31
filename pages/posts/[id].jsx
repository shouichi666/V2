import React, { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { Typing } from "../../components/molecules";
import { darken } from "polished";
import { Text, AnimationButton } from "../../components/atoms";

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
              return <Text key={i} text={p.language} size={45} />;
            })}
          </FlexLeft>
          <FlexRight>{post.detail}</FlexRight>
        </Flex>
        <ButtonContainer>
          <AnimationButton href={post.url} color={post.color} />
        </ButtonContainer>
      </DetailWrapper>
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
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const FirstViewLeft = styled.div`
  flex-basis: 70%;
  position: relative;
`;

const FirstViewRight = styled.div`
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0 50px;
`;

const Flex = styled.div`
  display: flex;
  max-width: 700px;
  margin: 4em auto 0;
  align-items: flex-start;
`;

const FlexLeft = styled.div`
  align-content: stretch;
  flex-basis: 50%;
  position: relative;
  // background-color: red;
`;

const FlexRight = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-basis: 50%;
`;

const Center = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
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
`;

const TitleWrapper = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
`;

const DetailWrapper = styled.div`
  width: 100%;
  height: 90vh;
  padding: 30px;
  position: relative;
`;

const DetailTitleWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

export default Post;
