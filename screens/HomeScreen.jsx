import axios from "axios";
import { View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "react-native-paper";
import { useRef, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import CarouselItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from "../components/CarouselItem";
import moment from "moment";

const HomeScreen = () => {
  const [moonPhase, setMoonPhase] = useState("");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMoonPhase = async () => {
      try {
        const today = moment().format("YYYY-MM-DD");
        const res = await axios.get(
          `https://aa.usno.navy.mil/api/moon/phases/date?date=${today}&nump=1`
        );
        setMoonPhase(res.data.phasedata[0].phase);
      } catch (error) {
        console.log(error);
      }
    };
    getMoonPhase();
  }, []);

  useEffect(() => {
    const getEvents = async () => {
      const today = moment().format("YYYY-MM-DD");
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://astro-map-be.onrender.com/api/eclipses/all/${today}`
        );
        setEvents(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getEvents();
  }, []);

  const isCarousel = useRef(null);

  const getMoonPhaseIcon = (phase) => {
    let iconStr;
    if (phase === "Full Moon") return (iconStr = "moon-full");
    if (phase === "New Moon") return (iconStr = "moon-new");
    if (phase === "First Quarter") return (iconStr = "moon-first-quarter");
    if (phase === "Last Quarter") return (iconStr = "moon-last-quarter");
    return iconStr;
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 40,
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
          <Text variant="titleLarge">{moment().format("DD MMM YYYY")}</Text>
          <Text variant="titleLarge">
            {moonPhase}
            <MaterialCommunityIcons
              name={getMoonPhaseIcon(moonPhase)}
              size={24}
            />
          </Text>
        </View>
      </View>
      <ScrollView>
        <Carousel
          layout="default"
          layoutCardOffset={9}
          ref={isCarousel}
          data={events}
          renderItem={CarouselItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          useScrollView={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
