import { StyleSheet, Dimensions, Image } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

import { SafeAreaView } from "react-native-safe-area-context";
import LinkButton from "./LinkButton";
export const SLIDER_WIDTH = Dimensions.get("window").width * 1;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const CarouselItem = ({ item, index }) => {
  return (
    <SafeAreaView key={index}>
      <Card
        mode="contained"
        elevation={3}
        onPress={() => navigation.navigate("User")}
      >
        <Card.Cover source={{ uri: item.imgUrl }} />
        <Card.Title title={item.title} titleVariant="titleLarge" />
        <Card.Content style={{ paddingBottom: 10 }}>
          <Text variant="bodyMedium">{item.body}</Text>
        </Card.Content>
        <Card.Actions style={{ paddingBottom: 20 }}>
          <LinkButton
            mode="outlined"
            to={{ screen: "User", params: { id: "jane" } }}
          >
            Explore
          </LinkButton>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: ITEM_WIDTH,
    height: "60%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 10,
  },
  body: {
    fontSize: 14,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default CarouselItem;
