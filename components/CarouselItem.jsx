import { StyleSheet, Dimensions } from "react-native";
import { Card, Text } from "react-native-paper";

import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
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
      <Card mode="contained" elevation={3}>
        <Card.Cover source={{ uri: getEventImageURL(item.type) }} />
        <Card.Title
          title={getEventTitle(item.type)}
          titleVariant="titleLarge"
          subtitle={item.type}
          subtitleStyle={{ textTransform: "capitalize" }}
        />
        <Card.Content style={{ paddingBottom: 10 }}>
          <Text variant="bodyMedium">
            {moment(item.date).format("DD MMM YYYY")}
          </Text>
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

export default CarouselItem;
