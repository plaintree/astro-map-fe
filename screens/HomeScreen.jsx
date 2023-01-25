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

const HomeScreenStack = () => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: 40,
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
        <View style={{ paddingRight: 20 }}>
          <Text variant="headlineLarge">Upcoming</Text>
          <Text variant="headlineLarge">Event</Text>
        </View>
        <View style={{ paddingLeft: 20 }}>
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
    </SafeAreaView>
  );
};

const HomeScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: 40,
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
        <View style={{ paddingRight: 20 }}>
          <Text variant="headlineLarge" style={{ fontWeight: "700" }}>
            Upcoming
          </Text>
          <Text variant="headlineLarge" style={{ fontWeight: "700" }}>
            Event
          </Text>
        </View>
        <View style={{ paddingLeft: 20 }}>
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
    </SafeAreaView>
  );
};
export default HomeScreen;
