import { StyleSheet, Dimensions, Image } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";


import { SafeAreaView } from "react-native-safe-area-context";
import LinkButton from "./LinkButton";
export const SLIDER_WIDTH = Dimensions.get("window").width * 1;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

import eventInformation from "../data/eventInformation";

const CarouselItem = ({ item, index }) => {

  const getEventImageURL = (type) => {
    let imageURL;
    if (type === "annular") return (imageURL = eventInformation[0].imageURL);
    if (type === "hybrid") return (imageURL = eventInformation[1].imageURL);
    if (type === "total") return (imageURL = eventInformation[2].imageURL);
    return imageURL;
  };

  const getEventTitle = (type) => {
    let title;
    if (type === "annular") return (title = eventInformation[0].title);
    if (type === "hybrid") return (title = eventInformation[1].title);
    if (type === "total") return (title = eventInformation[2].title);
    return title;
  };

  const getEventDesc = (type) => {
    let desc;
    if (type === "annular") return (desc = eventInformation[0].desc);
    if (type === "hybrid") return (desc = eventInformation[1].desc);
    if (type === "total") return (desc = eventInformation[2].desc);
    return desc;
  };

  return (
    <SafeAreaView key={index}>
      <Card
        mode="contained"
        elevation={3}
      >
        <Card.Cover source={{ uri: getEventImageURL(item.type)}} />
        <Card.Title title={getEventTitle(item.type)} titleVariant="titleLarge" subtitle={item.type}/>
        <Card.Content style={{ paddingBottom: 10 }}>
          <Text variant="bodyMedium">{item.date}</Text>
          <Text variant="bodyMedium">{getEventDesc(item.type)}</Text>
        </Card.Content>
        <Card.Actions style={{ paddingBottom: 20 }}>
          <LinkButton
            mode="outlined"
            to={{ screen: "Single Event", params: { id: item.date } }}
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
