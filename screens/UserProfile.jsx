import { useState, useContext, useEffect } from "react";
import { View, ScrollView, Image,} from "react-native";
import { List, Text, Button, useTheme, ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import moment from "moment";
import axios from "axios";

import { UserContext } from "../context/UserContext";
import { EventContext } from "../context/EventContext";

import eventInformation from "../data/eventInformation";

const UserProfile = ({ navigation }) => {
  const { eventType } = useContext(EventContext);
  const { userName, setFavoriteType, avatarUrl, setIsLogin, favEvents } =
    useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [expandList, setExpandList] = useState(false);
  const [listFavEvents, setListFavEvents] = useState([]);
  const [accordion, setAccordion] = useState({
    title: "Type",
    icon: "orbit",
  });
  const theme = useTheme();

  useEffect(() => {
    try {
      setIsLoading(true);
      const getEvents = async () => {
        const res = await axios.get(
          `https://astro-map-be.onrender.com/api/eclipses/`
        );
        const filteredResult = res.data.filter((ev) =>
          favEvents.includes(ev.date)
        );
        setListFavEvents(filteredResult);
        setIsLoading(false);
      };
      getEvents();
    } catch (error) {
      console.log(error);
    }
  }, [favEvents]);

  const getEventImageURL = (type) => {
    let imageURL;
    if (type === "annular") return (imageURL = eventInformation[0].imageURL);
    if (type === "hybrid") return (imageURL = eventInformation[1].imageURL);
    if (type === "total") return (imageURL = eventInformation[2].imageURL);
    return imageURL;
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", marginVertical: 50 }}>
      <Avatar.Image size={150} source={{uri: avatarUrl}}/>
      <Text
        variant="displaySmall"
        style={{ marginVertical: 20, fontWeight: "800" }}
      >
        {userName}
      </Text>
      <Button
        mode="contained"
        onPress={() => {
          setIsLogin(false);
          setFavoriteType("");
        }}
      >
        Sign out
      </Button>
      <ScrollView style={{ marginTop: 20, marginHorizontal: 20 }}>
        <Text
          variant="titleLarge"
          style={{ marginBottom: 20, fontWeight: "700", textAlign: "center" }}
        >
          Set favorite type of astronomical event
        </Text>
        <List.Section>
          <List.Accordion
            title={accordion.title}
            left={(props) => <List.Icon {...props} icon={accordion.icon} />}
            expanded={expandList}
            onPress={() => setExpandList((currState) => !currState)}
            style={{
              backgroundColor: theme.colors.surfaceVariant,
              borderRadius: 10,
            }}
          >
            <List.Item
              title="Solar Eclipse"
              left={(props) => (
                <List.Icon {...props} icon="weather-sunny-off" />
              )}
              onPress={() => {
                setExpandList(false);
                setAccordion({
                  title: "Solar Eclipse",
                  icon: "weather-sunny-off",
                });
                setFavoriteType("solar-eclipse");
              }}
            />
            <List.Item
              title="Comet"
              left={(props) => (
                <List.Icon {...props} icon="star-shooting-outline" />
              )}
              onPress={() => {
                setExpandList(false);
                setAccordion({
                  title: "Comet",
                  icon: "star-shooting-outline",
                });
                setFavoriteType("comet");
              }}
            />
            <List.Item
              title="Meteor Shower"
              left={(props) => <List.Icon {...props} icon="shower-head" />}
              onPress={() => {
                setExpandList(false);
                setAccordion({
                  title: "Meteor Shower",
                  icon: "shower-head",
                });
                setFavoriteType("meteor-shower");
              }}
            />
          </List.Accordion>
        </List.Section>

        {isLoading ? (
          <ActivityIndicator
          animating={true}
          size="large"
          style={{ flex: 1, marginVertical: 30, alignSelf: "center", justifyContent: "center" }}
        />
        ) : (
        <>
        <Text
        variant="titleLarge"
        style={{ marginVertical: 20, fontWeight: "700", textAlign: "center" }}
      >
        Your favourite collection
      </Text>
      {favEvents.length === 0 && (
        <Text
          variant="titleMedium"
          style={{ fontWeight: "700", textAlign: "center" }}
        >
          You don't have any favorite events
        </Text>
      )}
      {listFavEvents.map((ev) => (
        <View
          key={ev._id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 20,
            backgroundColor: theme.colors.surfaceVariant,
            marginBottom: 10,
          }}
        >
          <View style={{ padding: 10 }}>
            <Text variant="titleMedium">{eventType.title}</Text>
            <Text
              variant="titleSmall"
              style={{ textTransform: "capitalize" }}
            >
              {ev.type}
            </Text>
            <Text variant="titleSmall">
              {moment(ev.date).format("DD MMM YYYY")}
            </Text>
          </View>
          <Image
            source={{
              uri: getEventImageURL(ev.type),
            }}
            style={{
              width: "50%",
              height: "100%",
              borderBottomRightRadius: 20,
              borderTopRightRadius: 20,
            }}
            resizeMode="cover"
          />
        </View>
      ))}
      </>
        )}      
      </ScrollView>
    </SafeAreaView>
  );
};
export default UserProfile;
