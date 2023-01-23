import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native-paper";
import { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from "../components/CarouselItem";
import data from "../data";

const HomeScreen = () => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: 20,
        alignItems: "center",
      }}
    >
      <StatusBar style="auto" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <View style={{ paddingRight: 10 }}>
          <Text variant="headlineLarge">Upcoming</Text>
          <Text variant="headlineLarge">Event</Text>
        </View>
        <View style={{ paddingLeft: 10 }}>
          <Text variant="titleLarge">Moon phase</Text>
          <Text variant="titleLarge">Partial</Text>
        </View>
      </View>

      <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={CarouselItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        onSnapToItem={(index) => setIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: "#FFFFFF",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </SafeAreaView>
  );
};
export default HomeScreen;
