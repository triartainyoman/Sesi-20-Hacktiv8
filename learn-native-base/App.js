import React, { useEffect, useState } from "react";
import {
  NativeBaseProvider,
  Box,
  HStack,
  VStack,
  Text,
  Pressable,
  Image,
  ScrollView,
} from "native-base";

export default function App() {
  const [isRequest, setIsRequest] = useState(false);
  const [list, setList] = useState([]);

  const getJsonPlaceholder = async () => {
    setIsRequest(true);
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const resJson = await res.json();

    setList(resJson);
    setIsRequest(false);
  };

  useEffect(() => {
    return function cleanup() {
      setList([]);
    };
  }, []);

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Box
          bg={"primary.800"}
          py={"4"}
          px={"3"}
          marginTop={10}
          rounded={"md"}
          alignSelf={"center"}
          width={375}
          maxWidth="100%"
        >
          <HStack justifyContent="space-between">
            <Box justifyContent="space-between">
              <VStack space={2}>
                <Text fontSize="sm" color="white">
                  Today @ 9PM
                </Text>
                <Text fontSize="lg" color="white">
                  Let's talk about avatar!
                </Text>
              </VStack>
              <Pressable
                rounded="sm"
                bg="primary.400"
                alignSelf="flex-start"
                py={2}
                px={3}
                onPress={() => {
                  getJsonPlaceholder();
                }}
              >
                <Text
                  textTransform={"uppercase"}
                  fontSize={"sm"}
                  fontWeight={"bold"}
                  color={"white"}
                >
                  Remind Me
                </Text>
              </Pressable>
            </Box>
            <Image
              source={{
                uri: "https://www.highlandernews.org/wp-content/uploads/features.ATLAasucr.Pixy_.jpg",
              }}
              height={100}
              rounded={"full"}
              width={100}
              alt="Aang fliying"
            />
          </HStack>
        </Box>

        {isRequest == true ? (
          <Text textAlign={"center"} py={10}>
            Loading...
          </Text>
        ) : (
          list.map((post) => {
            return (
              <Box
                bg={"lightgrey"}
                py={"4"}
                px={"3"}
                marginTop={5}
                rounded={"md"}
                alignSelf={"center"}
                width={375}
                maxWidth="100%"
                key={post.id}
              >
                <VStack space={2}>
                  <Text fontSize="sm">Post {post.id}</Text>
                  <Text fontSize="md">{post.title}</Text>
                  <Text>{post.body}</Text>
                </VStack>
              </Box>
            );
          })
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
}
