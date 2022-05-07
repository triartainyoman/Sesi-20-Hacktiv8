import { StatusBar } from "expo-status-bar";
import {
  NativeBaseProvider,
  Box,
  Text,
  VStack,
  HStack,
  Input,
  FormControl,
  Button,
  ScrollView,
  Icon,
  Checkbox,
} from "native-base";
import { useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default function App() {
  const [wishlists, setWishlists] = useState([]);

  const [item, setItem] = useState({
    content: "",
    isDone: false,
  });

  const handleChange = (text) => {
    setItem({
      content: text,
      isDone: false,
    });
  };

  const handleAdd = () => {
    setWishlists((prevItem) => {
      return [...prevItem, item];
    });

    setItem({
      content: "",
      isDone: false,
    });
  };

  // NOTE: STILL NOT WORK
  const handleCheck = (event, id) => {
    // const newWishlists = [...wishlists];
    // if (event == true) {
    //   wishlists[id].isDone = true;
    // } else {
    //   wishlists[id].isDone = false;
    // }
    // setWishlists([...newWishlists]);
  };

  const handleDelete = (id) => {
    setWishlists((prevItem) => {
      return prevItem.filter((item, index) => {
        return index !== id;
      });
    });
  };

  return (
    <NativeBaseProvider>
      <Box paddingTop={10} px={5}>
        <VStack>
          <Text fontSize="32" fontWeight="bold" color="primary.500">
            Wishlist
          </Text>
          <FormControl>
            <Box>
              <Input
                placeholder="Item Baru"
                maxWidth="100%"
                size="2xl"
                onChangeText={handleChange}
                InputRightElement={
                  <Button
                    onPress={() => {
                      handleAdd();
                    }}
                    rounded="none"
                    w="1/6"
                    h="full"
                  >
                    Add
                  </Button>
                }
                value={item.content}
              />
            </Box>
          </FormControl>
          <Box>
            <ScrollView>
              {wishlists.map((wishlist, index) => {
                return (
                  <Box key={index} paddingTop={5}>
                    <HStack justifyContent={"space-between"}>
                      <Checkbox
                        isChecked={wishlist.isDone}
                        colorScheme="green"
                        size="md"
                        onChange={(event) => handleCheck(event, index)}
                      >
                        {" "}
                      </Checkbox>
                      <Text
                        style={{
                          textDecorationLine: wishlist.isDone
                            ? "line-through"
                            : "none",
                          flex: 1,
                        }}
                        fontSize={18}
                      >
                        {wishlist.content}
                      </Text>
                      <Icon
                        onPress={() => handleDelete(index)}
                        as={Ionicons}
                        name={"trash"}
                        size="7"
                        color="black"
                      />
                    </HStack>
                  </Box>
                );
              })}
            </ScrollView>
          </Box>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}
