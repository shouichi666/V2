import React, { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { Typing } from "../../components/molecules";
import { darken } from "polished";
import { Text } from "../../components/atoms";

const Post = ({ post }) => {
  const [isMount, setIsMount] = useState(false);
  const [images, setImages] = useState([]);

  const end = () => console.log("ERng");

  useEffect(() => {
    setIsMount(true);
    setImages(...images, post.images);
  }, []);

  console.log(post);
  return (
    <>
      <FirstView color={post.color}>
        <TextWrapper>
          <Typing
            message={post.title}
            typeEnd={end}
            size={40}
            delaySec={1000}
            speed={40}
            start={isMount}
          />
        </TextWrapper>
        <Flex>
          <FlexTop>
            <Center>
              <Image
                src={post.thumbnail.url}
                width={700}
                height={400}
                objectFit='contain'
              />
            </Center>
          </FlexTop>
          <FlexBotton>
            {(images || []).map((img, i) => {
              console.log(img.img.url);
              return (
                <ImageWrapper key={i}>
                  <Image src={img.img.url} width={150} height={90} />
                </ImageWrapper>
              );
            })}
          </FlexBotton>
        </Flex>
      </FirstView>
      <DetailWrapper>
        <Flex>
          <FlexLeft>
            {post.language.map((p, i) => {
              return <Text text={p.language} size={40} />;
            })}
          </FlexLeft>
          <FlexRight></FlexRight>
        </Flex>
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

  const data = await fetch(process.env.NEXT_PUBLIC_API_URL + "/" + id, key)
    .then((res) => res.json())
    .catch(() => null);
  return {
    props: {
      post: data,
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
    background-color: ${darken(0.2, color)};
  `}
`;

const Flex = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

const FlexTop = styled.div`
  width: 100%;
  height: 100%;
  flex-basis: 80%;
  position: relative;
`;

const FlexBotton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-basis: 20%;
`;

const FlexLeft = styled.div`
  height: 100%;
  flex-basis: 50%;
  position: relative;
`;

const FlexRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-basis: 50%;
`;

const Center = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ImageWrapper = styled.div`
  margin: 0 10px;
  cursor: pointer;
`;

const TextWrapper = styled.div`
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
`;

export default Post;
