import React from "react";
import { StyleSheet, Dimensions, Image } from "react-native";
import { Text, I } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export const SLIDER_WIDTH = Dimensions.get("window").width * 0.8;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);

const CarouselItem = ({ item, index }) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "rgb(78, 68, 75)",
        borderRadius: 10,
        width: ITEM_WIDTH,
        paddingBottom: 0,
        height: "80%",
      }}
      key={index}
    >
      <Image source={{ uri: item.imgUrl }} style={styles.image} />
      <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
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
